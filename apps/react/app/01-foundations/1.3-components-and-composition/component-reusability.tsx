import * as React from "react"
import { ShieldCheck, Sparkles, Zap } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ১.৩ Component Reusability: একই কম্পোনেন্ট একাধিকবার ব্যবহার
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * একবার একটি কম্পোনেন্ট তৈরি করে নিলে, অ্যাপ্লিকেশনের যেকোনো জায়গায় সেটি
 * বারবার স্বাধীনভাবে ব্যবহার করা যায়। কোড ডুপ্লিকেশন ছাড়া ক্লিন আর্কিটেকচার গড়ে তোলা এর মূল লক্ষ্য।
 */

/** পুনর্ব্যবহারযোগ্য একটি কার্ড কম্পোনেন্ট */
function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  readonly icon: React.ComponentType<{ className?: string }>
  readonly title: string
  readonly description: string
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
      <div className="w-fit rounded-lg bg-primary/10 p-2 text-primary">
        <Icon className="size-4" />
      </div>
      <h5 className="text-xs font-semibold text-foreground">{title}</h5>
      <p className="text-[11px] leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}

/**
 * মূল কম্পোনেন্ট: FeatureCard কে ৩ বার ভিন্ন ভিন্ন উপাত্ত দিয়ে রেন্ডার করছে
 */
export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <FeatureCard
        icon={Zap}
        title="উচ্চ কার্যক্ষমতা"
        description="কম্পোনেন্ট ভিত্তিক লাইটওয়েট ভার্চুয়াল ডম রেন্ডারিং।"
      />
      <FeatureCard
        icon={ShieldCheck}
        title="মডুলার আর্কিটেকচার"
        description="প্রতিটি কম্পোনেন্ট সম্পূর্ণ আইসোলেটেড ও সহজে টেস্টযোগ্য।"
      />
      <FeatureCard
        icon={Sparkles}
        title="পুনর্ব্যবহারযোগ্য (DRY)"
        description="একই কোড বারবার লেখার বদলে এক কম্পোনেন্ট বহুবার ব্যবহার।"
      />
    </div>
  )
}
