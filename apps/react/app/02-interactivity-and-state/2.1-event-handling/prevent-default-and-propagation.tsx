"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Badge } from "@workspace/ui/components/badge"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ২.১ Event Handling: preventDefault() এবং stopPropagation()
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * ১. `e.preventDefault()`: ব্রাউজারের ডিফল্ট আচরণ (যেমন ফর্ম সাবমিট হলে পেজ রিলোড
 *    হওয়া বা অ্যাঙ্কর লিঙ্কে ক্লিক করলে নতুন URL-এ যাওয়া) আটকে দেয়।
 * ২. `e.stopPropagation()`: DOM ইভেন্ট বাবলিং (Bubbling) আটকে দেয়, অর্থাৎ চাইল্ডে ঘটা
 *    ইভেন্ট যাতে ওপরের প্যারেন্ট এলিমেন্টগুলোতে ছড়িয়ে না পড়ে তা নিশ্চিত করে।
 *
 * 🌟 KEY TAKEAWAYS:
 * - React-এ ফর্ম সাবমিশন SPA আর্কিটেকচারে ধরে রাখতে `e.preventDefault()` বাধ্যতামূলক।
 * - নেস্টেড ইন্টারেক্টিভ এলিমেন্ট (যেমন কার্ডের ভেতর বাটন) থাকলে বাবলিং রুখতে
 *   `e.stopPropagation()` অপরিহার্য।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function PreventDefaultAndPropagation() {
  // ১. preventDefault স্টেট
  const [submittedQuery, setSubmittedQuery] = React.useState<string>("")
  const [inputValue, setInputValue] = React.useState<string>("")

  // ২. stopPropagation লগ স্টেট
  const [bubbleLogs, setBubbleLogs] = React.useState<readonly string[]>([])

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    // 🛑 ব্রাউজারের নেটিভ রিলোড বন্ধ করা
    e.preventDefault()

    if (!inputValue.trim()) return
    setSubmittedQuery(inputValue.trim())
    setInputValue("")
  }

  function handleParentCardClick() {
    setBubbleLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] 🏢 Parent Container Handler কার্যকর হয়েছে (ইভেন্ট বাবল হয়েছে!)`,
      ...prev.slice(0, 4),
    ])
  }

  function handleChildWithoutStop(e: React.MouseEvent) {
    // এখানে stopPropagation নেই, তাই প্যারেন্ট হ্যান্ডলারও ট্রিগার হবে
    setBubbleLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] 🔘 Child Button (সাধারণ ক্লিক) হ্যান্ডলার কার্যকর`,
      ...prev.slice(0, 4),
    ])
  }

  function handleChildWithStop(e: React.MouseEvent) {
    // 🛑 ইভেন্ট বাবলিং বন্ধ করা
    e.stopPropagation()

    setBubbleLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] 🛡️ Child Button (stopPropagation) কার্যকর! প্যারেন্টে কোনো সিগন্যাল যায়নি`,
      ...prev.slice(0, 4),
    ])
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-6 shadow-xs">
      {/* ডেমো ১: e.preventDefault() ফর্ম সাবমিট */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="text-xs font-semibold text-foreground">
            ১. e.preventDefault() (পেজ রিলোড বন্ধ করা):
          </span>
          <Badge variant="outline" className="text-xs">
            Form Submit
          </Badge>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="কীওয়ার্ড লিখে Enter চাপো..."
            className="text-xs"
          />
          <Button type="submit" size="sm">
            সার্চ
          </Button>
        </form>

        {submittedQuery && (
          <div className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-md border border-border/50">
            ✅ সফলভাবে সাবমিট হয়েছে:{" "}
            <span className="font-semibold text-foreground">
              "{submittedQuery}"
            </span>{" "}
            (পেজ কোনো রিলোড ছাড়াই স্টেটে ডেটা সেভ করেছে)
          </div>
        )}
      </div>

      {/* ডেমো ২: e.stopPropagation() বাবলিং ট্র্যাকার */}
      <div className="space-y-3 pt-2 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            ২. e.stopPropagation() (ইভেন্ট বাবলিং প্রিভেনশন):
          </span>
          <Button
            size="xs"
            variant="ghost"
            onClick={() => setBubbleLogs([])}
          >
            লগ ক্লিয়ার
          </Button>
        </div>

        {/* প্যারেন্ট কন্টেইনার (onClick সংযুক্ত) */}
        <div
          onClick={handleParentCardClick}
          className="cursor-pointer rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 p-4 transition-colors hover:bg-primary/10 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary">
              🏢 প্যারেন্ট কার্ড কন্টেইনার (এখানে ক্লিক করলে বাবলিং বোঝা যাবে)
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* বাটন ক: stopPropagation ছাড়া */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleChildWithoutStop}
            >
              ⚠️ বাটন (stopPropagation ছাড়া)
            </Button>

            {/* বাটন খ: stopPropagation সহ */}
            <Button
              variant="default"
              size="sm"
              onClick={handleChildWithStop}
            >
              🛡️ বাটন (stopPropagation সহ)
            </Button>
          </div>
        </div>

        {/* বাবলিং এক্সিকিউশন লগ */}
        <div className="space-y-1.5 bg-muted/60 p-3 rounded-lg border border-border/60">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
            ইভেন্ট এক্সিকিউশন লগ (Bubble Order):
          </span>
          {bubbleLogs.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">
              উপরের প্যারেন্ট কার্ড বা যেকোনো বাটনে ক্লিক করে বাবলিং পরীক্ষা করো...
            </p>
          ) : (
            bubbleLogs.map((log, index) => (
              <div
                key={index}
                className="text-xs font-mono text-foreground leading-relaxed"
              >
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
