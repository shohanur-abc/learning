"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Play, Pause, RotateCcw, Clock } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৩.৩ useRef & DOM Access: Timer Handle Persistence (Stopwatch)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * জাভাস্ক্রিপ্ট টাইমার (`setInterval`) চালানোর পর ব্রাউজার একটি হ্যান্ডেল বা আইডি রিটার্ন করে।
 * পরবর্তী সময়ে টাইমার থামানোর জন্য এই আইডিটি প্রয়োজন। সাধারণ লোকাল ভ্যারিয়েবল নিলে
 * প্রতি রেন্ডারে তা মুছে যায়, আর `useState`-এ রাখলে অহেতুক রি-রেন্ডার হয়। তাই
 * `useRef`-এ টাইমার আইডি সংরক্ষণ করাই রিঅ্যাক্টের গোল্ডেন স্ট্যান্ডার্ড।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `const timerRef = useRef<NodeJS.Timeout | null>(null)`
 * ২. `timerRef.current = setInterval(...)` দিয়ে হ্যান্ডেল সংরক্ষণ করা হয়।
 * ৩. থামানোর সময় `clearInterval(timerRef.current)` কল করা হয়।
 * ৪. কম্পোনেন্ট আনমাউন্টের সময় `useEffect` ক্লিন-আপে টাইমার ক্লিয়ার করতে হয়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function TimerHandlePersistence() {
  const [secondsElapsed, setSecondsElapsed] = React.useState(0)
  const [isRunning, setIsRunning] = React.useState(false)

  // 🌟 টাইমার হ্যান্ডেল সংরক্ষণ করার জন্য useRef
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const handleStart = () => {
    if (isRunning) return

    setIsRunning(true)
    // টাইমার শুরু করা এবং আইডিটি ref.current-এ রাখা
    timerRef.current = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1)
    }, 1000)
  }

  const handlePause = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsRunning(false)
  }

  const handleReset = () => {
    handlePause()
    setSecondsElapsed(0)
  }

  // কম্পোনেন্ট আনমাউন্ট হলে চলমান টাইমার বন্ধ করার সেফগার্ড
  React.useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // মিনিট ও সেকেন্ড ফরম্যাটিং
  const minutes = Math.floor(secondsElapsed / 60)
  const seconds = secondsElapsed % 60
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

  return (
    <div className="space-y-5 rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">
            স্টপওয়াচ ও টাইমার হ্যান্ডেল সংরক্ষণ
          </span>
        </div>
        <Badge
          variant={isRunning ? "default" : "secondary"}
          className="font-mono text-[11px]"
        >
          {isRunning ? "Running" : "Paused"}
        </Badge>
      </div>

      {/* ডিজিটাল ঘড়ির ডিসপ্লে */}
      <div className="flex flex-col items-center justify-center rounded-lg border border-border/70 bg-muted/20 py-6">
        <span className="font-mono text-4xl font-extrabold tracking-wider text-foreground">
          {formattedTime}
        </span>
        <span className="text-xs text-muted-foreground mt-1">
          timerRef.current: {timerRef.current !== null ? "[Active Timer Handle]" : "null"}
        </span>
      </div>

      {/* কন্ট্রোল বাটনসমূহ */}
      <div className="flex items-center justify-center gap-2">
        {!isRunning ? (
          <Button
            size="sm"
            onClick={handleStart}
            className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Play className="size-3.5 fill-current" />
            শুরু করুন (Start)
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={handlePause}
            className="gap-1.5 text-xs text-amber-600 border-amber-500/40 hover:bg-amber-500/10"
          >
            <Pause className="size-3.5" />
            বিরতি (Pause)
          </Button>
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={handleReset}
          className="gap-1.5 text-xs"
        >
          <RotateCcw className="size-3.5" />
          রিসেট (Reset)
        </Button>
      </div>

      <div className="rounded-md border border-border/50 bg-muted/30 p-2.5 text-[11px] text-muted-foreground">
        📌 <strong>কেন useState নয়?</strong> টাইমারের আইডিটি শুধুমাত্র ব্রাউজারের
        ব্যাকগ্রাউন্ড অপারেশনের জন্য প্রয়োজন। এটি স্ক্রিনে কোনো visual UI অংশ পরিবর্তন
        করে না। তাই এটি <code>useRef</code>-এ সংরক্ষণ করাই সবচেয়ে ক্লিন ও দ্রুত।
      </div>
    </div>
  )
}
