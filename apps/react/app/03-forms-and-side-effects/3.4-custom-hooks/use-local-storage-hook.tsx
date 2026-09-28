"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Badge } from "@workspace/ui/components/badge"
import { HardDrive, RotateCcw, CheckCircle2 } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৩.৪ Custom Hooks: useLocalStorage Hook
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * ব্রাউজারের `localStorage`-এ ডেটা পারসিস্ট (Persistent) করার জন্য বারবার
 * `JSON.parse` এবং `JSON.stringify` লেখার প্রয়োজন নেই। `useLocalStorage`
 * একটি универсальный SSR-নিরাপদ কাস্টম হুক যা React স্টেট পরিবর্তন হওয়ার সাথে
 * সাথে স্বয়ংক্রিয়ভাবে ব্রাউজারের স্টোরেজে সিঙ্ক করে দেয়।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. SSR পরিবেশে `window` অবজেক্ট থাকে না, তাই `typeof window !== 'undefined'` চেক আবশ্যক।
 * ২. ইনিশিয়াল ভ্যালু রিড করার জন্য lazy state initialization `useState(() => ...)` ব্যবহার করতে হয়।
 * ৩. স্টোরেজে লেখার সময় `try...catch` ব্লক দিয়ে কোটা এক্সিড বা প্রাইভেট ব্রাউজিং এরর হ্যান্ডল করা হয়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export function useLocalStorage<T>(key: string, initialValue: T) {
  // SSR-Safe Lazy State Initialization
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  // ভ্যালু আপডেট ও স্টোরেজ সিঙ্ক্রোনাইজেশন
  const setValue = React.useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((current) => {
          const valueToStore = value instanceof Function ? value(current) : value
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
          }
          return valueToStore
        })
      } catch (error) {
        // console.error("LocalStorage write error:", error)
      }
    },
    [key]
  )

  const removeValue = React.useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key)
      }
      setStoredValue(initialValue)
    } catch {
      // ignore
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue] as const
}

export default function UseLocalStorageHook() {
  const [username, setUsername, resetUsername] = useLocalStorage<string>(
    "react_curriculum_user",
    "shakib_react_dev"
  )
  const [activeTab, setActiveTab] = useLocalStorage<string>(
    "react_curriculum_tab",
    "Hooks"
  )

  return (
    <div className="space-y-5 rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <HardDrive className="size-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">
            পারসিস্টেন্ট স্টেট: useLocalStorage()
          </span>
        </div>
        <Badge variant="outline" className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
          SSR-Safe Storage Sync
        </Badge>
      </div>

      {/* ইউজারনেম ফিল্ড */}
      <div className="space-y-2">
        <Label htmlFor="local-username" className="text-xs font-medium">
          ইউজারনেম (রিলোড দিলেও মেমোরিতে সংরক্ষিত থাকবে):
        </Label>
        <div className="flex gap-2">
          <Input
            id="local-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ইউজারনেম দিন..."
            className="text-xs"
          />
          <Button
            size="sm"
            variant="outline"
            onClick={resetUsername}
            className="text-xs shrink-0 gap-1.5"
          >
            <RotateCcw className="size-3.5" />
            রিসেট
          </Button>
        </div>
      </div>

      {/* প্রেফারেন্স চয়েস বাটনসমূহ */}
      <div className="space-y-1.5 pt-1">
        <span className="text-xs font-medium text-foreground">
          পছন্দের মডিউল সিলেক্টর (ট্যাব পারসিস্টেন্স):
        </span>
        <div className="flex flex-wrap gap-2">
          {["Components", "Hooks", "Architecture", "Performance"].map((tab) => (
            <Button
              key={tab}
              size="sm"
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className="text-xs"
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {/* ব্রাউজার স্টোরেজ প্রিভিউ */}
      <div className="rounded-lg border border-border/70 bg-muted/20 p-3 text-xs space-y-1.5">
        <div className="flex items-center gap-1.5 font-medium text-muted-foreground uppercase text-[11px] tracking-wider">
          <CheckCircle2 className="size-3.5 text-emerald-500" />
          রিয়েল-টাইম লোকাল স্টোরেজ রেকর্ড:
        </div>
        <div className="font-mono text-[11px] text-foreground bg-card p-2 rounded border border-border/50 space-y-0.5">
          <div>localStorage[&quot;react_curriculum_user&quot;] = &quot;{username}&quot;</div>
          <div>localStorage[&quot;react_curriculum_tab&quot;] = &quot;{activeTab}&quot;</div>
        </div>
      </div>
    </div>
  )
}
