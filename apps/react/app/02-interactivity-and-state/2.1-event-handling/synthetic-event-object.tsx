"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Badge } from "@workspace/ui/components/badge"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ২.১ Event Handling: SyntheticEvent অবজেক্টের বৈশিষ্ট্য ও ব্যবহার
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * React সরাসরি ব্রাউজারের নেটিভ DOM ইভেন্ট হ্যান্ডলারে পাঠায় না। বরং সমস্ত ব্রাউজারের
 * অসঙ্গতি দূর করতে নেটিভ ইভেন্টকে একটি ক্রস-ব্রাউজার র‍্যাপার `SyntheticEvent`-এ
 * মুড়িয়ে পাঠায়। W3C স্পেসিফিকেশন মেনে এটি তৈরি, তাই Chrome, Safari বা Firefox-এ
 * ইভেন্ট অবজেক্ট অভিন্ন আচরণ করে।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `e.target` হলো যে এলিমেন্টে ইভেন্টটি উৎপন্ন হয়েছে (যেমন ইনপুট বা ভেতরের আইকন)।
 * ২. `e.currentTarget` হলো যে এলিমেন্টে ইভেন্ট হ্যান্ডলারটি সংযুক্ত রয়েছে।
 * ৩. TypeScript-এ সঠিক জেনেরিক টাইপ (যেমন `React.MouseEvent<HTMLButtonElement>`)
 *    ব্যবহার করলে অটো-কমপ্লিশন ও টাইপ সেফটি পাওয়া যায়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface MouseEventDetails {
  readonly type: string
  readonly clientX: number
  readonly clientY: number
  readonly targetTagName: string
  readonly currentTargetTagName: string
}

interface KeyboardEventDetails {
  readonly key: string
  readonly code: string
  readonly shiftKey: boolean
  readonly altKey: boolean
}

export default function SyntheticEventObject() {
  const [mouseDetails, setMouseDetails] = React.useState<MouseEventDetails | null>(
    null
  )
  const [keyDetails, setKeyDetails] = React.useState<KeyboardEventDetails | null>(
    null
  )

  // MouseEvent হ্যান্ডলার: React.MouseEvent জেনেরিক টাইপ ব্যবহার করছে
  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    setMouseDetails({
      type: e.type,
      clientX: Math.round(e.clientX),
      clientY: Math.round(e.clientY),
      targetTagName: (e.target as HTMLElement).tagName,
      currentTargetTagName: e.currentTarget.tagName,
    })
  }

  // KeyboardEvent হ্যান্ডলার: React.KeyboardEvent টাইপ ব্যবহার করছে
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    setKeyDetails({
      key: e.key,
      code: e.code,
      shiftKey: e.shiftKey,
      altKey: e.altKey,
    })
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      <div className="border-b border-border pb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          SyntheticEvent Inspector
        </span>
        <p className="text-xs text-muted-foreground mt-0.5">
          বাটনে ক্লিক বা ইনপুটে টাইপ করে ইভেন্ট অবজেক্টের রিয়েল-টাইম মেটাডেটা দেখো
        </p>
      </div>

      {/* ১. মাউস ইভেন্ট বিশ্লেষণ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            ১. MouseEvent (ক্লিক স্থানাঙ্ক ও টার্গেট নোড):
          </span>
          <Badge variant="outline" className="text-xs">
            React.MouseEvent
          </Badge>
        </div>

        <Button variant="default" size="sm" onClick={handleButtonClick}>
          🎯 মাউস ক্লিক দিয়ে ইভেন্ট অবজেক্ট ক্যাপচার করো
        </Button>

        {mouseDetails && (
          <div className="grid grid-cols-2 gap-2 text-xs bg-muted/50 p-3 rounded-lg border border-border/60">
            <div>
              <span className="text-muted-foreground">ইভেন্ট টাইপ:</span>{" "}
              <code className="text-primary font-semibold">{mouseDetails.type}</code>
            </div>
            <div>
              <span className="text-muted-foreground">ক্লিক স্থানাঙ্ক (X, Y):</span>{" "}
              <code className="font-mono font-medium">
                ({mouseDetails.clientX}, {mouseDetails.clientY})
              </code>
            </div>
            <div>
              <span className="text-muted-foreground">e.target:</span>{" "}
              <code className="font-mono">&lt;{mouseDetails.targetTagName}&gt;</code>
            </div>
            <div>
              <span className="text-muted-foreground">e.currentTarget:</span>{" "}
              <code className="font-mono">&lt;{mouseDetails.currentTargetTagName}&gt;</code>
            </div>
          </div>
        )}
      </div>

      {/* ২. কীবোর্ড ইভেন্ট বিশ্লেষণ */}
      <div className="space-y-3 pt-2 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            ২. KeyboardEvent (কী কোড ও মোডিফায়ার ট্র্যাকিং):
          </span>
          <Badge variant="outline" className="text-xs">
            React.KeyboardEvent
          </Badge>
        </div>

        <Input
          placeholder="এখানে কিছু টাইপ করো (যেমন: Enter, Shift, Backspace)..."
          onKeyDown={handleKeyDown}
          className="text-xs"
        />

        {keyDetails && (
          <div className="grid grid-cols-2 gap-2 text-xs bg-muted/50 p-3 rounded-lg border border-border/60">
            <div>
              <span className="text-muted-foreground">e.key:</span>{" "}
              <code className="text-primary font-mono font-bold">
                {keyDetails.key === " " ? "Space" : keyDetails.key}
              </code>
            </div>
            <div>
              <span className="text-muted-foreground">e.code:</span>{" "}
              <code className="font-mono">{keyDetails.code}</code>
            </div>
            <div>
              <span className="text-muted-foreground">Shift বাটন চাপানো?:</span>{" "}
              <span className={keyDetails.shiftKey ? "text-emerald-500 font-semibold" : ""}>
                {keyDetails.shiftKey ? "হ্যাঁ (True)" : "না (False)"}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Alt বাটন চাপানো?:</span>{" "}
              <span className={keyDetails.altKey ? "text-emerald-500 font-semibold" : ""}>
                {keyDetails.altKey ? "হ্যাঁ (True)" : "না (False)"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
