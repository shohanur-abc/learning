"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৬.১ Server vs Client Components: Interleaving Composition Pattern
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * ক্লায়েন্ট কম্পোনেন্টের ভেতরে সরাসরি কোনো Server Component ইম্পোর্ট করা যায় না
 * (করলে সেটিও ক্লায়েন্ট কম্পোনেন্টে রূপান্তরিত হয়ে বান্ডেলে ঢুকে পড়ে)।
 * সমাধান: সার্ভার কম্পোনেন্টকে ক্লায়েন্ট কম্পোনেন্টের `{children}` হিসেবে পাস করা!
 * এতে ক্লায়েন্ট শেল ইন্টার‍্যাক্টিভ থাকে, আর চাইল্ড সার্ভারে রেন্ডার হয়ে জিরো বান্ডেল বজায় রাখে।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. Composition Over Direct Import: Server Component-কে চাইল্ড প্রপস হিসেবে পাঠাতে হয়।
 * ২. Client Container শুধুমাত্র লেআউট ও ইন্টার‍্যাকশন ম্যানেজ করে, ভেতরের ডেটা চাইল্ডের কাছে থাকে।
 * ৩. এটি Next.js App Router-এর অন্যতম শক্তিশালী পারফরম্যান্স আর্কিটেকচার।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface ClientInteractiveShellProps {
  readonly title: string
  readonly children: React.ReactNode
}

/**
 * একটি ইন্টারেক্টিভ ক্লায়েন্ট শেল যা চাইল্ড হিসেবে যেকোনো কম্পোনেন্ট গ্রহণ করে।
 */
export function ClientInteractiveShell({
  title,
  children,
}: ClientInteractiveShellProps) {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </span>
          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
            Client Wrapper ({isOpen ? "খোলা" : "বন্ধ"})
          </Badge>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "লুকান (Hide)" : "দেখান (Show)"}
        </Button>
      </div>

      {isOpen ? (
        <div className="space-y-3 pt-1">
          <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4">
            <div className="text-xs font-semibold text-primary mb-2 flex items-center gap-2">
              <span>Slot: Passed via {"{children}"} Prop</span>
            </div>
            {children}
          </div>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic py-2">
          কন্টেইনারটি সংকুচিত (collapsed) অবস্থায় আছে।
        </p>
      )}
    </div>
  )
}

/**
 * Interleaving প্যাটার্নের ডেমো: Client Shell-এর ভেতরে সার্ভার কন্টেন্ট কমপোজ করা।
 */
export default function InterleavingComposition() {
  return (
    <ClientInteractiveShell title="ইন্টারলিভিং কম্পোজিশন প্যাটার্ন">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground">
            সার্ভার-রেন্ডারকৃত কন্টেন্ট (Server Slot Content)
          </h4>
          <Badge variant="secondary" className="text-xs">
            Server Executed
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          এই অংশটি সার্ভার থেকে রেন্ডার হয়ে এসেছে। ক্লায়েন্ট র‍্যাপারটি বন্ধ বা খোলা হলেও
          চাইল্ড কোড সরাসরি ক্লায়েন্ট ডিপেন্ডেন্সি গ্রাফে যুক্ত হয়নি।
        </p>
      </div>
    </ClientInteractiveShell>
  )
}
