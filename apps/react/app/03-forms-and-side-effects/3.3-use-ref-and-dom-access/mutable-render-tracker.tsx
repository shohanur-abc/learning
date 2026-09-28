"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Badge } from "@workspace/ui/components/badge"
import { History, Eye, RefreshCw } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৩.৩ useRef & DOM Access: Mutable Values & Render Tracker
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * `useRef` কেবল DOM এলিমেন্ট ধরার জন্য নয়; এটি একটি সাধারণ জাভাস্ক্রিপ্ট অবজেক্ট
 * `{ current: initialValue }` যার মান পরিবর্তন করলে React কম্পোনেন্ট রি-রেন্ডার
 * হয় না। তাই কম্পোনেন্টের লাইফসাইকেলে রেন্ডার সংখ্যা গণনা করা অথবা পূর্ববর্তী
 * স্টেট (Previous State) মনে রাখার জন্য এটি আদর্শ মাধ্যম।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `ref.current = newValue` অ্যাসাইনমেন্ট কোনো রি-রেন্ডার ট্রিগার করে না।
 * ২. রেন্ডারের মাঝে (JSX রিটার্ন করার সময়) কখনো `ref.current` পরিবর্তন করা উচিত নয়।
 * ৩. `useEffect`-এর ভেতরে `ref.current` আপডেট করে স্টেট ইতিহাস ট্র্যাক করা যায়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function MutableRenderTracker() {
  const [query, setQuery] = React.useState("")
  const [clickCount, setClickCount] = React.useState(0)

  // 🌟 ১. রেন্ডার কাউন্টার: প্রতিটি রেন্ডারের পর ১ বৃদ্ধি পায়
  const renderCountRef = React.useRef(0)

  // 🌟 ২. পূর্ববর্তী স্টেট ট্র্যাকার: আগের টাইপ করা টেক্সট মনে রাখে
  const previousQueryRef = React.useRef("")

  // প্রতিবার কম্পোনেন্ট রি-রেন্ডার হলে কাউন্টার বাড়ানো হয়
  React.useEffect(() => {
    renderCountRef.current += 1
  })

  // query পরিবর্তন হওয়ার পর পূর্ববর্তী মান সংরক্ষণ করা হয়
  React.useEffect(() => {
    previousQueryRef.current = query
  }, [query])

  return (
    <div className="space-y-5 rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="text-xs font-semibold text-foreground">
          মিউটেবল ভ্যালু ও রেন্ডার কাউন্টার
        </span>
        <Badge variant="outline" className="gap-1 font-mono text-[11px] text-primary">
          <RefreshCw className="size-3" />
          রেন্ডার সংখ্যা: {renderCountRef.current}
        </Badge>
      </div>

      {/* স্টেট ইনপুট ফিল্ড */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="tracker-input" className="text-xs font-medium">
            নিচে কিছু টাইপ করুন (প্রতি কীস্ট্রোকে রি-রেন্ডার ঘটবে):
          </Label>
          <Input
            id="tracker-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="টাইপ করে রেন্ডার দেখুন..."
            className="text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setClickCount((prev) => prev + 1)}
            className="text-xs gap-1.5"
          >
            অতিরিক্ত স্টেট রেন্ডার ট্রিগার ({clickCount})
          </Button>
        </div>
      </div>

      {/* স্টেট বনাম পূর্ববর্তী স্টেট কার্ড */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border/70 bg-muted/20 p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
            <Eye className="size-3.5 text-emerald-500" />
            বর্তমান স্টেট (Current State):
          </div>
          <div className="font-mono text-xs text-foreground bg-card p-2 rounded border border-border/50 min-h-[32px] flex items-center">
            {query || <span className="text-muted-foreground italic">(ফাঁকা)</span>}
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-muted/20 p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
            <History className="size-3.5 text-blue-500" />
            পূর্ববর্তী স্টেট (Previous via useRef):
          </div>
          <div className="font-mono text-xs text-muted-foreground bg-card p-2 rounded border border-border/50 min-h-[32px] flex items-center">
            {previousQueryRef.current || <span className="text-muted-foreground/60 italic">(ফাঁকা)</span>}
          </div>
        </div>
      </div>

      <div className="rounded-md bg-muted/40 p-2.5 text-[11px] text-muted-foreground">
        💡 <strong>লক্ষণীয়:</strong> <code>renderCountRef.current</code> মান পরিবর্তনের জন্য
        কোনো রি-রেন্ডার ট্রিগার হয়নি; বরং স্টেট পরিবর্তনের স্বাভাবিক রেন্ডারের ভেতর নিঃশব্দে
        মানটি সংগৃহীত হয়েছে।
      </div>
    </div>
  )
}
