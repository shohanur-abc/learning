"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { RenderPulse } from "@workspace/ui/components/custom/learning-components"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৫.২ When NOT to Memoize: Premature Optimization Trap
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * প্রতিটি React হুকের নিজস্ব ওভারহেড আছে। `useMemo` ব্যবহার করলে React-কে একটি ক্লোজার
 * তৈরি করতে হয়, ডিপেন্ডেন্সি অ্যারে সংরক্ষণ করতে হয় এবং প্রতি রেন্ডারে `Object.is`
 * দিয়ে তুলনা চালাতে হয়।
 * সাধারণ গাণিতিক হিসাব বা প্রিমিটিভ ভ্যালুর ক্ষেত্রে সরাসরি ক্যালকুলেশন (Direct Calculation)
 * `useMemo`-এর চেয়ে অনেক দ্রুত ও মেমোরি-সাশ্রয়ী।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. সাধারণ ডেরাইভড স্টেট (যেমন: `price * quantity`) সরাসরি বডিতে হিসাব করুন।
 * ২. মেমোইজেশন শুধুমাত্র ভারী গণনা (হাজার হাজার আইটেম ফিল্টারিং/সর্টিং) অথবা
 *    রেফারেনশিয়াল আইডেন্টিটি রক্ষার জন্য ব্যবহার্য।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function WhenNotToMemoize() {
  const [quantity, setQuantity] = React.useState(2)
  const unitPrice = 1200
  const discountPercent = 10

  // ✅ ইডিওম্যাটিক রিঅ্যাক্ট: সরাসরি সাধারণ হিসাব করা (০ হুক ওভারহেড)
  const subtotal = quantity * unitPrice
  const discount = (subtotal * discountPercent) / 100
  const total = subtotal - discount

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      {/* হেডার */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            কখন মেমোইজেশন অপ্রয়োজনীয়? (Direct Calculation)
          </h4>
          <p className="text-xs text-muted-foreground">
            সহজ গাণিতিক হিসাবে useMemo ব্যবহার না করে সরাসরি ডেরাইভড স্টেট ব্যবহারের নিয়ম
          </p>
        </div>
        <RenderPulse label="ক্যালকুলেশন রান" />
      </div>

      {/* ইন্টারঅ্যাকশন কন্ট্রোল */}
      <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">
            আইটেম পরিমাণ (Quantity State):
          </span>
          <Badge variant="outline" className="font-mono text-xs">
            {quantity} টি
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="text-xs"
          >
            -১ কমান
          </Button>
          <Button
            size="sm"
            onClick={() => setQuantity((q) => q + 1)}
            className="text-xs"
          >
            +১ বাড়ান
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setQuantity(2)}
            className="text-xs text-muted-foreground"
          >
            ডিফল্ট
          </Button>
        </div>
      </div>

      {/* ইনভয়েস হিসাব প্রদর্শন */}
      <div className="rounded-lg border border-border bg-background p-4 space-y-2 text-xs">
        <div className="font-semibold text-foreground border-b pb-2 mb-2">
          অর্ডার সামারি (Directly Derived State):
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>একক মূল্য (Unit Price):</span>
          <span className="font-mono">৳{unitPrice}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>সাব-টোটাল ({quantity} × ৳{unitPrice}):</span>
          <span className="font-mono">৳{subtotal}</span>
        </div>
        <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
          <span>ডিসকাউন্ট ({discountPercent}%):</span>
          <span className="font-mono">-৳{discount}</span>
        </div>
        <div className="flex justify-between font-bold text-foreground border-t pt-2 text-sm">
          <span>সর্বমোট পরিশোধযোগ্য:</span>
          <span className="font-mono text-primary">৳{total}</span>
        </div>
      </div>

      {/* কোড কম্প্যারিজন ব্যাখ্যা */}
      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3.5 space-y-1 text-xs">
        <div className="font-semibold text-emerald-700 dark:text-emerald-400">
          💡 কেন এখানে useMemo ব্যবহার করা অনুচিত?
        </div>
        <p className="text-muted-foreground leading-relaxed">
          <code>quantity * unitPrice</code> হিসাব করতে জাভাস্ক্রিপ্ট ইঞ্জিনের ১ ন্যানোসেকেন্ডেরও কম সময় লাগে।
          এখানে <code>useMemo</code> যোগ করলে ফাংশন কল, ডিপেন্ডেন্সি অ্যারে তৈরি এবং মেমোরি চেকের ওভারহেড উল্টো
          রেন্ডার পারফরম্যান্সকে কিছুটা মন্থর করে তুলবে।
        </p>
      </div>
    </div>
  )
}
