"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { RenderPulse } from "@workspace/ui/components/custom/learning-components"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৫.১ React Re-render Mechanics: Parent-Child Render Cascade
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * React-এ ডিফল্টভাবে যখন কোনো Parent কম্পোনেন্ট রি-রেন্ডার হয়, তখন তার ভেতরের
 * সমস্ত Child কম্পোনেন্টও ক্রমান্বয়ে (cascade) পুনরায় এক্সিকিউট হয় — এমনকি Child-এর
 * props সম্পূর্ণ অপরিবর্তিত থাকলেও!
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. Parent re-render => All Children re-render (ডিফল্ট আচরণ)।
 * ২. Child-এর নিজস্ব কোনো স্টেট বা পরিবর্তিত props না থাকলেও সে পুনরায় এক্সিকিউট হয়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface StaticChildCardProps {
  readonly title: string
  readonly description: string
}

/**
 * একটি সাধারণ Child কম্পোনেন্ট — এর কোনো প্রপস বা স্টেট পরিবর্তন হচ্ছে না
 */
function StaticChildCard({ title, description }: StaticChildCardProps) {
  return (
    <div className="rounded-lg border border-border bg-background p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground">{title}</span>
        <RenderPulse label="Child রেন্ডার" />
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
      <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
        ⚠️ কোনো প্রপস পরিবর্তন না হলেও Parent রেন্ডার হওয়ায় আমিও রি-রেন্ডার হচ্ছি!
      </div>
    </div>
  )
}

/**
 * Parent কম্পোনেন্ট: স্টেট হোল্ড করে এবং Child রেন্ডার করে
 */
export default function ParentChildCascade() {
  const [parentCount, setParentCount] = React.useState(0)

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      {/* Parent হেডার */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-foreground">
              Parent কম্পোনেন্ট (স্টেটফুল)
            </h4>
            <Badge variant="outline" className="text-xs font-mono">
              Parent Count: {parentCount}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            নিচের বাটনে ক্লিক করে প্যারেন্টের স্টেট পরিবর্তন করুন
          </p>
        </div>
        <RenderPulse label="Parent রেন্ডার" />
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => setParentCount((prev) => prev + 1)}
          className="text-xs"
        >
          +১ প্যারেন্ট কাউন্টার
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setParentCount(0)}
          className="text-xs"
        >
          রিসেট
        </Button>
      </div>

      {/* Child কম্পোনেন্ট সেকশন */}
      <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-3">
        <div className="text-xs font-medium text-foreground">
          প্যারেন্টের ভেতরে রেন্ডার হওয়া Child সাব-ট্রি:
        </div>
        <StaticChildCard
          title="স্ট্যাটিক চাইল্ড কম্পোনেন্ট #১"
          description="আমার প্রপস ফিক্সড স্ট্রিং, কোনো স্টেট নেই।"
        />
        <StaticChildCard
          title="স্ট্যাটিক চাইল্ড কম্পোনেন্ট #২"
          description="আমিও হুবহু একই স্ট্যাটিক প্রপস ধারণ করছি।"
        />
      </div>
    </div>
  )
}
