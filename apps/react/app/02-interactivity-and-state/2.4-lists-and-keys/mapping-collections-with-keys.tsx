"use client"

import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Clock, BookOpen, CheckCircle2 } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ২.৪ Lists & Keys: Array.map() ও Stable Key দিয়ে কালেকশন রেন্ডারিং
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * React-এ ডাইনামিক ডেটা কালেকশন প্রদর্শন করতে জাভাস্ক্রিপ্ট `Array.prototype.map()`
 * মেথড ব্যবহার করা হয়। প্রতিটি রিটার্নকৃত রুট এলিমেন্টে একটি ইউনিক ও স্ট্যাবল `key`
 * প্রপ দেওয়া বাধ্যতামূলক, যাতে React Reconciliation প্রক্রিয়ায় কোন এলিমেন্টটি
 * পরিবর্তিত, যুক্ত বা অপসারিত হয়েছে তা দ্রুত ও নির্ভুলভাবে শনাক্ত করতে পারে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface TopicLesson {
  readonly id: string
  readonly title: string
  readonly duration: string
  readonly level: "Beginner" | "Intermediate" | "Advanced"
  readonly isCompleted: boolean
}

const CURRICULUM_LESSONS: readonly TopicLesson[] = [
  {
    id: "lesson-201",
    title: "Event Handling ও SyntheticEvent মেকানিক্স",
    duration: "১৫ মিনিট",
    level: "Beginner",
    isCompleted: true,
  },
  {
    id: "lesson-202",
    title: "useState Hook: স্ন্যাপশট ও আপডেটার ফাংশন",
    duration: "২৫ মিনিট",
    level: "Intermediate",
    isCompleted: true,
  },
  {
    id: "lesson-203",
    title: "Conditional Rendering ও 0 Falsy ফাঁদ",
    duration: "২০ মিনিট",
    level: "Beginner",
    isCompleted: true,
  },
  {
    id: "lesson-204",
    title: "Lists & Keys: Reconciliation এবং Diffing অ্যালগরিদম",
    duration: "৩০ মিনিট",
    level: "Advanced",
    isCompleted: false,
  },
]

export default function MappingCollectionsWithKeys() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="space-y-0.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            কারিকুলাম লেসন লিস্ট (.map() ডেমো)
          </span>
          <p className="text-xs text-muted-foreground">
            প্রতিটি আইটেমে ডেটাবেস আইডি <code>key=&#123;lesson.id&#125;</code> ব্যবহার করা হয়েছে
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          মোট পাঠ: {CURRICULUM_LESSONS.length}টি
        </Badge>
      </div>

      <div className="space-y-2.5">
        {/* ✅ সঠিক প্যাটার্ন: .map() এর মাধ্যমে JSX রূপান্তর এবং আউটার নোডে key={lesson.id} */}
        {CURRICULUM_LESSONS.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background p-3.5 transition-colors hover:border-primary/40"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {lesson.isCompleted ? (
                  <CheckCircle2 className="size-4 text-emerald-500" />
                ) : (
                  <BookOpen className="size-4 text-muted-foreground" />
                )}
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-foreground block">
                  {lesson.title}
                </span>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" /> {lesson.duration}
                  </span>
                  <span>•</span>
                  <span>ID: <code className="font-mono">{lesson.id}</code></span>
                </div>
              </div>
            </div>

            <Badge
              variant={lesson.level === "Advanced" ? "default" : "secondary"}
              className="text-[10px]"
            >
              {lesson.level}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
