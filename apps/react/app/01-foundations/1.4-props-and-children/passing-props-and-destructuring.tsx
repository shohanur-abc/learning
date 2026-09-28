import * as React from "react"
import { BadgeCheck, Star } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ১.৪ Props Basics: Props রিসিভ ও Destructuring করার বাস্তব উদাহরণ
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * - Props হলো প্যারেন্ট কম্পোনেন্ট থেকে চাইল্ড কম্পোনেন্টে ডেটা পাঠানোর উপায়।
 * - JavaScript অবজেক্ট ডিস্ট্রাকচারিং এর মাধ্যমে প্রপসের মান ও ডিফল্ট ভ্যালু নেওয়া যায়।
 */

interface StudentCardProps {
  readonly name: string
  readonly course: string
  readonly rating: number
  /** ডিফল্ট মান হিসেবে "Learner" সেট করা রয়েছে */
  readonly role?: string
  /** অপশনাল বুলিয়ান প্রপ */
  readonly isVerified?: boolean
}

/** চাইল্ড কম্পোনেন্ট: ডিস্ট্রাকচারিং এবং ডিফল্ট ভ্যালু ব্যবহার করছে */
function StudentCard({
  name,
  course,
  rating,
  role = "Learner",
  isVerified = false,
}: StudentCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <h4 className="text-sm font-semibold text-foreground">{name}</h4>
          {isVerified && (
            <BadgeCheck className="size-4 text-primary" aria-label="Verified Student" />
          )}
        </div>
        <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
          {role}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>কোর্স: {course}</span>
        <div className="flex items-center gap-1 text-amber-500 font-medium">
          <Star className="size-3.5 fill-amber-500" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}

/** প্যারেন্ট কম্পোনেন্ট: বিভিন্ন প্রপস পাঠিয়ে StudentCard ব্যবহার করছে */
export default function PassingPropsAndDestructuring() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {/* উদাহরণ ১: স্ট্রিং, সংখ্যা ও বুলিয়ান প্রপস সরাসরি পাস করা */}
      <StudentCard
        name="সাকিব হাসান"
        course="React Foundations"
        rating={4.9}
        role="Frontend Pro"
        isVerified={true}
      />

      {/* উদাহরণ ২: role প্রপ দেওয়া হয়নি, তাই ডিফল্ট 'Learner' কার্যকর হবে */}
      <StudentCard
        name="তানভীর আহমেদ"
        course="JavaScript Essentials"
        rating={4.7}
      />
    </div>
  )
}
