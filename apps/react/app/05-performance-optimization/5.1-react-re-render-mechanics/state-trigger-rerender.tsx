"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Badge } from "@workspace/ui/components/badge"
import { RenderPulse } from "@workspace/ui/components/custom/learning-components"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৫.১ React Re-render Mechanics: State Trigger & Component Re-execution
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * React-এ `useState` এর সেটার ফাংশন (যেমন `setCount`) কল হলে React সেই কম্পোনেন্টকে
 * পুনরায় রেন্ডার করার শিডিউল করে। রেন্ডারের সময় কম্পোনেন্ট ফাংশনটি শুরু থেকে শেষ
 * পর্যন্ত সম্পূর্ণ পুনরায় রান (re-execute) হয়।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. স্টেট পরিবর্তন হলে সম্পূর্ণ ফাংশন বডি আবার এক্সিকিউট হয়।
 * ২. লোকাল ভ্যারিয়েবলগুলো নতুন করে তৈরি হয়, শুধুমাত্র `useState` ও `useRef` এর মান অক্ষত থাকে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function StateTriggerRerender() {
  const [count, setCount] = React.useState(0)
  const [text, setText] = React.useState("")

  // রেন্ডার ট্র্যাকার: ফাংশন প্রতিবার এক্সিকিউট হলে এই লোকাল টাইমস্ট্যাম্প আপডেট হবে
  const executionTimestamp = new Date().toLocaleTimeString()
  console.count("component re-execution count")
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      {/* হেডার ও রেন্ডার পালস ইন্ডিকেটর */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            স্টেট ট্রিগার ও কম্পোনেন্ট রি-এক্সিকিউশন
          </h4>
          <p className="text-xs text-muted-foreground">
            যেকোনো একটি স্টেট পরিবর্তন করলেই সম্পূর্ণ ফাংশন পুনরায় রান করবে
          </p>
        </div>
        <RenderPulse label="ফাংশন রান সংখ্যা" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ট্রিগার ১: কাউন্টার স্টেট */}
        <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">
              ট্রিগার ১: কাউন্টার স্টেট
            </span>
            <Badge variant="outline" className="font-mono text-xs">
              count: {count}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            বাটনে ক্লিক করলে <code>setCount</code> কল হয় এবং কম্পোনেন্ট পুনরায় এক্সিকিউট হয়।
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => setCount((prev) => prev + 1)}
              className="text-xs"
            >
              +১ কাউন্ট বাড়ান
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCount(0)}
              className="text-xs"
            >
              রিসেট
            </Button>
          </div>
        </div>

        {/* ট্রিগার ২: টেক্সট ইনপুট স্টেট */}
        <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">
              ট্রিগার ২: টেক্সট ইনপুট স্টেট
            </span>
            <Badge variant="outline" className="font-mono text-xs">
              দৈর্ঘ্য: {text.length}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            ইনপুটে প্রতিটি অক্ষর টাইপ করার সাথে সাথে <code>setText</code> রেন্ডার ট্রিগার করে।
          </p>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="এখানে কিছু লিখুন..."
            className="text-xs"
          />
        </div>
      </div>

      {/* এক্সিকিউশন ডিটেইলস */}
      <div className="rounded-lg border border-border/60 bg-muted/40 p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-muted-foreground">
          সর্বশেষ ফাংশন এক্সিকিউশন টাইম:
        </span>
        <span className="font-mono font-medium text-foreground bg-background px-2 py-0.5 rounded border border-border">
          {executionTimestamp}
        </span>
      </div>
    </div>
  )
}
