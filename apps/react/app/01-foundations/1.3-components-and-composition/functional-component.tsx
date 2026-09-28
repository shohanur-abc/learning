import * as React from "react"
import { CheckCircle2 } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ১.৩ Components Basics: একটি সাধারণ React Functional Component
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * - React Component মূলত একটি সাধারণ JavaScript ফাংশন, যা রিটার্ন হিসেবে JSX প্রদান করে।
 * - কম্পোনেন্টের নাম সবসময় Capital Letter (PascalCase) দিয়ে শুরু করতে হয়।
 * - ছোট ছোট স্বয়ংসম্পূর্ণ UI ব্লক তৈরি করতে ফাংশন কম্পোনেন্ট ব্যবহার করা হয়।
 */
export default function UserStatusBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 text-xs text-foreground shadow-xs">
      {/* লাইভ স্ট্যাটাস ইন্ডিকেটর */}
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
      </span>

      {/* টেক্সট ও আইকন */}
      <span className="font-medium">Active Member</span>
      <CheckCircle2 className="size-3.5 text-emerald-500" />
    </div>
  )
}
