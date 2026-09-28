"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Power, Timer, MousePointer, ShieldCheck, AlertTriangle } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৩.২ useEffect Hook: Cleanup Function (Timer & Events)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * যখন কোনো ইফেক্টে টাইমার (`setInterval`) বা ইভেন্ট লিসেনার (`addEventListener`)
 * রেজিস্টার করা হয়, তখন কম্পোনেন্ট আনমাউন্ট হওয়ার আগে সেই রিসোর্সগুলোকে মুক্ত
 * করতে `useEffect`-এর রিটার্ন ফাংশন (Cleanup Function) ব্যবহার করতে হয়।
 * তা না হলে ব্যাকগ্রাউন্ডে মেমোরি লিক (Memory Leak) এবং অনাকাঙ্ক্ষিত বাগ ঘটবে।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `useEffect(() => { ... return () => cleanup(); }, [])`
 * ২. ক্লিন-আপ ফাংশন কম্পোনেন্ট আনমাউন্টের সময় রান করে।
 * ৩. ডিপেন্ডেন্সি পরিবর্তিত হয়ে নতুন ইফেক্ট রান করার ঠিক আগেও আগের ইফেক্টের ক্লিন-আপ রান করে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** চাইল্ড সাবস্ক্রিপশন কম্পোনেন্ট: যা মাউন্ট হলে টাইমার ও উইন্ডো লিসেনার চালু করে */
function LiveSubscriberWidget() {
  const [seconds, setSeconds] = React.useState(0)
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    // ১. টাইমার সেটআপ
    const timerId = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    // ২. গ্লোবাল উইন্ডো ইভেন্ট লিসেনার সেটআপ
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    // 🌟 ৩. অপরিহার্য ক্লিন-আপ ফাংশন
    return () => {
      clearInterval(timerId)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-4 text-xs">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-semibold text-primary">
          <ShieldCheck className="size-4" />
          সাবস্ক্রিপশন সক্রিয় (Active Listener)
        </span>
        <Badge variant="default" className="text-[10px]">
          Mounted
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="flex items-center gap-2 rounded-md border border-border bg-card p-2.5">
          <Timer className="size-4 text-amber-500" />
          <div>
            <div className="text-[11px] text-muted-foreground">সক্রিয় সময় (Seconds):</div>
            <div className="font-mono text-base font-bold text-foreground">
              {seconds}s
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-border bg-card p-2.5">
          <MousePointer className="size-4 text-blue-500" />
          <div>
            <div className="text-[11px] text-muted-foreground">মাউস পজিশন (Window):</div>
            <div className="font-mono text-xs font-semibold text-foreground">
              X: {mousePosition.x}, Y: {mousePosition.y}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CleanupTimerAndEvents() {
  const [isActive, setIsActive] = React.useState(true)

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <h4 className="text-xs font-semibold text-foreground">
            রিসোর্স ক্লিন-আপ লাইফসাইকেল
          </h4>
          <p className="text-[11px] text-muted-foreground">
            উইজেটটি বন্ধ করলে ক্লিন-আপ ফাংশন স্বয়ংক্রিয়ভাবে টাইমার ও লিসেনার বন্ধ করে দেবে।
          </p>
        </div>

        <Button
          variant={isActive ? "destructive" : "default"}
          size="sm"
          onClick={() => setIsActive((prev) => !prev)}
          className="gap-1.5 text-xs"
        >
          <Power className="size-3.5" />
          {isActive ? "কম্পোনেন্ট Unmount করুন" : "কম্পোনেন্ট Mount করুন"}
        </Button>
      </div>

      {/* কন্ডিশনাল মাউন্ট */}
      {isActive ? (
        <LiveSubscriberWidget />
      ) : (
        <div className="flex items-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 p-4 text-xs text-muted-foreground">
          <AlertTriangle className="size-4 text-amber-500" />
          <span>
            কম্পোনেন্ট আনমাউন্ট হয়েছে। <strong>clearInterval</strong> এবং{" "}
            <strong>removeEventListener</strong> কল হয়ে সমস্ত মেমোরি মুক্ত হয়েছে।
          </span>
        </div>
      )}
    </div>
  )
}
