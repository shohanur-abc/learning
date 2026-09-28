"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Badge } from "@workspace/ui/components/badge"
import { Textarea } from "@workspace/ui/components/textarea"
import { Send, FileText, CheckCircle2 } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৩.১ Forms in React: Uncontrolled Form with FormData
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * Uncontrolled Form-এ React প্রতিটি কীস্ট্রোকে স্টেট আপডেট করে না; বরং ইনপুটের মান
 * ব্রাউজারের নিজস্ব DOM এলিমেন্টে জমা থাকে। ফর্ম সাবমিট করার সময় স্ট্যান্ডার্ড
 * ব্রাউজার API `new FormData(event.currentTarget)` ব্যবহার করে একবারে সব ডেটা
 * রিড করা হয়।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. ইনপুটগুলোতে `value` বা `onChange` দেওয়ার প্রয়োজন নেই, কেবল `name` অ্যাট্রিবিউট থাকাই যথেষ্ট।
 * ২. প্রতিটি কীস্ট্রোকে কোনো রি-রেন্ডার ট্রিগার হয় না, ফলে বিশাল ফর্মের পারফরম্যান্স চমৎকার থাকে।
 * ৩. সাবমিটের পর `form.reset()` দিয়ে খুব সহজেই পুরো ফর্ম রিসেট করা যায়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface FeedbackRecord {
  title: string
  category: string
  feedback: string
  urgent: boolean
}

export default function UncontrolledFormWithFormData() {
  const [submittedRecord, setSubmittedRecord] = React.useState<FeedbackRecord | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 🌟 ব্রাউজারের নেটিভ FormData API দিয়ে DOM থেকে সরাসরি মান গ্রহণ
    const form = e.currentTarget
    const formData = new FormData(form)

    const title = (formData.get("title") as string) || ""
    const category = (formData.get("category") as string) || "feedback"
    const feedback = (formData.get("feedback") as string) || ""
    const urgent = formData.get("urgent") === "on"

    setSubmittedRecord({ title, category, feedback, urgent })

    // নেটিভ DOM ফর্ম রিসেট
    form.reset()
  }

  return (
    <div className="space-y-5 rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">
            মতামত ফরম (Native FormData)
          </span>
        </div>
        <Badge variant="outline" className="text-[11px]">
          No onChange • Zero Re-renders
        </Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* টাইটেল ইনপুট */}
        <div className="space-y-1.5">
          <Label htmlFor="uncontrolled-title" className="text-xs font-medium">
            বিষয় (Subject)
          </Label>
          <Input
            id="uncontrolled-title"
            name="title"
            type="text"
            placeholder="ফিচার রিকোয়েস্ট অথবা বাগ রিপোর্ট"
            required
            defaultValue="React 19 Server Actions এক্সপ্লোরেশন"
          />
        </div>

        {/* ক্যাটেগরি সিলেক্ট */}
        <div className="space-y-1.5">
          <Label htmlFor="uncontrolled-category" className="text-xs font-medium">
            বিভাগ (Category)
          </Label>
          <select
            id="uncontrolled-category"
            name="category"
            defaultValue="feature"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-input/20"
          >
            <option value="bug" className="bg-background text-foreground">🐞 Bug Report</option>
            <option value="feature" className="bg-background text-foreground">✨ Feature Request</option>
            <option value="feedback" className="bg-background text-foreground">💬 General Feedback</option>
          </select>
        </div>

        {/* মতামত টেক্সট এরিয়া */}
        <div className="space-y-1.5">
          <Label htmlFor="uncontrolled-feedback" className="text-xs font-medium">
            বিস্তারিত মন্তব্য (Comments)
          </Label>
          <Textarea
            id="uncontrolled-feedback"
            name="feedback"
            rows={3}
            placeholder="আপনার মতামত সংক্ষেপে লিখুন..."
            required
            defaultValue="কোর্স কনটেন্ট খুবই শিক্ষণীয় ও প্রাঞ্জল।"
          />
        </div>

        {/* আর্জেন্ট চেকবক্স */}
        <div className="flex items-center gap-2 pt-1">
          <input
            id="uncontrolled-urgent"
            name="urgent"
            type="checkbox"
            className="size-4 rounded border-input accent-primary cursor-pointer"
          />
          <Label htmlFor="uncontrolled-urgent" className="text-xs cursor-pointer text-muted-foreground">
            জরুরি ভিত্তিতে সমাধান প্রয়োজন (Urgent flag)
          </Label>
        </div>

        <Button type="submit" size="sm" className="gap-1.5">
          <Send className="size-3.5" />
          FormData দিয়ে সাবমিট করুন
        </Button>
      </form>

      {/* সাবমিটেড ডেটা আউটপুট */}
      {submittedRecord && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3.5 text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-primary">
            <CheckCircle2 className="size-4" />
            FormData সফলভাবে সংগ্রহ করা হয়েছে:
          </div>
          <div className="grid grid-cols-2 gap-2 text-foreground pt-1">
            <div>
              <span className="text-muted-foreground">বিষয়: </span>
              <strong>{submittedRecord.title}</strong>
            </div>
            <div>
              <span className="text-muted-foreground">ক্যাটেগরি: </span>
              <Badge variant="secondary" className="text-[10px]">
                {submittedRecord.category}
              </Badge>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">মন্তব্য: </span>
              <span className="font-mono text-[11px]">{submittedRecord.feedback}</span>
            </div>
            <div>
              <span className="text-muted-foreground">জরুরি স্ট্যাটাস: </span>
              <strong>{submittedRecord.urgent ? "হ্যাঁ (Urgent)" : "না (Normal)"}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
