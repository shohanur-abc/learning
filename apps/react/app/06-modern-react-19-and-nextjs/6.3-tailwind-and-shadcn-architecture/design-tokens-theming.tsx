import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৬.৩ Tailwind & Shadcn Architecture: Semantic Design Tokens & Theming
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * আধুনিক UI আর্কিটেকচারে সরাসরি রং (যেমন `bg-white`, `text-gray-900`) ব্যবহারের বদলে
 * সেমান্টিক ডিজাইন টোকেন (যেমন `bg-background`, `text-foreground`, `border-border`)
 * ব্যবহার করা হয়। এর ফলে লাইট এবং ডার্ক মোডে আলাদা কোনো `dark:bg-black` ক্লাস
 * না লিখেও স্বয়ংক্রিয়ভাবে থিম অনুযায়ী রং অভিযোজিত (adapt) হয়।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. OKLCH CSS Variables: Shadcn এবং Tailwind v4 ভ্যারিয়েবল-ভিত্তিক টোকেন ব্যবহার করে।
 * ২. Single Source of Truth: থিম পরিবর্তন করা মানে কেবল রুট ভ্যারিয়েবলের মান পরিবর্তন করা।
 * ৩. Accessibility & Contrast: সেমান্টিক টোকেনগুলো পূর্বনির্ধারিত কনট্রাস্ট রেশিও বজায় রাখে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface TokenInfo {
  readonly name: string
  readonly className: string
  readonly role: string
}

const SEMANTIC_TOKENS: readonly TokenInfo[] = [
  { name: "Background / Foreground", className: "bg-background text-foreground border-border", role: "অ্যাপের মূল ক্যানভাস ও প্রধান টেক্সট" },
  { name: "Card / Card-Foreground", className: "bg-card text-card-foreground border-border", role: "কনটেইনার ও কার্ড সারফেস" },
  { name: "Primary / Primary-Foreground", className: "bg-primary text-primary-foreground", role: "প্রধান অ্যাকশন বাটন ও হাইলাইট" },
  { name: "Muted / Muted-Foreground", className: "bg-muted text-muted-foreground", role: "গৌণ ব্যাকগ্রাউন্ড ও সহায়ক টেক্সট" },
]

/**
 * সেমান্টিক ডিজাইন টোকেন ও থিমিং আর্কিটেকচারের বিশুদ্ধ প্রদর্শন।
 */
export default function DesignTokensTheming() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Design Tokens Showcase
          </span>
          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
            Semantic Tokens
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground">
          Zero Hardcoded Hex/RGB Colors
        </span>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-foreground">
          নিচের উপাদানগুলো কোনো হার্ডকোডেড রং ব্যবহার না করে শুধুমাত্র বৈশ্বিক সেমান্টিক টোকেন দিয়ে সাজানো:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SEMANTIC_TOKENS.map((token) => (
            <div
              key={token.name}
              className={`rounded-lg border p-3 space-y-1.5 transition-colors ${token.className}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono">
                  {token.name}
                </span>
                <span className="text-[10px] opacity-75 font-mono">
                  Token
                </span>
              </div>
              <p className="text-xs opacity-90">
                {token.role}
              </p>
              <code className="text-[10px] block opacity-70 font-mono pt-1">
                class: {token.className}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
