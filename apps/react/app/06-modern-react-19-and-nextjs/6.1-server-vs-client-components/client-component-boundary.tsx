"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৬.১ Server vs Client Components: Client Component Boundary
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * Next.js App Router-এ সব কম্পোনেন্ট ডিফল্টভাবে Server Components। যখনই আমাদের
 * ব্রাউজার ইভেন্ট (যেমন onClick), স্টেট (useState), অথবা লাইফসাইকেল হুক প্রয়োজন হয়,
 * ফাইলের একদম শুরুতে `'use client'` লিখে Client Boundary সংজ্ঞায়িত করতে হয়।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `'use client'` ডিরেক্টিভটি ফাইলটিকে একটি মডিউল বাউন্ডারি হিসেবে চিহ্নিত করে।
 * ২. এই বাউন্ডারির ভেতরের কোড ব্রাউজারে রান করার জন্য ক্লায়েন্ট জাভাস্ক্রিপ্ট বান্ডেলে যুক্ত হয়।
 * ৩. বাউন্ডারি সবসময় কম্পোনেন্ট ট্রির যত নিচে (leaf node) সম্ভব রাখা উচিত।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface ClientComponentBoundaryProps {
  /** প্রারম্ভিক কাউন্ট মান */
  readonly initialCount?: number
}

/**
 * ক্লায়েন্ট কম্পোনেন্টের বিশুদ্ধ বাস্তবায়ন যা ইন্টার‍্যাক্টিভ স্টেট পরিচালনা করে।
 */
export default function ClientComponentBoundary({
  initialCount = 0,
}: ClientComponentBoundaryProps) {
  const [count, setCount] = React.useState(initialCount)
  const [lastAction, setLastAction] = React.useState<string>("কোনো ইভেন্ট ঘটেনি")

  const handleIncrement = () => {
    setCount((prev) => prev + 1)
    setLastAction(`+1 বৃদ্ধি করা হয়েছে (${new Date().toLocaleTimeString()})`)
  }

  const handleReset = () => {
    setCount(0)
    setLastAction(`রিসেট করা হয়েছে (${new Date().toLocaleTimeString()})`)
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Client Component Output
          </span>
          <Badge variant="outline" className="text-xs border-primary/40 text-primary">
            &apos;use client&apos;
          </Badge>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {lastAction}
        </span>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-foreground">
          এই কম্পোনেন্টটি ব্রাউজারের ইভেন্ট লিসেনার ও <code>useState</code> স্টেট পরিচালনা করছে:
        </p>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            disabled={count === 0}
          >
            Reset
          </Button>

          <span className="font-mono text-xl font-bold text-foreground min-w-[3rem] text-center">
            {count}
          </span>

          <Button
            size="sm"
            variant="default"
            onClick={handleIncrement}
          >
            Increment State (+1)
          </Button>
        </div>
      </div>
    </div>
  )
}
