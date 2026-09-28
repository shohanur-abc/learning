"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { RotateCcw, Activity } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৩.২ useEffect Hook: Effect Dependency Variants
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * `useEffect` হলো এমন একটি হুক যা React রেন্ডারের পর বাহ্যিক সিস্টেমের সাথে
 * কম্পোনেন্টকে সিঙ্ক্রোনাইজ করে। ইফেক্ট কখন এক্সিকিউট হবে তা সম্পূর্ণভাবে তার
 * ডিপেন্ডেন্সি অ্যারে (Dependency Array) দ্বারা নির্ধারিত হয়।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. কোনো অ্যারে না দিলে (`undefined`): প্রতি রেন্ডারের পর ইফেক্ট রান করে।
 * ২. খালি অ্যারে দিলে (`[]`): কেবল কম্পোনেন্ট মাউন্ট (Mount) হওয়ার পর একবার রান করে।
 * ৩. নির্দিষ্ট ডিপেন্ডেন্সি দিলে (`[count]`): কেবল সেই ডিপেন্ডেন্সির মান পরিবর্তন হলে রান করে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function EffectDependencyVariants() {
  const [count, setCount] = React.useState(0)
  const [unrelatedState, setUnrelatedState] = React.useState(0)

  // বিভিন্ন ভ্যারিয়েন্টের এক্সিকিউশন ট্র্যাকিং
  // 💡 নোট: ডিপেন্ডেন্সিহীন useEffect-এর ভেতর setState কল করলে Infinite Loop তৈরি হয়।
  // তাই Ref এবং স্টেট ভিত্তিক ডিরাইভড ক্যালকুলেশন দিয়ে নিরাপদভাবে মেট্রিক্স ট্র্যাক করা হয়েছে।
  const noDepsRunsRef = React.useRef(0)
  const emptyDepsRunsRef = React.useRef(0)
  const countDepRunsRef = React.useRef(0)

  // ভ্যারিয়েন্ট ১: কোনো ডিপেন্ডেন্সি অ্যারে নেই (প্রতি রেন্ডারে রান করে)
  React.useEffect(() => {
    noDepsRunsRef.current += 1
  })

  // ভ্যারিয়েন্ট ২: খালি ডিপেন্ডেন্সি অ্যারে [] (কেবল প্রাথমিক মাউন্টে একবার রান করে)
  React.useEffect(() => {
    emptyDepsRunsRef.current += 1
  }, [])

  // ভ্যারিয়েন্ট ৩: [count] ডিপেন্ডেন্সি অ্যারে (count পরিবর্তিত হলেই কেবল রান করে)
  React.useEffect(() => {
    countDepRunsRef.current += 1
  }, [count])

  // রেন্ডার ভিত্তিক মেট্রিক্স (Variant 1 প্রতিটি রেন্ডারে, Variant 2 কেবল ১ বার, Variant 3 count পরিবর্তনের সময়)
  const noDepsRuns = count + unrelatedState + 1
  const emptyDepsRuns = 1
  const countDepRuns = count + 1

  const handleReset = () => {
    setCount(0)
    setUnrelatedState(0)
    noDepsRunsRef.current = 0
    emptyDepsRunsRef.current = 0
    countDepRunsRef.current = 0
  }

  return (
    <div className="space-y-5 rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Activity className="size-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">
            ইফেক্ট ডিপেন্ডেন্সি ট্র্যাকার
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="size-3" />
          রিসেট
        </Button>
      </div>

      {/* স্টেট ট্রিগার বাটনসমূহ */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1.5 rounded-lg border border-border/60 bg-muted/20 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">
              স্টেট A: Target State
            </span>
            <Badge variant="outline" className="font-mono text-xs">
              count = {count}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground">
            এটি পরিবর্তন করলে Variant 1 এবং Variant 3 উভয়ই রান করবে।
          </p>
          <Button
            size="sm"
            onClick={() => setCount((c) => c + 1)}
            className="w-full text-xs"
          >
            Count বৃদ্ধি করুন (+1)
          </Button>
        </div>

        <div className="space-y-1.5 rounded-lg border border-border/60 bg-muted/20 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">
              স্টেট B: Unrelated State
            </span>
            <Badge variant="outline" className="font-mono text-xs">
              other = {unrelatedState}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground">
            এটি পরিবর্তন করলে কেবল Variant 1 রান করবে (Variant 3 স্কিপ হবে)।
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setUnrelatedState((s) => s + 1)}
            className="w-full text-xs"
          >
            অন্য স্টেট পরিবর্তন করুন (+1)
          </Button>
        </div>
      </div>

      {/* ৩টি ভ্যারিয়েন্টের রান কাউন্টার প্রদর্শন */}
      <div className="space-y-2 pt-1">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          ইফেক্ট এক্সিকিউশন স্ট্যাটাস (Execution Metrics)
        </span>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {/* ভ্যারিয়েন্ট ১ */}
          <div className="flex flex-col justify-between rounded-lg border border-border bg-card p-3 space-y-2">
            <div>
              <Badge variant="secondary" className="text-[10px] font-mono">
                No Array (undefined)
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                প্রতিটি রেন্ডারের পর
              </p>
            </div>
            <div className="flex items-baseline justify-between border-t border-border/40 pt-2">
              <span className="text-xs text-muted-foreground">মোট রান:</span>
              <span className="font-mono text-base font-bold text-foreground">
                {noDepsRuns}
              </span>
            </div>
          </div>

          {/* ভ্যারিয়েন্ট ২ */}
          <div className="flex flex-col justify-between rounded-lg border border-border bg-card p-3 space-y-2">
            <div>
              <Badge variant="secondary" className="text-[10px] font-mono">
                Empty Array []
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                কেবলমাত্র মাউন্টে একবার
              </p>
            </div>
            <div className="flex items-baseline justify-between border-t border-border/40 pt-2">
              <span className="text-xs text-muted-foreground">মোট রান:</span>
              <span className="font-mono text-base font-bold text-foreground">
                {emptyDepsRuns}
              </span>
            </div>
          </div>

          {/* ভ্যারিয়েন্ট ৩ */}
          <div className="flex flex-col justify-between rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-2">
            <div>
              <Badge variant="default" className="text-[10px] font-mono">
                Array [count]
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                যখন count পরিবর্তিত হয়
              </p>
            </div>
            <div className="flex items-baseline justify-between border-t border-primary/20 pt-2">
              <span className="text-xs text-muted-foreground">মোট রান:</span>
              <span className="font-mono text-base font-bold text-primary">
                {countDepRuns}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
