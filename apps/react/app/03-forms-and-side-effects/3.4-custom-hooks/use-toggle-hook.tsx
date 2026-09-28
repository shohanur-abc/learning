"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Eye, EyeOff, ToggleLeft, ToggleRight, Check, X } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৩.৪ Custom Hooks: useToggle Hook
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * বারবার বুলিয়ান স্টেট এবং হ্যান্ডলার (`setValue(!value)`) লেখার পরিবর্তে
 * সাধারণ লজিককে একটি পুনঃব্যবহারযোগ্য ফাংশনে রূপান্তর করা যায়।
 * কাস্টম হুকের নাম অবশ্যই ছোট হাতের `use` দিয়ে শুরু হতে হবে।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. কাস্টম হুক অন্যান্য রিঅ্যাক্ট হুক (`useState`, `useEffect`) কল করতে পারে।
 * ২. কাস্টম হুক কোনো স্টেট শেয়ার করে না; এটি কেবল স্টেটফুল লজিক শেয়ার করে।
 * ৩. প্রতিটি কম্পোনেন্ট কল তার নিজস্ব স্বাধীন স্টেট ইনস্ট্যান্স পায়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * বুলিয়ান টগল লজিকের জন্য পুনঃব্যবহারযোগ্য কাস্টম হুক
 */
export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = React.useState<boolean>(initialValue)

  const toggle = React.useCallback(() => {
    setValue((prev) => !prev)
  }, [])

  const setTrue = React.useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = React.useCallback(() => {
    setValue(false)
  }, [])

  return [value, toggle, setTrue, setFalse] as const
}

/**
 * শোকেস কম্পোনেন্ট: useToggle হুক ব্যবহার করে পাসওয়ার্ড ভিজিবিলিটি এবং মোডাল প্যানেল নিয়ন্ত্রণ
 */
export default function UseToggleHook() {
  const [isSecretVisible, toggleSecret] = useToggle(false)
  const [isPanelOpen, togglePanel, openPanel, closePanel] = useToggle(true)

  return (
    <div className="space-y-5 rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="text-xs font-semibold text-foreground">
          কাস্টম হুক ডেমো: useToggle()
        </span>
        <Badge variant="outline" className="font-mono text-[11px]">
          [value, toggle, setTrue, setFalse]
        </Badge>
      </div>

      {/* ব্যবহার ক্ষেত্র ১: পাসওয়ার্ড বা সিক্রেট টগল */}
      <div className="space-y-2 rounded-lg border border-border/60 bg-muted/20 p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">
            কেস ১: পাসওয়ার্ড বা সংবেদনশীল টোকেন প্রদর্শন
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleSecret}
            className="h-7 gap-1.5 text-xs"
          >
            {isSecretVisible ? (
              <>
                <EyeOff className="size-3.5 text-muted-foreground" />
                গোপন করুন
              </>
            ) : (
              <>
                <Eye className="size-3.5 text-primary" />
                দেখুন
              </>
            )}
          </Button>
        </div>

        <div className="flex items-center gap-2 rounded bg-card p-2 border border-border text-xs font-mono">
          <span className="text-muted-foreground">API Token:</span>
          <span className="text-foreground font-semibold">
            {isSecretVisible ? "sk_live_948293482394820394" : "••••••••••••••••••••••••"}
          </span>
        </div>
      </div>

      {/* ব্যবহার ক্ষেত্র ২: ড্রয়ার বা প্যানেল কন্ট্রোল */}
      <div className="space-y-3 rounded-lg border border-border/60 bg-muted/20 p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">
            কেস ২: নোটিফিকেশন প্যানেল এক্সপ্যানশন
          </span>
          <Badge variant={isPanelOpen ? "default" : "secondary"} className="text-[10px]">
            {isPanelOpen ? "উন্মুক্ত (Open)" : "বন্ধ (Closed)"}
          </Badge>
        </div>

        {/* এক্সপ্লিট কন্ট্রোল বাটনসমূহ */}
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={togglePanel}
            className="text-xs gap-1.5"
          >
            {isPanelOpen ? <ToggleRight className="size-3.5 text-primary" /> : <ToggleLeft className="size-3.5" />}
            Toggle()
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={openPanel}
            disabled={isPanelOpen}
            className="text-xs gap-1.5"
          >
            <Check className="size-3 text-emerald-500" />
            SetTrue()
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={closePanel}
            disabled={!isPanelOpen}
            className="text-xs gap-1.5"
          >
            <X className="size-3 text-destructive" />
            SetFalse()
          </Button>
        </div>

        {/* ড্রয়ার বডি */}
        {isPanelOpen && (
          <div className="rounded-md border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-foreground space-y-1">
            <p className="font-semibold text-emerald-700 dark:text-emerald-400">
              🎉 নোটিফিকেশন মেসেজ:
            </p>
            <p className="text-muted-foreground text-[11px]">
              আপনার রিঅ্যাক্ট কাস্টম হুক সফলভাবে স্টেট হ্যান্ডল করছে। কোনো বাড়তি বয়লারপ্লেট ছাড়াই একই হুক একাধিক জায়গায় ব্যবহার করা যাচ্ছে।
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
