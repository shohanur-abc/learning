"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ২.২ useState Deep Dive: Updater Function ও Automatic Batching
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * ১. State Snapshot: একটি রেন্ডারে স্টেট ভ্যারিয়েবলটি স্থির থাকে (স্ন্যাপশট)।
 *    তাই পরপর তিনবার `setCount(count + 1)` কল করলে প্রতিবারই একই পুরনো মান ব্যবহৃত হয়,
 *    ফলে মান মাত্র ১ বাড়ে।
 * ২. Updater Function: `setCount(prev => prev + 1)` ব্যবহার করলে React স্টেট আপডেটগুলোকে
 *    একটি কিউ (Queue)-তে জমা করে এবং একটির ফলাফল পরেরটির ইনপুট হিসেবে পাস করে।
 * ৩. Batching: একই ইভেন্ট হ্যান্ডলারের একাধিক স্টেট আপডেটকে React একসাথে ব্যাচ করে
 *    মাত্র একবার রি-রেন্ডার ট্রিগার করে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function UpdaterFunctionAndBatching() {
  const [snapshotCount, setSnapshotCount] = React.useState<number>(0)
  const [updaterCount, setUpdaterCount] = React.useState<number>(0)
  const [renderCount, setRenderCount] = React.useState<number>(1)
  const [lastAction, setLastAction] = React.useState<string>("প্রস্তুত")

  // রেন্ডার কাউন্ট ট্র্যাক করার জন্য সাধারণ এফেক্ট নয়, খাঁটি স্টেট ও ইভেন্ট
  function handleDirectSnapshotUpdates() {
    // ❌ স্ন্যাপশট মডেল: count-এর মান প্রতি কলের সময় এখনও পুরনো মানটিই ধরে আছে
    setSnapshotCount(snapshotCount + 1)
    setSnapshotCount(snapshotCount + 1)
    setSnapshotCount(snapshotCount + 1)

    setRenderCount((prev) => prev + 1)
    setLastAction(
      `setSnapshotCount(count + 1) ৩ বার কল করা হলেও মান মাত্র ১ বেড়েছে (স্ন্যাপশট: ${snapshotCount} ➔ ${snapshotCount + 1})`
    )
  }

  function handleUpdaterFunctionUpdates() {
    // ✅ আপডেটার ফাংশন: কিউ-তে থাকা পূর্ববর্তী আপডেট করা স্টেট গ্রহণ করে
    setUpdaterCount((prev) => prev + 1)
    setUpdaterCount((prev) => prev + 1)
    setUpdaterCount((prev) => prev + 1)

    setRenderCount((prev) => prev + 1)
    setLastAction(
      `setUpdaterCount(prev => prev + 1) ৩ বার কল করায় কিউ ধরে মান ৩ বেড়েছে (পূর্ববর্তী: ${updaterCount} ➔ ${updaterCount + 3})`
    )
  }

  function handleReset() {
    setSnapshotCount(0)
    setUpdaterCount(0)
    setRenderCount(1)
    setLastAction("সব কাউন্টার ০ তে রিসেট করা হয়েছে")
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div className="space-y-0.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            স্টেট স্ন্যাপশট বনাম আপডেটার কিউ
          </span>
          <p className="text-xs text-muted-foreground">
            একই হ্যান্ডলারে ৩ বার স্টেট আপডেট কলের ফলাফল পরীক্ষা করো
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            কম্পোনেন্ট রি-রেন্ডার: #{renderCount}
          </Badge>
          <Button size="xs" variant="ghost" onClick={handleReset}>
            রিসেট
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* কলাম ১: ডিরেক্ট ভ্যালু পাস (স্ন্যাপশট) */}
        <div className="rounded-lg border border-border/80 bg-muted/30 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              ১. Direct Snapshot (৩ বার কল)
            </span>
            <Badge variant="destructive" className="text-xs">
              +1 বাড়ে
            </Badge>
          </div>

          <div className="font-mono text-2xl font-bold text-foreground">
            {snapshotCount}
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            <code>setCount(count + 1)</code> ৩ বার রান করলেও প্রতিবার একই স্ন্যাপশট
            মান দেখে।
          </p>

          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={handleDirectSnapshotUpdates}
          >
            +1 x ৩ বার চালান
          </Button>
        </div>

        {/* কলাম ২: আপডেটার ফাংশন (কিউ প্রসেসিং) */}
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              ২. Updater Function (৩ বার কল)
            </span>
            <Badge
              variant="outline"
              className="text-xs text-emerald-600 dark:text-emerald-400 border-emerald-500/40"
            >
              +3 বাড়ে
            </Badge>
          </div>

          <div className="font-mono text-2xl font-bold text-foreground">
            {updaterCount}
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            <code>setCount(prev =&gt; prev + 1)</code> কিউয়ের ধারাবাহিকতায় প্রতিটি
            আপডেট ধরে রাখে।
          </p>

          <Button
            size="sm"
            variant="default"
            className="w-full"
            onClick={handleUpdaterFunctionUpdates}
          >
            +1 x ৩ বার চালান (Updater)
          </Button>
        </div>
      </div>

      <div className="rounded-lg bg-muted/60 p-3 text-xs border border-border/60">
        <span className="font-semibold text-foreground">স্টেট কিউ স্ট্যাটাস:</span>{" "}
        <span className="text-primary font-mono">{lastAction}</span>
      </div>
    </div>
  )
}
