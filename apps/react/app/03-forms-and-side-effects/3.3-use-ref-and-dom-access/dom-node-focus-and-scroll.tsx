"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Badge } from "@workspace/ui/components/badge"
import { Focus, ArrowDownCircle, Maximize2, Sparkles } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৩.৩ useRef & DOM Access: DOM Node Focus, Selection & Scroll
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * React সাধারণত স্বয়ংক্রিয়ভাবে DOM হ্যান্ডেল করে। কিন্তু ইনপুটে ফোকাস করা,
 * টেক্সট সিলেক্ট করা, স্ক্রল পজিশন পরিবর্তন করা বা কোনো এলিমেন্টের সঠিক সাইজ
 * পরিমাপ করার জন্য সরাসরি বাস্তব DOM নোডে পৌঁছানোর প্রয়োজন হয়। `useRef`-এর
 * মাধ্যমে আমরা নিরাপদে ব্রাউজারের নোড রেফারেন্স ধারণ করতে পারি।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `const myRef = React.useRef<HTMLElement>(null)` দিয়ে রেফারেন্স তৈরি করা হয়।
 * ২. JSX ট্যাগে `ref={myRef}` প্রপ দিয়ে DOM নোডের সাথে যুক্ত করতে হয়।
 * ৩. কম্পোনেন্ট মাউন্ট হওয়ার পর `myRef.current` সরাসরি নেটিভ DOM অবজেক্ট রিটার্ন করে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function DomNodeFocusAndScroll() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const logContainerRef = React.useRef<HTMLDivElement>(null)

  const [logs, setLogs] = React.useState<string[]>([
    "সিস্টেম চালু হয়েছে...",
    "লগ ট্র্যাকার ইনিশিয়ালাইজড।",
  ])
  const [dimensions, setDimensions] = React.useState<{ width: number; height: number } | null>(null)

  // অ্যাকশন ১: ইনপুটে ফোকাস করা
  const handleFocus = () => {
    inputRef.current?.focus()
  }

  // অ্যাকশন ২: ইনপুটের টেক্সট সিলেক্ট করা
  const handleSelectText = () => {
    inputRef.current?.select()
  }

  // অ্যাকশন ৩: DOM মাপজোখ করা (getBoundingClientRect)
  const handleMeasure = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setDimensions({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      })
    }
  }

  // অ্যাকশন ৪: নতুন লগ যুক্ত করা এবং স্মুথ স্ক্রল করা
  const handleAddLog = () => {
    const newEntry = `অ্যাকশন এন্ট্রি #${logs.length + 1} - ${new Date().toLocaleTimeString()}`
    setLogs((prev) => [...prev, newEntry])

    // স্টেট আপডেটের পর DOM আপডেট হলে স্ক্রল করার জন্য টাইমার/মাইক্রোটাস্ক
    setTimeout(() => {
      if (logContainerRef.current) {
        logContainerRef.current.scrollTo({
          top: logContainerRef.current.scrollHeight,
          behavior: "smooth",
        })
      }
    }, 50)
  }

  return (
    <div className="space-y-5 rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            DOM নোড ইমপ্যারেটিভ কন্ট্রোল
          </span>
          <Badge variant="outline" className="text-[11px] font-mono">
            ref.current (Native HTMLInputElement)
          </Badge>
        </div>

        {/* টার্গেট DOM ইনপুট */}
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            defaultValue="সাকিব আল হাসান - React Pro"
            placeholder="কিছু লিখুন..."
            className="text-xs"
          />
        </div>

        {/* DOM অ্যাকশন বাটনসমূহ */}
        <div className="flex flex-wrap gap-2 pt-1">
          <Button
            size="sm"
            variant="outline"
            onClick={handleFocus}
            className="text-xs gap-1.5"
          >
            <Focus className="size-3.5 text-primary" />
            ফোকাস দিন (focus())
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleSelectText}
            className="text-xs gap-1.5"
          >
            <Sparkles className="size-3.5 text-amber-500" />
            সিলেক্ট করুন (select())
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleMeasure}
            className="text-xs gap-1.5"
          >
            <Maximize2 className="size-3.5 text-blue-500" />
            মাপ পরিমাপ (BoundingRect)
          </Button>
        </div>

        {/* পরিমাপ রেজাল্ট */}
        {dimensions && (
          <div className="rounded-md border border-border bg-muted/30 p-2.5 text-xs text-muted-foreground flex items-center gap-3">
            <span>ইনপুটের বাস্তব DOM আকার:</span>
            <Badge variant="secondary" className="font-mono text-[11px]">
              প্রস্থ: {dimensions.width}px • উচ্চতা: {dimensions.height}px
            </Badge>
          </div>
        )}
      </div>

      {/* স্মুথ স্ক্রলিং এরিয়া */}
      <div className="border-t border-border pt-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            স্মুথ স্ক্রলিং লগ কন্টেইনার (useRef Scroll Target)
          </span>
          <Button
            size="sm"
            onClick={handleAddLog}
            className="h-7 text-xs gap-1"
          >
            <ArrowDownCircle className="size-3" />
            নতুন লগ যোগ ও স্ক্রল
          </Button>
        </div>

        <div
          ref={logContainerRef}
          className="h-28 overflow-y-auto rounded-lg border border-border/70 bg-muted/20 p-2.5 text-[11px] font-mono space-y-1"
        >
          {logs.map((log, idx) => (
            <div
              key={idx}
              className="rounded px-1.5 py-0.5 bg-background border border-border/40 text-foreground"
            >
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
