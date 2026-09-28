import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৬.১ Server vs Client Components: Server Component Pattern (RSC)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * Server Component হলো Next.js App Router-এর ডিফল্ট মডেল। এখানে কোনো `'use client'`
 * থাকে না। এই কম্পোনেন্টগুলো সার্ভারে এক্সিকিউট হয় এবং ক্লায়েন্ট ব্রাউজারে কেবল
 * রেন্ডার হওয়া HTML/RSC Payload পাঠানো হয়—কোনো জাভাস্ক্রিপ্ট বান্ডেল যুক্ত হয় না।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. Zero Client Bundle: এই ফাইলের সাইজ বা ডিপেন্ডেন্সি যত বড়ই হোক, ক্লায়েন্ট ব্রাউজার তা ডাউনলোড করে না।
 * ২. Direct Resource Access: ডাটাবেস, ফাইল সিস্টেম এবং গোপন এনভায়রনমেন্ট ভ্যারিয়েবল সরাসরি অ্যাক্সেসযোগ্য।
 * ৩. নো হুক্স: এখানে `useState` বা `useEffect` ব্যবহার করা যায় না, কারণ সার্ভারে কোনো DOM লাইফসাইকেল নেই।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface ServerDataPayload {
  readonly serverRegion: string
  readonly renderMode: "Server-Side (RSC)" | "Static Prerender"
  readonly generatedTimestamp: string
  readonly securityStatus: "Secure Backend Execution"
}

export interface ServerComponentPatternProps {
  /** সার্ভার থেকে সরবরাহকৃত ডাটা পেলোড (ঐচ্ছিক) */
  readonly payload?: ServerDataPayload
}

const defaultServerPayload: ServerDataPayload = {
  serverRegion: "iad1 (AWS us-east-1)",
  renderMode: "Server-Side (RSC)",
  generatedTimestamp: "2026-09-28T04:15:00.000Z",
  securityStatus: "Secure Backend Execution",
}

/**
 * বিশুদ্ধ সার্ভার কম্পোনেন্ট প্যাটার্ন যা ক্লায়েন্ট বান্ডেল ছাড়া ডেটা উপস্থাপন করে।
 */
export default function ServerComponentPattern({
  payload = defaultServerPayload,
}: ServerComponentPatternProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Server Component Output
          </span>
          <Badge variant="secondary" className="text-xs font-mono">
            0 Bundle JS
          </Badge>
        </div>
        <Badge variant="outline" className="text-xs text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
          {payload.securityStatus}
        </Badge>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-foreground">
          এই কম্পোনেন্টটি সার্ভার-সাইড ডাটা সরাসরি রেন্ডার করছে। ক্লায়েন্টে কোনো অতিরিক্ত JS শিপ হয়নি:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1">
            <span className="text-muted-foreground block">সার্ভার রিজিওন / লোকেশন:</span>
            <span className="font-mono font-medium text-foreground">
              {payload.serverRegion}
            </span>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1">
            <span className="text-muted-foreground block">রেন্ডার মোড:</span>
            <span className="font-mono font-medium text-foreground">
              {payload.renderMode}
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-background p-3 text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">টাইমস্ট্যাম্প (ISO):</span>
            <span className="font-mono text-primary font-semibold">
              {payload.generatedTimestamp}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
