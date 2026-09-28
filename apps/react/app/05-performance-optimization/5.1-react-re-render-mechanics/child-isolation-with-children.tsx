"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { RenderPulse } from "@workspace/ui/components/custom/learning-components"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৫.১ React Re-render Mechanics: Child Isolation using `children` Prop
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * React.memo ছাড়া শুধুমাত্র কম্পোনেন্ট আর্কিটেকচার দিয়ে রেন্ডার অপ্টিমাইজেশনের একটি
 * শক্তিশালী কৌশল হলো "Lifting Content Up" অথবা "Moving State Down"।
 * যখন কোনো Child কম্পোনেন্টকে `children` প্রপ হিসেবে পাস করা হয়, তখন প্যারেন্টের
 * স্টেট পরিবর্তন হলেও Child রি-রেন্ডার হয় না — কারণ Child এলিমেন্টটি তৈরি হয়েছে
 * বাইরের অপরিবর্তিত স্কোপে!
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `children` প্রপের এলিমেন্ট রেফারেন্স একই থাকে, তাই React তার সাব-ট্রি রেন্ডার স্কিপ করে।
 * ২. কোনো হুক বা মেমোইজেশন ওভারহেড ছাড়াই পারফরম্যান্স বৃদ্ধি পায়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface StatefulCounterContainerProps {
  readonly children: React.ReactNode
}

/**
 * স্টেটফুল কনটেইনার: শুধুমাত্র এর ভেতরে স্টেট আছে এবং এটি `{children}` রেন্ডার করে
 */
function StatefulCounterContainer({ children }: StatefulCounterContainerProps) {
  const [count, setCount] = React.useState(0)

  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-primary/10 pb-3">
        <div>
          <span className="text-xs font-semibold text-primary">
            স্টেটফুল কনটেইনার (Stateful Container)
          </span>
          <p className="text-[11px] text-muted-foreground">
            এই কনটেইনারের ভেতরের স্টেট পরিবর্তন হলে কেবল এটি রি-রেন্ডার হবে
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono">
            কাউন্টার: {count}
          </Badge>
          <RenderPulse label="কনটেইনার রেন্ডার" />
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => setCount((prev) => prev + 1)}
          className="text-xs"
        >
          +১ কনটেইনার কাউন্ট
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

      {/* Children স্লট */}
      <div className="pt-2">
        <div className="text-[11px] font-medium text-muted-foreground mb-2">
          নিচের চাইল্ডটি `children` প্রপের মাধ্যমে রেন্ডার হচ্ছে:
        </div>
        {children}
      </div>
    </div>
  )
}

/**
 * আইসোলেটেড চাইল্ড: বাইরের স্কোপে তৈরি হওয়ায় কনটেইনারের স্টেট পরিবর্তনেও এটি রি-রেন্ডার হয় না
 */
function IsolatedContentCard() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-2 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          ✅ আইসোলেটেড চাইল্ড (Render-Free)
        </span>
        <RenderPulse label="চাইল্ড রেন্ডার" />
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        উপরের বাটনে ক্লিক করে কনটেইনার কাউন্টার বাড়ালেও আমার রেন্ডার কাউন্ট ১-এই স্থির
        থাকবে! কারণ আমি কনটেইনারের ভেতরে তৈরি হইনি, বরং বাইরের স্কোপ থেকে <code>children</code> হিসেবে
        প্রবেশ করেছি।
      </p>
    </div>
  )
}

/**
 * মূল কম্পোনেন্ট: আর্কিটেকচারাল প্যাটার্ন প্রদর্শন
 */
export default function ChildIsolationWithChildren() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
      <div className="border-b border-border pb-3">
        <h4 className="text-sm font-semibold text-foreground">
          Children প্রপের মাধ্যমে কম্পোনেন্ট আইসোলেশন
        </h4>
        <p className="text-xs text-muted-foreground">
          React.memo ছাড়াই স্টেট ডাউন এবং কন্টেন্ট স্লটিংয়ের মাধ্যমে অপ্রয়োজনীয় রি-রেন্ডার প্রতিরোধ
        </p>
      </div>

      <StatefulCounterContainer>
        <IsolatedContentCard />
      </StatefulCounterContainer>
    </div>
  )
}
