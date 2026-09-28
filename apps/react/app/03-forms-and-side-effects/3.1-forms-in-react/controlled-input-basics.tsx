"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Badge } from "@workspace/ui/components/badge"
import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৩.১ Forms in React: Controlled Input Basics
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * React State হলো তথ্যের "Single Source of Truth"। সাধারণ HTML ইনপুটে ব্রাউজারের
 * DOM নিজে ভ্যালু ধরে রাখে, কিন্তু Controlled Input-এ ইনপুটের `value` প্রপটি সরাসরি
 * React স্টেট দ্বারা পরিচালিত হয় এবং ব্যবহারকারীর প্রতিটি কীস্ট্রোক `onChange`
 * হ্যান্ডলারের মাধ্যমে স্টেট আপডেট করে।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `value={text}` এবং `onChange={(e) => setText(e.target.value)}` একসাথে কাজ করে।
 * ২. প্রতিটি কীস্ট্রোকে ভ্যালিডেশন এবং লাইভ ক্যারেক্টার কাউন্ট গণনা করা যায়।
 * ৩. ইনপুট ইনভ্যালিড হলে বা খালি থাকলে সাবমিট বাটন ডিসেবল রাখা যায়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

const MAX_CHARS = 20
const MIN_CHARS = 3

export default function ControlledInputBasics() {
  const [username, setUsername] = React.useState("")
  const [submittedName, setSubmittedName] = React.useState<string | null>(null)

  // রিয়েল-টাইম ভ্যালিডেশন স্টেট
  const charCount = username.length
  const isTooShort = charCount > 0 && charCount < MIN_CHARS
  const isTooLong = charCount > MAX_CHARS
  const hasInvalidChars = /[^a-zA-Z0-9_]/.test(username)
  const isValid = charCount >= MIN_CHARS && !isTooLong && !hasInvalidChars

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Controlled ইনপুটে আমরা চাইলে টাইপিং ফিল্টার বা ফরম্যাটও করতে পারি
    setUsername(e.target.value)
    if (submittedName) setSubmittedName(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      setSubmittedName(username)
    }
  }

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-xs">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="controlled-username" className="text-sm font-medium">
            ইউজারনেম (Controlled Text Input)
          </Label>
          <span
            className={`font-mono text-xs ${
              isTooLong ? "text-destructive font-semibold" : "text-muted-foreground"
            }`}
          >
            {charCount}/{MAX_CHARS}
          </span>
        </div>

        <div className="space-y-1.5">
          <Input
            id="controlled-username"
            type="text"
            placeholder="যেমন: shakib_pro"
            value={username}
            onChange={handleChange}
            className={
              (isTooShort || isTooLong || hasInvalidChars)
                ? "border-destructive focus-visible:ring-destructive/30"
                : ""
            }
          />

          {/* লাইভ ভ্যালিডেশন মেসেজ */}
          {isTooShort && (
            <p className="flex items-center gap-1 text-xs text-destructive">
              <AlertCircle className="size-3.5" />
              কমপক্ষে {MIN_CHARS} টি অক্ষর প্রয়োজন।
            </p>
          )}
          {hasInvalidChars && (
            <p className="flex items-center gap-1 text-xs text-destructive">
              <AlertCircle className="size-3.5" />
              কেবলমাত্র ইংরেজি অক্ষর, সংখ্যা এবং আন্ডারস্কোর (_) গ্রহণযোগ্য।
            </p>
          )}
          {isValid && (
            <p className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-3.5" />
              ইউজারনেমটি নিখুঁত ও গ্রহণযোগ্য!
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          <Button
            type="submit"
            size="sm"
            disabled={!isValid}
            className="gap-1.5"
          >
            <Sparkles className="size-3.5" />
            সেভ করুন
          </Button>

          <Badge variant="outline" className="font-mono text-xs">
            state: &quot;{username}&quot;
          </Badge>
        </div>
      </form>

      {/* সাবমিটেড স্টেট প্রদর্শন */}
      {submittedName && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>
            সফলভাবে সাবমিট হয়েছে! ইউজারনেম: <strong>@{submittedName}</strong>
          </span>
        </div>
      )}
    </div>
  )
}
