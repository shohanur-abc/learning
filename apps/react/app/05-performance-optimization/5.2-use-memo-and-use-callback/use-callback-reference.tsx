"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { RenderPulse } from "@workspace/ui/components/custom/learning-components"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৫.২ useCallback: Function Reference Memoization
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * জাভাস্ক্রিপ্টে প্রতিবার ফাংশন রান হলে নতুন ফাংশন রেফারেন্স তৈরি হয় (`() => {} !== () => {}`)।
 * কোনো চাইল্ড কম্পোনেন্ট যদি `React.memo` দিয়ে অপ্টিমাইজ করা থাকে, তবে প্যারেন্টে তৈরি
 * আন-মেমোইজড ফাংশন প্রপস হিসেবে পাঠালে চাইল্ডের মেমোইজেশন ভেঙে যায়।
 * `useCallback` ফাংশনের মেমোরি রেফারেন্স স্থির (stable) রাখে।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `useCallback(fn, deps)` ফাংশনটিকে ক্যাশ করে রাখে।
 * ২. এটি মূলত `React.memo` যুক্ত চাইল্ড কম্পোনেন্টের অপ্রয়োজনীয় রি-রেন্ডার ঠেকাতে কাজে লাগে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface ActionButtonProps {
  readonly onReset: () => void
  readonly label: string
}

/**
 * React.memo দিয়ে র‍্যাপ করা চাইল্ড বাটন
 * প্রপসের রেফারেন্স অপরিবর্তিত থাকলে এটি কখনোই রি-রেন্ডার হবে না
 */
const MemoizedActionButton = React.memo(function ActionButton({
  onReset,
  label,
}: ActionButtonProps) {
  return (
    <div className="rounded-lg border border-border bg-background p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground">
          React.memo চাইল্ড কম্পোনেন্ট
        </span>
        <RenderPulse label="চাইল্ড রেন্ডার" />
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        প্যারেন্ট যতবারই রি-রেন্ডার হোক, <code>useCallback</code> এর কারণে <code>onReset</code> এর
        মেমোরি রেফারেন্স এক থাকে। ফলে চাইল্ড রেন্ডার স্কিপ হয়!
      </p>
      <Button
        size="sm"
        variant="destructive"
        onClick={onReset}
        className="text-xs"
      >
        {label}
      </Button>
    </div>
  )
})

export default function UseCallbackReference() {
  const [parentCount, setParentCount] = React.useState(0)
  const [itemsCount, setItemsCount] = React.useState(3)

  // useCallback দিয়ে ফাংশন রেফারেন্স স্থির রাখা
  const handleResetCart = React.useCallback(() => {
    setItemsCount(0)
  }, [])

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      {/* প্যারেন্ট হেডার */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            useCallback: রেফারেনশিয়াল আইডেন্টিটি সংরক্ষণ
          </h4>
          <p className="text-xs text-muted-foreground">
            প্যারেন্ট স্টেট পরিবর্তনের পরও চাইল্ড বাটনের রেন্ডার স্কিপ নিশ্চিত করা
          </p>
        </div>
        <RenderPulse label="প্যারেন্ট রেন্ডার" />
      </div>

      {/* প্যারেন্ট স্টেট কন্ট্রোল */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* সম্পর্কহীন প্যারেন্ট স্টেট */}
        <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">
              সম্পর্কহীন প্যারেন্ট কাউন্টার
            </span>
            <Badge variant="outline" className="font-mono text-xs">
              Count: {parentCount}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            এই বাটনে ক্লিক করলে প্যারেন্ট রি-রেন্ডার হবে, কিন্তু মেমোইজড চাইল্ড রি-রেন্ডার হবে না।
          </p>
          <Button
            size="sm"
            onClick={() => setParentCount((c) => c + 1)}
            className="text-xs"
          >
            +১ প্যারেন্ট কাউন্টার
          </Button>
        </div>

        {/* শপিং কার্ট কাউন্ট */}
        <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">
              কার্ট আইটেম সংখ্যা
            </span>
            <Badge variant="secondary" className="font-mono text-xs">
              আইটেম: {itemsCount}টি
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            আইটেম যোগ করুন অথবা নিচের মেমোইজড বাটন দিয়ে রিসেট করুন।
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setItemsCount((c) => c + 1)}
            className="text-xs"
          >
            +১ কার্ট আইটেম যোগ করুন
          </Button>
        </div>
      </div>

      {/* মেমোইজড চাইল্ড কম্পোনেন্ট */}
      <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-2">
        <div className="text-xs font-medium text-foreground mb-2">
          useCallback রেফারেন্স গ্রহণকারী চাইল্ড:
        </div>
        <MemoizedActionButton
          onReset={handleResetCart}
          label="কার্ট খালি করুন (Reset Cart)"
        />
      </div>
    </div>
  )
}
