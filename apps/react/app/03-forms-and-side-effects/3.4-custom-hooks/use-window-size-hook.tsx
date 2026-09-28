"use client"

import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Smartphone, Tablet, Monitor, Maximize } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৩.৪ Custom Hooks: useWindowSize Hook
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * ব্রাউজারের উইন্ডো সাইজ পরিবর্তনের সাথে রেসপন্সিভ কম্পোনেন্ট রূপান্তর করার জন্য
 * `useWindowSize` হুকটি অত্যন্ত জনপ্রিয়। এটি মাউন্ট হওয়ার পর `resize` ইভেন্ট
 * লিসেনার যোগ করে এবং আনমাউন্টে তা পরিষ্কার করে দেয়, যা কম্পোনেন্ট লেভেলে
 * ক্লিন ও রিইউজেবল কোড উপহার দেয়।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. কাস্টম হুকের ভেতর `useState` এবং `useEffect` একসাথে ব্যবহার করা যায়।
 * ২. ব্রাউজারের যেকোনো গ্লোবাল ইভেন্টকে কাস্টম হুকের আবরণে আবদ্ধ করা যায়।
 * ৩. রেসপন্সিভ ব্রেকপয়েন্ট (Mobile / Tablet / Desktop) হুক থেকেই সরবরাহ করা যায়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface WindowDimensions {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export function useWindowSize(): WindowDimensions {
  const [windowSize, setWindowSize] = React.useState<WindowDimensions>({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  })

  React.useEffect(() => {
    // কেবল ব্রাউজার ক্লায়েন্ট পরিবেশে রান হবে
    function handleResize() {
      const width = window.innerWidth
      const height = window.innerHeight
      setWindowSize({
        width,
        height,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      })
    }

    // প্রাথমিক সাইজ নির্ধারণ
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}

export default function UseWindowSizeHook() {
  const { width, height, isMobile, isTablet, isDesktop } = useWindowSize()

  return (
    <div className="space-y-5 rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Maximize className="size-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">
            রেসপন্সিভ ভিউপোর্ট: useWindowSize()
          </span>
        </div>
        <Badge variant="outline" className="font-mono text-[11px]">
          {width}px × {height}px
        </Badge>
      </div>

      {/* ডিভাইস ক্যাটেগরি প্রদর্শন */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div
          className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
            isMobile
              ? "border-primary bg-primary/10 text-primary"
              : "border-border/60 bg-muted/20 text-muted-foreground"
          }`}
        >
          <Smartphone className="size-5 shrink-0" />
          <div>
            <div className="text-xs font-semibold">Mobile View</div>
            <div className="text-[10px]">&lt; 640px</div>
          </div>
          {isMobile && (
            <Badge variant="default" className="ml-auto text-[9px]">
              Active
            </Badge>
          )}
        </div>

        <div
          className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
            isTablet
              ? "border-primary bg-primary/10 text-primary"
              : "border-border/60 bg-muted/20 text-muted-foreground"
          }`}
        >
          <Tablet className="size-5 shrink-0" />
          <div>
            <div className="text-xs font-semibold">Tablet View</div>
            <div className="text-[10px]">640px – 1024px</div>
          </div>
          {isTablet && (
            <Badge variant="default" className="ml-auto text-[9px]">
              Active
            </Badge>
          )}
        </div>

        <div
          className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
            isDesktop
              ? "border-primary bg-primary/10 text-primary"
              : "border-border/60 bg-muted/20 text-muted-foreground"
          }`}
        >
          <Monitor className="size-5 shrink-0" />
          <div>
            <div className="text-xs font-semibold">Desktop View</div>
            <div className="text-[10px]">&ge; 1024px</div>
          </div>
          {isDesktop && (
            <Badge variant="default" className="ml-auto text-[9px]">
              Active
            </Badge>
          )}
        </div>
      </div>

      {/* রিয়েল-টাইম ব্রেকপয়েন্ট ডায়াগ্রাম */}
      <div className="rounded-lg border border-border/70 bg-muted/30 p-3 space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>লাইভ ভিউপোর্ট প্রস্থ স্কেল:</span>
          <span className="font-mono font-bold text-foreground">{width}px</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all duration-150"
            style={{ width: `${Math.min(100, Math.max(15, (width / 1920) * 100))}%` }}
          />
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground">
        ব্রাউজার উইন্ডোটি ছোট-বড় (Resize) করে দেখুন; কাস্টম হুকটি তাৎক্ষণিকভাবে
        রি-রেন্ডার করে নতুন মাত্রা প্রদর্শন করবে।
      </p>
    </div>
  )
}
