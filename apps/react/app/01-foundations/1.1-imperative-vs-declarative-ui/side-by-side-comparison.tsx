"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { Progress } from "@workspace/ui/components/progress"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * উদাহরণ ৩: রিকোয়ারমেন্ট পরিবর্তনের স্ট্রেস টেস্ট (REAL IMPLEMENTATION)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 SCENARIO:
 * ক্লায়েন্ট ৩টি নতুন রিকোয়ারমেন্ট চাইল:
 * ১. লাইভ Progress Bar (০% থেকে ১০০%)।
 * ২. ডায়নামিক স্ট্যাটাস মেসেজ (যেমন: ৪ হলে "Warning", ৫ হলে "Queue Full")।
 * ৩. কাউন্ট রিসেট করার সুবিধা।
 *
 * 🌟 REACT ADVANTAGE:
 * কোনো নতুন querySelector বা manual DOM mutation ছাড়াই বিদ্যমান `count` স্টেট
 * থেকে Derived State ক্যালকুলেট করে সরাসরি UI-তে বসিয়ে দেওয়া যায়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function SideBySideComparison() {
  const [count, setCount] = React.useState(2)
  const MAX = 5

  // ── Derived State: সরাসরি স্টেট থেকে ক্যালকুলেট করা মান ────────────────────
  const progressPercent = (count / MAX) * 100
  const isComplete = count >= MAX
  const isAlmost = count === MAX - 1

  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase">
          Live State Sandbox
        </span>
        <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded font-semibold">
          Count: {count} / {MAX}
        </span>
      </div>

      {/* State থেকে স্বয়ংক্রিয়ভাবে ক্যালকুলেটেড Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Capacity</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* State অনুযায়ী ডিক্লেয়ার করা স্ট্যাটাস মেসেজ */}
      <div className="text-center py-2 text-xs font-medium">
        {isComplete ? (
          <span className="text-destructive font-semibold">
            🚨 Task Queue Full! নতুন আইটেম যোগ করার আগে কাজ সম্পন্ন করুন।
          </span>
        ) : isAlmost ? (
          <span className="text-amber-600 dark:text-amber-400 font-semibold">
            ⚠️ Warning: আর মাত্র ১টি স্লট বাকি আছে।
          </span>
        ) : (
          <span className="text-muted-foreground">
            ✅ স্বাভাবিক অবস্থা। {MAX - count}টি স্লট খালি আছে।
          </span>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 border-t">
        <Button
          variant="outline"
          size="xs"
          disabled={count <= 0}
          onClick={() => setCount((c) => Math.max(0, c - 1))}
        >
          - Remove Task
        </Button>
        <Button
          variant="default"
          size="xs"
          disabled={isComplete}
          onClick={() => setCount((c) => Math.min(MAX, c + 1))}
        >
          + Add Task
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => setCount(0)}
        >
          Clear All
        </Button>
      </div>
    </div>
  )
}

