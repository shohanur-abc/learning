"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Badge } from "@workspace/ui/components/badge"
import { CheckCircle2, RotateCcw, UserCheck } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৩.১ Forms in React: Multi-Field Form State
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * ফর্মের প্রতিটি ইনপুটের জন্য আলাদা আলাদা `useState` নেওয়ার পরিবর্তে একটিমাত্র
 * অবজেক্ট স্টেটের মাধ্যমে একাধিক ফিল্ড পরিচালনা করা যায়। `[e.target.name]: value`
 * ডায়নামিক কী (computed property name) ব্যবহার করে একটি একক হ্যান্ডলারেই সব
 * ইনপুট হ্যান্ডেল করা সম্ভব।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. ইনপুটগুলোর `name` অ্যাট্রিবিউট অবজেক্টের কী-এর সাথে হুবহু মিলতে হবে।
 * ২. অবজেক্ট স্টেট আপডেট করতে অবশ্যই স্প্রেড অপারেটর `...prev` ব্যবহার করতে হবে।
 * ৩. চেকবক্সের বেলায় `e.target.value`-এর বদলে `e.target.checked` রিড করতে হয়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface FormState {
  fullName: string
  email: string
  role: string
  newsletter: boolean
}

const initialFormState: FormState = {
  fullName: "",
  email: "",
  role: "frontend",
  newsletter: true,
}

export default function MultiFieldFormState() {
  const [formData, setFormData] = React.useState<FormState>(initialFormState)
  const [submittedData, setSubmittedData] = React.useState<FormState | null>(null)

  // একটিমাত্র জেনেরিক হ্যান্ডলার সমস্ত ইনপুট ফিল্ড আপডেট করছে
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleReset = () => {
    setFormData(initialFormState)
    setSubmittedData(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedData(formData)
  }

  return (
    <div className="space-y-5 rounded-xl border border-border bg-card p-5 shadow-xs">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ফিল্ড ১: পুরো নাম */}
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="text-xs font-medium">
            পূর্ণ নাম (Text)
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="যেমন: সাকিব হাসান"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* ফিল্ড ২: ইমেইল */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-medium">
            ইমেইল ঠিকানা (Email)
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="shakib@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* ফিল্ড ৩: রোল ড্রপডাউন (Select) */}
        <div className="space-y-1.5">
          <Label htmlFor="role" className="text-xs font-medium">
            পছন্দের রোল (Select Dropdown)
          </Label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-input/20"
          >
            <option value="frontend" className="bg-background text-foreground">Frontend Developer</option>
            <option value="backend" className="bg-background text-foreground">Backend Engineer</option>
            <option value="fullstack" className="bg-background text-foreground">Fullstack Architect</option>
          </select>
        </div>

        {/* ফিল্ড ৪: নিউজলেটার চেকবক্স */}
        <div className="flex items-center gap-2 pt-1">
          <input
            id="newsletter"
            name="newsletter"
            type="checkbox"
            checked={formData.newsletter}
            onChange={handleChange}
            className="size-4 rounded border-input accent-primary cursor-pointer"
          />
          <Label htmlFor="newsletter" className="text-xs cursor-pointer text-muted-foreground">
            সাপ্তাহিক React টিপস ও নিউজলেটার পেতে চাই
          </Label>
        </div>

        {/* অ্যাকশন বাটনসমূহ */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            <Button type="submit" size="sm" className="gap-1.5">
              <UserCheck className="size-3.5" />
              প্রোফাইল আপডেট
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="gap-1.5"
            >
              <RotateCcw className="size-3.5" />
              রিসেট
            </Button>
          </div>

          <Badge variant="outline" className="text-[11px] font-mono">
            {formData.role}
          </Badge>
        </div>
      </form>

      {/* লাইভ স্টেট প্রিভিউ */}
      <div className="rounded-lg border border-border/60 bg-muted/30 p-3 space-y-1.5">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          রিয়েল-টাইম ফর্ম অবজেক্ট স্টেট (Single Source of Truth)
        </span>
        <pre className="overflow-x-auto text-[11px] font-mono text-foreground">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>

      {/* সাবমিটেড কার্ড */}
      {submittedData && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold">
            <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
            ফর্ম ডেটা সফলভাবে সাবমিট হয়েছে:
          </div>
          <p className="text-muted-foreground pl-5">
            নাম: <strong>{submittedData.fullName}</strong> | ইমেইল: <strong>{submittedData.email}</strong> | রোল: <strong>{submittedData.role}</strong> | সাবস্ক্রিপশন: <strong>{submittedData.newsletter ? "হ্যাঁ" : "না"}</strong>
          </p>
        </div>
      )}
    </div>
  )
}
