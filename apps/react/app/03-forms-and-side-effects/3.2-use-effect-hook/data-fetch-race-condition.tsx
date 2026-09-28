"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Loader2, ShieldCheck, User, Zap } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৩.২ useEffect Hook: Data Fetching & Race Condition Prevention
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * নেটওয়ার্ক রিকোয়েস্টের গতি অনিশ্চিত। ব্যবহারকারী যদি দ্রুত একটি অপশন থেকে
 * অন্য অপশনে ক্লিক করেন, তবে আগের ধীরগতির রিকোয়েস্টের রেসপন্স পরের দ্রুতগতির
 * রেসপন্সের পরে এসে UI-তে ভুল ডেটা প্রতিস্থাপন (Overwrite) করতে পারে। এটিই
 * "Race Condition"। `useEffect`-এ একটি ক্লিন-আপ ফ্ল্যাগ (`let ignore = false; return () => { ignore = true; }`)
 * ব্যবহার করে পুরনো রেসপন্সগুলো নিরাপদে বাতিল করা হয়।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. প্রতিটি ইফেক্ট রান করার সময় একটি লোকাল বুলিয়ান ফ্ল্যাগ `let ignore = false` নেওয়া হয়।
 * ২. ইফেক্টের ক্লিন-আপ ফাংশনে `ignore = true` সেট করা হয়।
 * ৩. প্রমিজ সম্পন্ন হওয়ার পর যদি `!ignore` থাকে, কেবল তখনই স্টেট আপডেট করা হয়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

type UserId = "user-1" | "user-2" | "user-3"

interface UserProfile {
  id: UserId
  name: string
  role: string
  bio: string
  delayMs: number
}

const mockDatabase: Record<UserId, UserProfile> = {
  "user-1": {
    id: "user-1",
    name: "শাকিব হাসান",
    role: "সিনিয়র রিঅ্যাক্ট আর্কিটেক্ট",
    bio: "Next.js ও স্টেট অপটিমাইজেশন নিয়ে কাজ করেন। (দেরি: ১.২ সেকেন্ড)",
    delayMs: 1200,
  },
  "user-2": {
    id: "user-2",
    name: "তানভীর আহমেদ",
    role: "ইউজার ইন্টারফেস ইঞ্জিনিয়ার",
    bio: "Tailwind CSS ও অ্যাক্সেসিবিলিটি বিশেষজ্ঞ। (দেরি: ০.৩ সেকেন্ড)",
    delayMs: 300,
  },
  "user-3": {
    id: "user-3",
    name: "আরিফুল ইসলাম",
    role: "ফুলস্ট্যাক ডেভেলপার",
    bio: "TypeScript ও ক্লাউড সিস্টেম ডিজাইনার। (দেরি: ০.৭ সেকেন্ড)",
    delayMs: 700,
  },
}

export default function DataFetchRaceCondition() {
  const [selectedId, setSelectedId] = React.useState<UserId>("user-1")
  const [profile, setProfile] = React.useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [logMessage, setLogMessage] = React.useState<string>("")

  React.useEffect(() => {
    // 🌟 রেস কন্ডিশন প্রতিরোধের সুরক্ষামূলক ক্লিন-আপ ফ্ল্যাগ
    let ignore = false
    setIsLoading(true)

    const targetUser = mockDatabase[selectedId]
    if (!targetUser) return

    const timer = setTimeout(() => {
      if (!ignore) {
        // কেবল যদি এই রিকোয়েস্টটি এখনও সক্রিয় থাকে, তবেই স্টেট আপডেট হবে
        setProfile(targetUser)
        setIsLoading(false)
        setLogMessage(`✅ ${targetUser.name}-এর ডেটা সফলভাবে রেন্ডার হয়েছে।`)
      } else {
        // পুরনো রিকোয়েস্টের রেসপন্স যথাসময়ে এলেও তা ড্রপ করা হয়েছে
        // console.log(`Dropped stale response for ${targetUser.name}`)
      }
    }, targetUser.delayMs)

    return () => {
      // ব্যবহারকারী অন্য আইডিতে ক্লিক করলে আগেরটি অকার্যকর (Stale) ঘোষিত হয়
      ignore = true
      clearTimeout(timer)
    }
  }, [selectedId])

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="text-xs font-semibold text-foreground">
          অ্যাসিনক্রোনাস রেস কন্ডিশন সেফগার্ড
        </span>
        <Badge variant="outline" className="gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="size-3" />
          Active Ignore Guard
        </Badge>
      </div>

      {/* ইউজার সিলেক্টর বাটনসমূহ */}
      <div className="space-y-1.5">
        <div className="text-xs text-muted-foreground">
          নিচের ইউজারগুলোতে দ্রুত পর্যায়ক্রমে ক্লিক করে পরিবর্তন দেখুন:
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.values(mockDatabase).map((u) => (
            <Button
              key={u.id}
              size="sm"
              variant={selectedId === u.id ? "default" : "outline"}
              onClick={() => setSelectedId(u.id)}
              className="text-xs gap-1.5"
            >
              <User className="size-3.5" />
              {u.name}
              <span className="text-[10px] opacity-70">({u.delayMs}ms)</span>
            </Button>
          ))}
        </div>
      </div>

      {/* প্রোফাইল প্রিভিউ কার্ড */}
      <div className="rounded-lg border border-border bg-muted/20 p-4 min-h-[110px] flex flex-col justify-center">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground py-4">
            <Loader2 className="size-4 animate-spin text-primary" />
            <span>ডেটা ফেচ করা হচ্ছে ({mockDatabase[selectedId]?.delayMs ?? 500}ms লেটেন্সি)...</span>
          </div>
        ) : profile ? (
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground">{profile.name}</h4>
              <Badge variant="secondary" className="text-[10px]">
                ID: {profile.id}
              </Badge>
            </div>
            <p className="text-primary font-medium text-[11px]">{profile.role}</p>
            <p className="text-muted-foreground">{profile.bio}</p>
          </div>
        ) : null}
      </div>

      {/* অ্যাক্টিভিটি লগ */}
      {logMessage && (
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
          <Zap className="size-3 text-amber-500" />
          <span>{logMessage}</span>
        </div>
      )}
    </div>
  )
}
