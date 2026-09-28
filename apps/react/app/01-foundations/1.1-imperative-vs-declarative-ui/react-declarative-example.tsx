"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * উদাহরণ ২: DECLARATIVE APPROACH (REACT)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * React কাজ করে একটি সহজ এবং চমৎকার সূত্রের মাধ্যমে:
 *
 *               UI = f(state)
 *
 * - "state": কম্পোনেন্টের ডেটার একক উৎস (Single Source of Truth)।
 * - "f": তোমার কম্পোনেন্ট ফাংশন, যা বলে দেয় নির্দিষ্ট স্টেট-এ UI দেখতে কেমন হবে।
 * - "UI": DOM Elements, যা React স্বয়ংক্রিয়ভাবে ব্রাউজারে রেন্ডার ও আপডেট করে।
 *
 * 🌟 VANILLA JS থেকে মূল পার্থক্য:
 * ১. কোনো `document.querySelector()` প্রয়োজন নেই।
 * ২. কোনো ম্যানুয়াল `textContent` বা Tailwind CSS `classList` পরিবর্তন করতে হয় না।
 * ৩. কোনো ম্যানুয়াল `addEventListener` বা `removeEventListener` clean-up নেই।
 * ৪. Derived Values (যেমন: `isMax`, `badgeText`) প্রতি রেন্ডারে নিজে থেকেই ক্যালকুলেট হয়!
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function ReactDeclarativeExample() {
  // ── STEP 1: useState দিয়ে স্টেট ডিক্লেয়ার করা (Single Source of Truth) ─────
  const [count, setCount] = React.useState(0)
  const MAX_LIMIT = 5

  // ── STEP 2: স্টেট থেকে সরাসরি মান ক্যালকুলেট করা (Derived State) ───────────
  // কোনো ম্যানুয়াল সিঙ্ক ছাড়া প্রতি রেন্ডারে স্বয়ংক্রিয়ভাবে হিসাব হয়
  const isMax = count >= MAX_LIMIT
  const isZero = count <= 0

  const badgeText = isMax ? "Limit Reached" : count > 0 ? "Active" : "Zero"
  const badgeColor = isMax
    ? "bg-destructive/15 text-destructive border-destructive/30"
    : count > 0
      ? "bg-primary/15 text-primary border-primary/30"
      : "bg-muted text-muted-foreground border-border"

  const displayColor = isMax
    ? "text-destructive"
    : count > 0
      ? "text-primary"
      : "text-foreground"

  // ── STEP 3: JSX-এ স্টেট অনুযায়ী UI ডিক্লেয়ার করা ──────────────────────────
  return (
    <div className="rounded-xl border bg-card p-6 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            পদ্ধতি: Declarative (React)
          </div>
          <div className="text-sm font-semibold text-foreground">
            useState Hook দিয়ে স্টেট-চালিত UI
          </div>
        </div>
        {/* Declarative Badge: স্টেট অনুযায়ী React নিজ দায়িত্বে কালার ও টেক্সট আপডেট করে */}
        <span
          className={cn(
            "px-2 py-0.5 rounded-full text-xs font-semibold border transition-colors",
            badgeColor
          )}
        >
          {badgeText}
        </span>
      </div>

      {/* Declarative Display: সরাসরি {count} এক্সপ্রেশন রেন্ডার হচ্ছে */}
      <div className="flex items-center justify-center py-4 bg-muted/20 rounded-lg">
        <span className={cn("text-3xl font-bold font-mono transition-colors", displayColor)}>
          {count}
        </span>
      </div>

      {/* Declarative Event Handlers ও Disabled Attributes */}
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="sm"
          disabled={isZero}
          onClick={() => setCount((prev) => Math.max(0, prev - 1))}
        >
          - Decrement
        </Button>

        <Button
          variant="default"
          size="sm"
          disabled={isMax}
          onClick={() => setCount((prev) => Math.min(MAX_LIMIT, prev + 1))}
        >
          + Increment
        </Button>

        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Reset count"
          onClick={() => setCount(0)}
          className="text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>
    </div>
  )
}

