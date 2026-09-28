"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ২.২ useState Deep Dive: Lazy Initial State
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * যদি ইনিশিয়াল স্টেটের মান কোনো জটিল গণনা (যেমন লোকালস্টোরেজ পড়া, বড় অ্যারে প্রসেস
 * করা বা ক্রিপ্টো কি জেনারেট করা) থেকে আসে:
 * - `useState(expensiveCalc())` ➔ ভুল! প্রতি রি-রেন্ডারে ফাংশনটি রান করে সিপিইউ নষ্ট করে।
 * - `useState(() => expensiveCalc())` ➔ সঠিক (Lazy Initializer)! React এই ফাংশনটি
 *   কেবল প্রথম মাউন্টে একবারই রান করায়, পরবর্তী কোনো রি-রেন্ডারে আর ছোঁয়ও না।
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ভারি গণনার অনুকরণকারী ফাংশন
function createInitialDataset(): { readonly token: string; readonly createdAt: string } {
  // বাস্তব উদাহরণে এখানে বড় কোনো অ্যারে পার্সিং বা লজিক থাকে
  const randomToken = Math.random().toString(36).substring(2, 10).toUpperCase()
  return {
    token: `AUTH-${randomToken}`,
    createdAt: new Date().toLocaleTimeString(),
  }
}

export default function LazyInitialState() {
  // ✅ Lazy Initializer: কলব্যাক ফাংশন পাস করায় কেবল ইনিশিয়াল মাউন্টে একবারই চলবে
  const [session, setSession] = React.useState(() => createInitialDataset())

  // কম্পোনেন্ট রি-রেন্ডার ট্রিগার করার জন্য সাধারণ কাউন্টার
  const [reRenderCount, setReRenderCount] = React.useState<number>(0)

  function triggerReRender() {
    setReRenderCount((prev) => prev + 1)
  }

  function handleRegenerateToken() {
    setSession(createInitialDataset())
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div className="space-y-0.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Lazy Initialization Inspector
          </span>
          <p className="text-xs text-muted-foreground">
            কম্পোনেন্ট রি-রেন্ডার হলেও ইনিশিয়াল সেশন টোকেন অক্ষত থাকে
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          রি-রেন্ডার সংখ্যা: #{reRenderCount}
        </Badge>
      </div>

      <div className="rounded-lg bg-muted/40 p-4 border border-border/60 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            মাউন্ট টাইমে তৈরিকৃত সুরক্ষিত সেশন টোকেন:
          </span>
          <Badge
            variant="outline"
            className="text-xs text-emerald-600 dark:text-emerald-400 border-emerald-500/40"
          >
            Lazy Initialized
          </Badge>
        </div>

        <div className="font-mono text-base font-bold text-primary">
          {session.token}
        </div>

        <div className="text-xs text-muted-foreground">
          জেনারেট হওয়ার সময়: {session.createdAt}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {/* রি-রেন্ডার বাটন: দেখাবে যে সেশন টোকেন কিন্তু বদলাচ্ছে না! */}
        <Button variant="outline" size="sm" onClick={triggerReRender}>
          🔄 রি-রেন্ডার ঘটাও (Token অপরিবর্তিত থাকবে)
        </Button>

        {/* ম্যানুয়াল নতুন টোকেন তৈরি */}
        <Button variant="secondary" size="sm" onClick={handleRegenerateToken}>
          ⚡ নতুন টোকেন সেট করো
        </Button>
      </div>

      <div className="text-xs text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-md border border-border/40">
        💡 <strong>লক্ষণীয়:</strong> 'রি-রেন্ডার ঘটাও' বাটনে যতবারই ক্লিক করো না কেন,
        কম্পোনেন্ট রি-রেন্ডার হওয়া সত্ত্বেও <code>() =&gt; createInitialDataset()</code> পুনরায়
        রান হয় না। কারণ React জানে এটি একটি Lazy Initializer!
      </div>
    </div>
  )
}
