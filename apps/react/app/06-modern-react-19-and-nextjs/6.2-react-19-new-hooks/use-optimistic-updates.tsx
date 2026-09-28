"use client"

import * as React from "react"
import { useOptimistic, useTransition } from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৬.২ React 19 New Hooks: useOptimistic Instant UI Updates
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * আধুনিক অ্যাপ্লিকেশনে ইউজার অভিজ্ঞতা (UX) দ্রুতগতির রাখতে সার্ভার রেসপন্সের
 * অপেক্ষা না করে তৎক্ষণাৎ UI আপডেট দেখানোকে Optimistic UI বলে।
 * React 19-এর `useOptimistic` হুকটি ট্রানজিশন চলাকালীন ক্ষণস্থায়ী অপ্টিমিস্টিক
 * ভ্যালু দেখায় এবং সার্ভার প্রসেস সম্পন্ন হলে মূল স্টেটের সাথে সিঙ্ক করে।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. ইনস্ট্যান্ট ফিডব্যাক: ইউজার বাটনে ক্লিক করা মাত্র UI আপডেট দেখতে পান (০ মিলিসেকেন্ড লেটেন্সি)।
 * ২. ট্রানজিশন বাউন্ড: অপ্টিমিস্টিক আপডেট অবশ্যই `startTransition` বা Form Action-এর ভেতর চালাতে হয়।
 * ৩. স্বয়ংক্রিয় ফলব্যাক: সার্ভার এরর হলে বা অ্যাকশন শেষ হলে React নিজে থেকেই রিয়েল স্টেটে ফিরে আসে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface UseOptimisticUpdatesProps {
  /** প্রারম্ভিক লাইক সংখ্যা */
  readonly initialLikes?: number
}

/**
 * useOptimistic ব্যবহার করে ইনস্ট্যান্ট অপ্টিমিস্টিক আপডেটের বিশুদ্ধ বাস্তবায়ন।
 */
export default function UseOptimisticUpdates({
  initialLikes = 42,
}: UseOptimisticUpdatesProps) {
  const [likes, setLikes] = React.useState(initialLikes)
  const [isPending, startTransition] = useTransition()

  // useOptimistic(passthroughState, updateFn)
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes,
    (currentLikes, addedLikes: number) => currentLikes + addedLikes
  )

  const handleLike = () => {
    startTransition(async () => {
      // ১. ব্রাউজারে অবিলম্বে অপ্টিমিস্টিক স্টেট সেট করা (০ মিলিসেকেন্ড)
      setOptimisticLikes(1)

      // ২. ব্যাকএন্ড সার্ভার লেটেন্সি সিমুলেট করা (১ সেকেন্ড)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // ৩. সার্ভার থেকে সফল হলে স্থায়ী স্টেট আপডেট
      setLikes((prev) => prev + 1)
    })
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Optimistic UI Demo
          </span>
          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
            useOptimistic
          </Badge>
        </div>

        {isPending ? (
          <Badge variant="secondary" className="text-xs animate-pulse text-amber-600 dark:text-amber-400">
            সার্ভারে সেভ হচ্ছে...
          </Badge>
        ) : (
          <Badge variant="outline" className="text-xs text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            সিঙ্কড (Synced)
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 p-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">
              React 19 Architecture Guide
            </h4>
            <p className="text-xs text-muted-foreground">
              লাইক বাটনে ক্লিক করে সাথে সাথে অপ্টিমিস্টিক বৃদ্ধি লক্ষ্য করুন।
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-bold font-mono text-primary">
              {optimisticLikes}
            </span>
            <span className="block text-[10px] text-muted-foreground uppercase">
              Total Likes
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={handleLike}
            disabled={isPending}
            variant="default"
          >
            {isPending ? "সেভ হচ্ছে..." : "👍 লাইক দিন (+1 Like)"}
          </Button>

          <span className="text-xs text-muted-foreground">
            স্থায়ী সার্ভার ভ্যালু: <strong>{likes}</strong> | প্রদর্শিত মান: <strong>{optimisticLikes}</strong>
          </span>
        </div>
      </div>
    </div>
  )
}
