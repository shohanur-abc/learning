import * as React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৬.৩ Tailwind & Shadcn Architecture: Compound Component Slots (data-slot)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * Shadcn UI-এর আধুনিক আর্কিটেকচার কম্পাউন্ড কম্পোনেন্ট (Compound Components) প্যাটার্ন
 * এবং HTML5 `data-slot` অ্যাট্রিবিউট ব্যবহার করে। একটি বিশালাকার একক কম্পোনেন্টে
 * ডজন ডজন প্রপস (যেমন `title`, `description`, `footerAction`) পাস করার বদলে ক্ষুদ্র
 * ক্ষুদ্র মডিউলার স্লট উপাদান একত্রিত করে যেকোনো জটিল লেআউট তৈরি করা যায়।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. Declarative Composition: লেআউটের প্রতিটি অংশ আলাদা স্লট কম্পোনেন্ট হিসেবে নিয়ন্ত্রিত।
 * ২. CSS Targetability: `[data-slot="card-header"]` সিলেক্টরের মাধ্যমে প্যারেন্ট থেকে স্টাইল নিয়ন্ত্রণ সহজ।
 * ৩. Prop Explosion Prevention: মূল কম্পোনেন্টে অপ্রয়োজনীয় প্রপসের ভিড় বন্ধ হয়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface CompoundComponentSlotsProps {
  /** শিক্ষার্থীর কোর্স স্ট্যাটাস */
  readonly courseProgress?: number
}

/**
 * Shadcn-এর কম্পাউন্ড স্লট আর্কিটেকচারের বিশুদ্ধ বাস্তবায়ন।
 */
export default function CompoundComponentSlots({
  courseProgress = 85,
}: CompoundComponentSlotsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Compound Component Architecture
          </span>
          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
            data-slot Pattern
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          Slot Composition
        </span>
      </div>

      {/* কম্পাউন্ড কার্ড স্লট কম্পোজিশন */}
      <Card className="max-w-xl shadow-xs">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Next.js ও React 19 Mastery</CardTitle>
            <Badge variant="secondary">Module 06</Badge>
          </div>
          <CardDescription>
            কম্পাউন্ড কম্পোনেন্ট স্লট ব্যবহারের মাধ্যমে নিখুঁত কার্ড স্ট্রাকচার।
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">
            এখানে <code>CardHeader</code>, <code>CardTitle</code>, <code>CardContent</code> এবং{" "}
            <code>CardFooter</code> প্রত্যেকে নিজস্ব <code>data-slot</code> ধারণ করে।
          </p>

          <div className="rounded-lg bg-muted/40 p-3 space-y-1.5 border border-border">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">কোর্স সমাপ্তি প্রগ্রেস:</span>
              <span className="font-mono font-semibold text-foreground">{courseProgress}%</span>
            </div>
            <div className="w-full bg-border h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${courseProgress}%` }}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            স্ট্যাটাস: সক্রিয় ব্যাচ
          </span>
          <Button size="sm" variant="default">
            পরবর্তী মডিউল
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
