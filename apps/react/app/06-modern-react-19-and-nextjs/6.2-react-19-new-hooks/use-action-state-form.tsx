"use client"

import * as React from "react"
import { useActionState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Badge } from "@workspace/ui/components/badge"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৬.২ React 19 New Hooks: useActionState Form Action
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * React 19-এর `useActionState` অ্যাসিনক্রোনাস ফর্ম সাবমিশন পরিচালনার আধুনিক হুক।
 * এটি আগের ম্যানুয়াল `useState(isLoading)`, `try/catch/finally` এবং
 * `e.preventDefault()`-এর প্রয়োজনীয়তা সম্পূর্ণভাবে দূর করে সরাসরি
 * `[state, formAction, isPending]` প্রদান করে।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `action` ফাংশনটি আগের স্টেট `(prevState)` এবং সাবমিট হওয়া `(formData)` গ্রহণ করে।
 * ২. `isPending` ফ্ল্যাগটি স্বয়ংক্রিয়ভাবে ট্রানজিশন লোডিং স্টেট ট্র্যাক করে।
 * ৩. নেটিভ HTML `<form action={formAction}>`-এর সাথে সরাসরি ইন্টিগ্রেট করে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface FormSubmissionState {
  readonly message: string | null
  readonly success: boolean
  readonly submissionCount: number
}

const initialFormState: FormSubmissionState = {
  message: null,
  success: false,
  submissionCount: 0,
}

/**
 * অ্যাসিনক্রোনাস ফর্ম অ্যাকশন ফাংশন যা সার্ভার বা ব্যাকএন্ড প্রসেসিং সিমুলেট করে।
 */
async function registerUserAction(
  prevState: FormSubmissionState,
  formData: FormData
): Promise<FormSubmissionState> {
  const username = formData.get("username")?.toString().trim()

  // বাস্তবসম্মত অ্যাসিনক্রোনাস নেটওয়ার্ক লেটেন্সি সিমুলেশন
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (!username || username.length < 3) {
    return {
      message: "ইউজারনেম কমপক্ষে ৩ অক্ষরের হতে হবে!",
      success: false,
      submissionCount: prevState.submissionCount,
    }
  }

  return {
    message: `স্বাগতম @${username}! সফলভাবে রেজিস্ট্রেশন সম্পন্ন হয়েছে।`,
    success: true,
    submissionCount: prevState.submissionCount + 1,
  }
}

/**
 * useActionState ব্যবহার করে ফর্মের বিশুদ্ধ বাস্তবায়ন।
 */
export default function UseActionStateForm() {
  const [state, formAction, isPending] = useActionState(
    registerUserAction,
    initialFormState
  )

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            React 19 Action Form
          </span>
          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
            useActionState
          </Badge>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          মোট সাবমিশন: {state.submissionCount}
        </span>
      </div>

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm">
            ইউজারনেম লিখুন:
          </Label>
          <Input
            id="username"
            name="username"
            placeholder="e.g. shakib_dev"
            disabled={isPending}
            required
            className="max-w-md"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isPending}>
            {isPending ? "প্রসেস হচ্ছে..." : "সাবমিট করুন (Register)"}
          </Button>

          {isPending ? (
            <span className="text-xs text-muted-foreground animate-pulse">
              অ্যাসিনক্রোনাস ট্রানজিশন চলছে...
            </span>
          ) : null}
        </div>
      </form>

      {state.message ? (
        <div
          className={`rounded-lg p-3 text-xs border ${
            state.success
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
              : "bg-destructive/10 border-destructive/30 text-destructive"
          }`}
        >
          {state.message}
        </div>
      ) : null}
    </div>
  )
}
