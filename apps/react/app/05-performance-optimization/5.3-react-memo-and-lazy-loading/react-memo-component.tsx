"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { RenderPulse } from "@workspace/ui/components/custom/learning-components"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৫.৩ React.memo: Component Memoization with Shallow Prop Comparison
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * `React.memo` হলো একটি Higher-Order Component (HOC)। এটি কোনো পিওর প্রেজেন্টেশনাল
 * কম্পোনেন্টকে র‍্যাপ করে রাখে এবং পূর্ববর্তী প্রপস ও নতুন প্রপসের মধ্যে শ্যালো তুলনা
 * (shallow comparison via Object.is) চালায়।
 * প্রপস অপরিবর্তিত থাকলে কম্পোনেন্ট ফাংশনের এক্সিকিউশন সম্পূর্ণ স্কিপ করা হয়।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `const MemoizedComp = React.memo(MyComponent)`
 * ২. প্যারেন্ট রি-রেন্ডার হলেও যদি প্রপস না বদলায়, তবে মেমোইজড চাইল্ড রি-রেন্ডার হয় না।
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface UserCardProps {
  readonly name: string
  readonly role: string
}

/**
 * সাধারণ চাইল্ড কম্পোনেন্ট (আন-মেমোইজড)
 */
function RegularUserCard({ name, role }: UserCardProps) {
  return (
    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-destructive">
          সাধারণ কম্পোনেন্ট (Unmemoized)
        </span>
        <RenderPulse label="রেন্ডার সংখ্যা" />
      </div>
      <div className="text-xs font-medium text-foreground">
        নাম: {name} • পদবি: {role}
      </div>
      <p className="text-[11px] text-muted-foreground">
        প্রপস এক থাকলেও প্যারেন্টের প্রতিটি ক্লিকে আমি আবার রি-রেন্ডার হচ্ছি।
      </p>
    </div>
  )
}

/**
 * React.memo দিয়ে অপ্টিমাইজ করা চাইল্ড কম্পোনেন্ট
 */
const MemoizedUserCard = React.memo(function MemoizedCard({
  name,
  role,
}: UserCardProps) {
  return (
    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          React.memo কম্পোনেন্ট (Optimized)
        </span>
        <RenderPulse label="রেন্ডার সংখ্যা" />
      </div>
      <div className="text-xs font-medium text-foreground">
        নাম: {name} • পদবি: {role}
      </div>
      <p className="text-[11px] text-muted-foreground">
        শ্যালো কম্প্যারিজন প্রপস অপরিবর্তিত পেয়েছে, তাই রেন্ডার সম্পূর্ণ স্কিপ হয়েছে!
      </p>
    </div>
  )
})

export default function ReactMemoComponent() {
  const [parentCount, setParentCount] = React.useState(0)
  const [userIndex, setUserIndex] = React.useState(0)

  const users = [
    { name: "সাকিব আহমেদ", role: "Frontend Lead" },
    { name: "তানভীর হাসান", role: "React Architect" },
  ]

  const fallbackUser = { name: "সাকিব আহমেদ", role: "Frontend Lead" }
  const currentUser = users[userIndex % users.length] ?? fallbackUser

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      {/* প্যারেন্ট হেডার */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            React.memo: কম্পোনেন্ট লেভেল মেমোইজেশন
          </h4>
          <p className="text-xs text-muted-foreground">
            সাধারণ কম্পোনেন্ট বনাম React.memo কম্পোনেন্টের রেন্ডারিং পার্থক্য
          </p>
        </div>
        <RenderPulse label="প্যারেন্ট রেন্ডার" />
      </div>

      {/* প্যারেন্ট কন্ট্রোলস */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* অ্যাকশন ১: প্যারেন্টের স্টেট বাড়ানো */}
        <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">
              অ্যাকশন ১: প্যারেন্ট স্টেট আপডেট
            </span>
            <Badge variant="outline" className="font-mono text-xs">
              Count: {parentCount}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            এখানে ক্লিক করলে প্যারেন্ট রি-রেন্ডার হবে কিন্তু চাইল্ডের প্রপস বদলাবে না।
          </p>
          <Button
            size="sm"
            onClick={() => setParentCount((c) => c + 1)}
            className="text-xs"
          >
            +১ প্যারেন্ট কাউন্টার
          </Button>
        </div>

        {/* অ্যাকশন ২: প্রপস পরিবর্তন করা */}
        <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">
              অ্যাকশন ২: প্রপস পরিবর্তন করা
            </span>
            <Badge variant="secondary" className="text-xs">
              ইউজার #{userIndex + 1}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            এখানে ক্লিক করলে চাইল্ডের প্রপস বদলাবে, ফলে দুটি চাইল্ডই রি-রেন্ডার হবে।
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setUserIndex((i) => i + 1)}
            className="text-xs"
          >
            পরবর্তী ইউজার টগল করুন
          </Button>
        </div>
      </div>

      {/* সাইড-বাই-সাইড চাইল্ড কার্ড */}
      <div className="space-y-3">
        <div className="text-xs font-medium text-muted-foreground">
          চাইল্ড কম্পোনেন্টদ্বয়ের রেন্ডার তুলনা:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RegularUserCard
            name={currentUser.name}
            role={currentUser.role}
          />
          <MemoizedUserCard
            name={currentUser.name}
            role={currentUser.role}
          />
        </div>
      </div>
    </div>
  )
}
