"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Bell, AlertTriangle, CheckCircle2 } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ২.৩ Conditional Rendering: Short-Circuit (&&) এবং '০' (Zero) রেন্ডারিং ফাঁদ
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * ১. Short-Circuit (&&): বামপাশের শর্ত সত্য হলে ডানপাশের JSX রিটার্ন হয়।
 * ২. ০ (Zero) Trap: জাভাস্ক্রিপ্টে `0 && <Component />` এক্সপ্রেশনটি মূল্যায়ন করলে
 *    প্রথম ফলসি মান `0` সরাসরি রিটার্ন হয়।
 * ৩. React নিয়ম: React-এ `false`, `null`, `undefined` স্ক্রিনে কিছু প্রিন্ট করে না,
 *    কিন্তু সংখ্যা `0` একটি ভ্যালিড টেক্সট নোড হিসেবে DOM-এ আঁকা হয়ে যায়!
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function ShortCircuitAndZeroTrap() {
  const [unreadCount, setUnreadCount] = React.useState<number>(0)

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div className="space-y-0.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Short-Circuit ও Zero Trap ডেমো
          </span>
          <p className="text-xs text-muted-foreground">
            কাউন্টারের মান ০ হলে কীভাবে `&&` স্ক্রিনে ভুল '০' আঁকে তা পর্যবেক্ষণ করো
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="xs"
            variant="outline"
            onClick={() => setUnreadCount((prev) => Math.max(0, prev - 1))}
          >
            - ১ কমাও
          </Button>
          <span className="font-mono text-sm font-bold min-w-[2rem] text-center">
            {unreadCount}
          </span>
          <Button
            size="xs"
            variant="outline"
            onClick={() => setUnreadCount((prev) => prev + 1)}
          >
            + ১ বাড়াও
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* কলাম ১: ভুল পদ্ধতি (0 ফাঁদ প্রদর্শন) */}
        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-destructive flex items-center gap-1">
              <AlertTriangle className="size-3.5" />
              ভুল প্যাটার্ন: <code>&#123;count && &lt;Badge/&gt;&#125;</code>
            </span>
            <Badge variant="destructive" className="text-[10px]">
              ফাঁদ
            </Badge>
          </div>

          <div className="rounded-md bg-background p-3 border border-border text-xs min-h-[4rem] flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Bell className="size-4" /> নোটিফিকেশন বার:
            </span>

            {/* ❌ ফাঁদ: unreadCount ০ হলে এটি স্ক্রিনে '0' আঁকবে! */}
            <div className="font-mono text-destructive font-bold text-sm bg-destructive/10 px-2 py-0.5 rounded">
              {unreadCount && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount}টি নতুন মেসেজ
                </Badge>
              )}
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {unreadCount === 0 ? (
              <span className="text-destructive font-medium">
                ⚠️ লক্ষ্য করো: কাউন্ট ০ থাকা সত্ত্বেও স্ক্রিনে লাল রঙের <code>0</code> দেখা যাচ্ছে!
              </span>
            ) : (
              <span>কাউন্টার পজিটিভ থাকায় ব্যাজ দেখা যাচ্ছে।</span>
            )}
          </p>
        </div>

        {/* কলাম ২: সঠিক পদ্ধতি (বুলিয়ান তুলনা) */}
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="size-3.5" />
              সঠিক প্যাটার্ন: <code>&#123;count &gt; 0 && &lt;Badge/&gt;&#125;</code>
            </span>
            <Badge
              variant="outline"
              className="text-[10px] text-emerald-600 dark:text-emerald-400 border-emerald-500/40"
            >
              নিরাপদ
            </Badge>
          </div>

          <div className="rounded-md bg-background p-3 border border-border text-xs min-h-[4rem] flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Bell className="size-4" /> নোটিফিকেশন বার:
            </span>

            {/* ✅ নিরাপদ: count > 0 নিশ্চিত করায় ০ হলে false রিটার্ন হয় যা React রেন্ডার করে না */}
            <div>
              {unreadCount > 0 && (
                <Badge variant="default" className="text-xs">
                  {unreadCount}টি নতুন মেসেজ
                </Badge>
              )}
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {unreadCount === 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                ✅ কাউন্ট ০ থাকায় কোনো অনাকাঙ্ক্ষিত ০ প্রিন্ট হয়নি, স্ক্রিন সম্পূর্ণ পরিষ্কার!
              </span>
            ) : (
              <span>কাউন্টার পজিটিভ থাকায় ব্যাজ নির্ভুলভাবে প্রদর্শিত হচ্ছে।</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
