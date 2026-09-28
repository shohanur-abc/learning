"use client"

import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Badge } from "@workspace/ui/components/badge"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৬.৩ Tailwind & Shadcn Architecture: Accessible Primitive Wrapper & cn()
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * Shadcn UI-এর সমস্ত কম্পোনেন্ট unstyled বা এক্সেসিবল প্রিমিটিভের ওপর তৈরি।
 * এর মূল জাদু হলো `cn()` ইউটিলিটি (`clsx` + `tailwind-merge`)। সাধারণ স্ট্রিং
 * কনক্যাটিনেশন (`classA + " " + classB`) করলে Tailwind-এর CSS Specificity কনফ্লিক্ট
 * তৈরি হয়, কিন্তু `cn()` স্বয়ংক্রিয়ভাবে পরস্পরবিরোধী ক্লাস ডি-ডুপ্লিকেট করে।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. Conflict Resolution: যেমন `px-4` এবং `px-6` পাস করলে `cn()` স্বয়ংক্রিয়ভাবে শেষেরটি রাখে।
 * ২. WAI-ARIA Readiness: প্রিমিটিভ র‍্যাপারগুলো অ্যাক্সেসিবিলিটি অ্যাট্রিবিউট (`aria-*`, `role`) অক্ষত রাখে।
 * ৩. Polymorphism & Props Forwarding: `React.ComponentProps<"button">`-এর মাধ্যমে নেটিভ সব প্রপস প্রোপাগেট হয়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface AccessibleCalloutProps extends React.ComponentProps<"div"> {
  /** কলআউটের ধরণ বা গুরুত্ব */
  readonly variant?: "info" | "warning" | "success"
}

/**
 * একটি কাস্টম এক্সেসিবল কলআউট প্রিমিটিভ যা cn() দিয়ে ক্লাস মার্জ করে।
 */
export function AccessibleCallout({
  variant = "info",
  className,
  children,
  ...props
}: AccessibleCalloutProps) {
  const variantStyles = {
    info: "border-primary/30 bg-primary/5 text-foreground",
    warning: "border-amber-500/30 bg-amber-500/5 text-amber-900 dark:text-amber-200",
    success: "border-emerald-500/30 bg-emerald-500/5 text-emerald-900 dark:text-emerald-200",
  }

  return (
    <div
      role="region"
      aria-label="Accessible status callout"
      className={cn(
        // ১. বেস স্টাইল (Base styles)
        "rounded-xl border p-4 text-xs transition-colors space-y-1",
        // ২. ভ্যারিয়েন্ট স্টাইল (Variant-specific styles)
        variantStyles[variant],
        // ৩. কনজিউমার ক্লাস যা নিরাপদে মার্জ হবে (Consumer override classes)
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * এক্সেসিবল প্রিমিটিভ ও cn() ক্লাস মার্জিংয়ের বিশুদ্ধ প্রদর্শন।
 */
export default function AccessiblePrimitiveWrapper() {
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Primitive Wrapper Demo
          </span>
          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
            cn() Utility
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground">
          WAI-ARIA + tailwind-merge
        </span>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-foreground">
          নিচের কলআউটগুলো একই বেস প্রিমিটিভ ব্যবহার করছে, কিন্তু <code>cn()</code>-এর মাধ্যমে আলাদা স্টাইল নিরাপদে মার্জ করা হয়েছে:
        </p>

        {/* ১. ডিফল্ট ইনফো কলআউট */}
        <AccessibleCallout variant="info">
          <div className="font-semibold text-primary">
            ℹ️ ডিফল্ট ইনফো ভ্যারিয়েন্ট (Default Base)
          </div>
          <p className="text-muted-foreground">
            বেস প্যাডিং <code>p-4</code> এবং প্রাইমারি থিম বর্ডার ব্যবহার করছে।
          </p>
        </AccessibleCallout>

        {/* ২. ওভাররাইড সহ সাকসেস কলআউট */}
        <AccessibleCallout
          variant="success"
          className="p-5 font-mono shadow-xs border-emerald-500/50"
        >
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">
            ✅ কাস্টম ওভাররাইড সহ কলআউট (Overridden via cn)
          </div>
          <p className="text-muted-foreground text-[11px]">
            এখানে <code>className=&quot;p-5&quot;</code> পাস করায় <code>tailwind-merge</code> কোনো সিলেক্টিভিটি বাগ ছাড়া বেস <code>p-4</code> কে প্রতিস্থাপন করেছে।
          </p>
        </AccessibleCallout>

        {/* ৩. অ্যাক্সেসিবল ইন্টারেক্টিভ টগল */}
        <button
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
          className={cn(
            "w-full text-left text-xs font-medium p-2.5 rounded-lg border transition-colors flex items-center justify-between",
            isExpanded
              ? "bg-accent text-accent-foreground border-accent"
              : "bg-muted/30 text-muted-foreground border-border hover:bg-muted/50"
          )}
        >
          <span>ARIA Expanded Status: <strong>{isExpanded ? "TRUE" : "FALSE"}</strong></span>
          <span className="text-[10px] font-mono">ক্লিক করে টগল করুন</span>
        </button>
      </div>
    </div>
  )
}
