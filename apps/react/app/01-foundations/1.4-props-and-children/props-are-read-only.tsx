import * as React from "react"
import { Calculator } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ১.৪ Props Immutability: Props সবসময় Read-Only (অপরিবর্তনযোগ্য)
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * React কম্পোনেন্ট একটি Pure Function এর মতো আচরণ করে।
 * কোনো কম্পোনেন্ট তার নিজের প্রপসের মান কখনোই পরিবর্তন (mutate) করতে পারে না।
 * প্রয়োজনে নতুন লোকাল ভেরিয়েবলে হিসাব (derived value) করে নিতে হয়।
 */

interface BillBreakdownProps {
  readonly baseAmount: number
  readonly vatPercent: number
  readonly discountAmount: number
}

function BillBreakdown({
  baseAmount,
  vatPercent,
  discountAmount,
}: BillBreakdownProps) {
  // ✅ সঠিক পদ্ধতি: প্রপস পরিবর্তন না করে নতুন ভ্যারিয়েবলে হিসাব (Derived Value) বের করা
  const vatAmount = (baseAmount * vatPercent) / 100
  const finalTotal = baseAmount + vatAmount - discountAmount

  return (
    <div className="rounded-xl border border-border bg-card p-4 text-xs space-y-2.5">
      <div className="flex items-center justify-between border-b border-border pb-2 text-muted-foreground">
        <span>মূল বিল:</span>
        <span className="font-mono text-foreground font-medium">{baseAmount} টাকা</span>
      </div>

      <div className="flex items-center justify-between text-muted-foreground">
        <span>ভ্যাট ({vatPercent}%):</span>
        <span className="font-mono text-foreground">+{vatAmount} টাকা</span>
      </div>

      <div className="flex items-center justify-between text-muted-foreground">
        <span>ছাড় (Discount):</span>
        <span className="font-mono text-emerald-500">-{discountAmount} টাকা</span>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-2 font-bold text-foreground">
        <span>সর্বমোট প্রদেয়:</span>
        <span className="font-mono text-primary text-sm">{finalTotal} টাকা</span>
      </div>
    </div>
  )
}

/** প্যারেন্ট কম্পোনেন্ট: ডেমো বিল ডেটা পাঠিয়ে হিসাব দেখাচ্ছে */
export default function PropsAreReadOnly() {
  return (
    <div className="max-w-md">
      <BillBreakdown
        baseAmount={5000}
        vatPercent={5}
        discountAmount={500}
      />
    </div>
  )
}
