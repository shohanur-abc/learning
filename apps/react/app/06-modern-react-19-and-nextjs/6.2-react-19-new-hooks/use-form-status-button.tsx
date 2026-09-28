"use client"

import * as React from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Badge } from "@workspace/ui/components/badge"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৬.২ React 19 New Hooks: useFormStatus Decoupled Button
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * `useFormStatus` হলো `react-dom`-এর একটি হুক যা কোনো প্যারেন্ট `<form>`-এর স্ট্যাটাস
 * (যেমন `pending`, `data`, `method`) পড়ে। এর সবচেয়ে বড় বৈশিষ্ট্য হলো: প্যারেন্ট ফর্ম
 * থেকে কোনো প্রপস (যেমন `isSubmitting`) চাইল্ড বাটনে ড্রিল (prop drilling) করতে হয় না!
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. Decoupled Architecture: সাবমিট বাটন সম্পূর্ণ স্বাধীনভাবে ফর্মের লোডিং স্টেট জানে।
 * ২. Golden Placement Rule: `useFormStatus` অবশ্যই `<form>` ট্যাগের ভেতরে রেন্ডার হওয়া
 *    একটি Child কম্পোনেন্টে কল করতে হবে; যে কম্পোনেন্টটি `<form>` ট্যাগ তৈরি করেছে
 *    তার মধ্যে কল করলে এটি কাজ করবে না।
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * একটি স্বাধীন সাবমিট বাটন যা useFormStatus দিয়ে ফর্মের স্টেট পর্যবেক্ষণ করে।
 */
export function DecoupledSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} variant="default" size="sm">
      {pending ? "সংরক্ষণ হচ্ছে..." : "পোস্ট সংরক্ষণ করুন (Save Post)"}
    </Button>
  )
}

/**
 * useFormStatus প্যাটার্নের বিশুদ্ধ প্রদর্শনী।
 */
export default function UseFormStatusButton() {
  const [lastSubmittedTitle, setLastSubmittedTitle] = React.useState<string | null>(null)

  // ফর্ম হ্যান্ডলার ফাংশন যা অ্যাসিনক্রোনাস কাজ সম্পন্ন করে
  const handleSavePost = async (formData: FormData) => {
    const title = formData.get("postTitle")?.toString().trim()
    // ১ সেকেন্ডের অ্যাসিনক্রোনাস নেটওয়ার্ক রিকোয়েস্ট সিমুলেট করা
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (title) {
      setLastSubmittedTitle(title)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Decoupled Form Status
          </span>
          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
            useFormStatus
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground">
          প্যারেন্ট থেকে কোনো prop drilling ছাড়া
        </span>
      </div>

      <form action={handleSavePost} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="postTitle" className="text-sm">
            পোস্টের শিরোনাম লিখুন:
          </Label>
          <Input
            id="postTitle"
            name="postTitle"
            placeholder="e.g. Mastering React 19 Hooks"
            required
            className="max-w-md"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* এই বাটনটি স্বয়ংক্রিয়ভাবে ফর্মের pending ট্র্যাক করবে */}
          <DecoupledSubmitButton />
        </div>
      </form>

      {lastSubmittedTitle ? (
        <div className="rounded-lg p-3 text-xs border bg-primary/5 border-primary/20 text-foreground flex items-center justify-between">
          <span>সর্বশেষ সংরক্ষিত পোস্ট: <strong>&ldquo;{lastSubmittedTitle}&rdquo;</strong></span>
          <Badge variant="secondary" className="text-xs">
            Saved
          </Badge>
        </div>
      ) : null}
    </div>
  )
}
