"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { ShieldCheck, ShieldAlert, Sparkles } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ২.৩ Conditional Rendering: Early Guard Return এবং Ternary Operator
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * ১. Early Guard Return: যদি কোনো নির্দিষ্ট শর্তে পুরো কম্পোনেন্ট রেন্ডার করার
 *    প্রয়োজন না থাকে (যেমন লগইন না থাকা বা এরর অবস্থা), তবে ফাংশনের শুরুতেই `return`
 *    করে ফেলা হয়। এটি নেস্টেড if-else এর জটিলতা কমায়।
 * ২. Ternary Operator: JSX-এর কার্লি ব্রেসেসে বাইনারি শর্ত (True / False) অনুযায়ী
 *    দুটি ভিন্ন UI-এর যেকোনো একটি দেখাতে `condition ? <A /> : <B />` ব্যবহৃত হয়।
 * ─────────────────────────────────────────────────────────────────────────────
 */

type AuthState = "authenticated" | "guest"

interface UserProfile {
  readonly name: string
  readonly role: "Pro Member" | "Free Tier"
  readonly isEmailVerified: boolean
}

export default function GuardReturnsAndTernary() {
  const [authState, setAuthState] = React.useState<AuthState>("authenticated")
  const [isPro, setIsPro] = React.useState<boolean>(true)

  // ১. Early Guard Return প্যাটার্ন: যদি গেস্ট মোডে থাকে তবে আগেই রিটার্ন করবে
  if (authState === "guest") {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-destructive font-semibold text-sm">
          <ShieldAlert className="size-4" />
          <span>অ্যাক্সেস সংরক্ষিত: আপনি গেস্ট মোডে আছেন</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          এখানে Early Return ব্যবহারের কারণে নিচের পুরো ইউজার ড্যাশবোর্ডের JSX
          রেন্ডার না হয়ে কেবল এই গার্ড নোটিশটি প্রদর্শিত হচ্ছে।
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setAuthState("authenticated")}
        >
          লগইন করুন (Guard বাইপাস)
        </Button>
      </div>
    )
  }

  const currentUser: UserProfile = {
    name: "সাকিব হাসান",
    role: isPro ? "Pro Member" : "Free Tier",
    isEmailVerified: true,
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div className="space-y-0.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            ইউজার প্রোফাইল ও সাবস্ক্রিপশন কার্ড
          </span>
          <p className="text-xs text-muted-foreground">
            Ternary অপারেটর দিয়ে Pro বনাম Free UI টগল এবং Guard স্টেট টেস্ট করো
          </p>
        </div>
        <Button
          size="xs"
          variant="ghost"
          onClick={() => setAuthState("guest")}
          className="text-xs text-destructive hover:bg-destructive/10"
        >
          লগআউট (Guard পরীক্ষা)
        </Button>
      </div>

      <div className="rounded-lg bg-muted/30 p-4 border border-border/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-foreground">
              {currentUser.name}
            </span>
            {/* Ternary প্যাটার্ন ১: ভেরিফিকেশন ব্যাজ */}
            {currentUser.isEmailVerified ? (
              <Badge variant="outline" className="text-[11px] gap-1 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                <ShieldCheck className="size-3" />
                Verified
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-[11px]">
                Unverified
              </Badge>
            )}
          </div>

          {/* Ternary প্যাটার্ন ২: মেম্বারশিপ ট্যাগ */}
          {isPro ? (
            <Badge variant="default" className="text-xs gap-1">
              <Sparkles className="size-3" />
              {currentUser.role}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              {currentUser.role}
            </Badge>
          )}
        </div>

        {/* Ternary প্যাটার্ন ৩: প্রমোশনাল ব্যানার */}
        <div className="text-xs leading-relaxed">
          {isPro ? (
            <div className="rounded-md bg-primary/10 p-3 text-primary border border-primary/20">
              🌟 <strong>Pro সুবিধা সক্রিয়:</strong> আপনি সমস্ত প্রিমিয়াম কোর্স ও সোর্স কোড অ্যাক্সেস করতে পারবেন।
            </div>
          ) : (
            <div className="rounded-md bg-muted/60 p-3 text-muted-foreground border border-border/50">
              🔒 <strong>Free Plan:</strong> আপনি কেবল বেসিক মডিউলগুলো দেখছেন। সম্পূর্ণ অ্যাক্সেসের জন্য আপগ্রেড করুন।
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant={isPro ? "outline" : "default"}
          onClick={() => setIsPro(!isPro)}
        >
          {isPro ? "Free Plan-এ ডাউনগ্রেড করুন" : "Pro Plan-এ আপগ্রেড করুন"}
        </Button>
      </div>
    </div>
  )
}
