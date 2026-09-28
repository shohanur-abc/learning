import * as React from "react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ১.২ JSX Rule #4: Valid JavaScript Expressions vs Statements
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * JSX-এ কার্লি ব্রেসেস `{}` এর ভেতর কোন কোন মান কীভাবে রেন্ডার হয়:
 * - String এবং Number সরাসরি স্ক্রিনে দৃশ্যমান হয়।
 * - Booleans (true, false), null, এবং undefined স্ক্রিনে ফাঁকা থাকে (কিছু রেন্ডার হয় না)।
 * - কোনো Statement (যেমন if, for) কার্লি ব্রেসেসে লেখা যায় না, কেবল Expressions (যেমন ternary) চলে।
 */
export default function ValidVsInvalidExpressions() {
  const userName = "সাকিব"
  const points = 100
  const isPremiumMember = true
  const hasNotifications = false
  const unreadCount = 0

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 text-xs">
      {/* ১. স্ট্রিং এবং সংখ্যা সরাসরি টেক্সট হিসেবে প্রদর্শিত হয় */}
      <div>
        <span className="font-semibold text-foreground">String ও Number:</span>{" "}
        <span>{userName} (পয়েন্ট: {points})</span>
      </div>

      {/* ২. Booleans (true, false), null ও undefined স্ক্রিনে কিছু রেন্ডার করে না */}
      <div>
        <span className="font-semibold text-foreground">Booleans ও null:</span>{" "}
        <span className="text-muted-foreground italic">
          [true: {isPremiumMember}] [false: {hasNotifications}] [null: {null}] (স্ক্রিনে ফাঁকা থাকে)
        </span>
      </div>

      {/* ৩. if-else এর বদলে Ternary Expression */}
      <div>
        <span className="font-semibold text-foreground">Ternary Expression:</span>{" "}
        <span className="font-medium text-primary">
          {isPremiumMember ? "প্রিমিয়াম মেম্বার" : "সাধারণ মেম্বার"}
        </span>
      </div>

      {/* ৪. লজিক্যাল AND (&&) এবং ০ (Zero) এর সঠিক ব্যবহার */}
      <div>
        <span className="font-semibold text-foreground">Zero Pitfall এড়ানো:</span>{" "}
        {unreadCount > 0 ? (
          <span>{unreadCount}টি নতুন নোটিফিকেশন</span>
        ) : (
          <span className="text-muted-foreground">কোনো নতুন নোটিফিকেশন নেই</span>
        )}
      </div>
    </div>
  )
}
