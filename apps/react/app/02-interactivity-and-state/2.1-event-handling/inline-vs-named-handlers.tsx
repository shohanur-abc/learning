"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ২.১ Event Handling: Inline বনাম Named Event Handlers
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * React-এ ইভেন্ট হ্যান্ডলার হিসেবে ফাংশনের 'রেফারেন্স' (Reference) পাস করতে হয়,
 * ফাংশনটিকে সরাসরি কল (Execution) করা যাবে না। আর্গুমেন্ট বা প্যারামিটার পাঠাতে
 * হলে একটি ইনলাইন অ্যারো ফাংশন `() => fn(arg)` তৈরি করে পাস করতে হয়।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `onClick={handleClick}` ➔ সঠিক: ক্লিকের সময় ফাংশনটি চলবে।
 * ২. `onClick={handleClick()}` ❌ ভুল: কম্পোনেন্ট রেন্ডারের সাথে সাথেই রান হয়ে যাবে।
 * ৩. `onClick={() => handleSelect(role)}` ➔ প্যারামিটার পাঠানোর আদর্শ পদ্ধতি।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function InlineVsNamedHandlers() {
  const [lastAction, setLastAction] = React.useState<string>(
    "কোনো বাটন এখনও ক্লিক করা হয়নি"
  )
  const [clickCount, setClickCount] = React.useState<number>(0)

  // ১. Named Event Handler (কোনো প্যারামিটার ছাড়াই সরাসরি রেফারেন্স পাস)
  function handleBasicClick() {
    setClickCount((prev) => prev + 1)
    setLastAction("Named Handler: সরাসরি ফাংশন রেফারেন্স কল হয়েছে")
  }

  // ২. Parameterized Handler (আর্গুমেন্ট গ্রহণকারী ফাংশন)
  function handleRoleSelect(role: string, accessLevel: number) {
    setClickCount((prev) => prev + 1)
    setLastAction(
      `Inline Arrow Handler: রোল "${role}" নির্বাচিত (Access Level: ${accessLevel})`
    )
  }

  // ৩. ইনলাইন ক্লিপবোর্ড কপি হ্যান্ডলার
  const resetLog = () => {
    setClickCount(0)
    setLastAction("লগ রিসেট করা হয়েছে")
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div className="space-y-0.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            হ্যান্ডলার ডেমো ও অ্যাকশন লগ
          </span>
          <p className="text-xs text-muted-foreground">
            প্রতিটি বাটন কীভাবে হ্যান্ডলার এক্সিকিউট করছে তা লক্ষ্য করো
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            মোট ক্লিক: {clickCount}
          </Badge>
          <Button size="xs" variant="ghost" onClick={resetLog}>
            রিসেট
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-xs font-semibold text-foreground">
          ১. Named Handler (প্যারামিটার ছাড়া সরাসরি রেফারেন্স):
        </span>
        <div>
          {/* ✅ সঠিক: ফাংশন রেফারেন্স পাস করা হয়েছে */}
          <Button variant="outline" size="sm" onClick={handleBasicClick}>
            সাধারণ ক্লিক (Named Reference)
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-xs font-semibold text-foreground">
          ২. Inline Arrow Function (প্যারামিটার সহ কলব্যাক):
        </span>
        <div className="flex flex-wrap gap-2">
          {/* ✅ সঠিক: অ্যারো ফাংশনের মাধ্যমে আর্গুমেন্ট পাস */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleRoleSelect("Student", 1)}
          >
            Student নির্বাচন
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleRoleSelect("Instructor", 2)}
          >
            Instructor নির্বাচন
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => handleRoleSelect("Lead Admin", 3)}
          >
            Admin নির্বাচন
          </Button>
        </div>
      </div>

      <div className="rounded-lg bg-muted/60 p-3 text-xs border border-border/60">
        <span className="font-semibold text-foreground">সর্বশেষ কার্যকর অ্যাকশন:</span>{" "}
        <span className="text-primary font-mono">{lastAction}</span>
      </div>
    </div>
  )
}
