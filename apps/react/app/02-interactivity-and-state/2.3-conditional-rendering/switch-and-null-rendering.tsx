"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import {
  Package,
  ChefHat,
  Truck,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
} from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ২.৩ Conditional Rendering: Record/Switch ম্যাপিং এবং Null Rendering
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * ১. Null Rendering: React-এ কোনো কম্পোনেন্ট বা JSX এক্সপ্রেশন থেকে `null` রিটার্ন
 *    করলে স্ক্রিনে কিছুই রেন্ডার হয় না (DOM নোড তৈরি হয় না)। এটি কোনো অংশ সাময়িকভাবে
 *    লুকিয়ে ফেলার আদর্শ উপায়।
 * ২. Multi-state Mapping: দুইয়ের বেশি স্টেট থাকলে নেস্টেড টারনারি (`a ? x : b ? y : z`)
 *    কোড নোংরা করে ফেলে। সেক্ষেত্রে Record অবজেক্ট ম্যাপিং বা Switch স্টেটমেন্ট সবচেয়ে
 *    পরিচ্ছন্ন ও পাঠযোগ্য।
 * ─────────────────────────────────────────────────────────────────────────────
 */

type OrderStatus =
  | "order_placed"
  | "preparing"
  | "on_the_way"
  | "delivered"
  | "cancelled"

interface StatusConfig {
  readonly label: string
  readonly description: string
  readonly badgeVariant: "default" | "secondary" | "outline" | "destructive"
  readonly icon: React.ReactNode
}

// মাল্টিপল স্টেট হ্যান্ডলিংয়ের জন্য অবজেক্ট ডিকশনারি ম্যাপিং
const STATUS_CONFIGS: Record<OrderStatus, StatusConfig> = {
  order_placed: {
    label: "অর্ডার গৃহীত হয়েছে",
    description: "আপনার অর্ডারটি সিস্টেমে নথিভুক্ত হয়েছে।",
    badgeVariant: "secondary",
    icon: <Package className="size-4 text-muted-foreground" />,
  },
  preparing: {
    label: "প্রস্তুতি চলছে",
    description: "শেফ আপনার খাবার তৈরি করছেন।",
    badgeVariant: "outline",
    icon: <ChefHat className="size-4 text-amber-500" />,
  },
  on_the_way: {
    label: "রাইডার পথে রয়েছে",
    description: "ডেলিভারি পার্টনার আপনার ঠিকানার দিকে রওনা হয়েছেন।",
    badgeVariant: "default",
    icon: <Truck className="size-4 text-primary" />,
  },
  delivered: {
    label: "ডেলিভারি সম্পন্ন",
    description: "প্যাকেটটি সফলভাবে বুঝিয়ে দেওয়া হয়েছে। ধন্যবাদ!",
    badgeVariant: "outline",
    icon: <CheckCircle className="size-4 text-emerald-500" />,
  },
  cancelled: {
    label: "অর্ডার বাতিল",
    description: "অনুরোধক্রমে অর্ডারটি বাতিল করা হয়েছে।",
    badgeVariant: "destructive",
    icon: <XCircle className="size-4 text-destructive" />,
  },
}

export default function SwitchAndNullRendering() {
  const [currentStatus, setCurrentStatus] =
    React.useState<OrderStatus>("order_placed")
  const [showMetadata, setShowMetadata] = React.useState<boolean>(false)

  const activeConfig = STATUS_CONFIGS[currentStatus]

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div className="space-y-0.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            মাল্টি-স্টেট ট্র্যাকার ও Null Rendering
          </span>
          <p className="text-xs text-muted-foreground">
            অবজেক্ট ডিকশনারি দিয়ে স্টেট স্যুইচ করো এবং মেটাডেটা প্যানেল টগল করো
          </p>
        </div>
        <Button
          size="xs"
          variant="outline"
          onClick={() => setShowMetadata(!showMetadata)}
          className="text-xs gap-1.5"
        >
          {showMetadata ? (
            <>
              <EyeOff className="size-3" /> মেটাডেটা লুকাও (null)
            </>
          ) : (
            <>
              <Eye className="size-3" /> মেটাডেটা দেখো
            </>
          )}
        </Button>
      </div>

      {/* মাল্টি-স্টেট ডিসপ্লে কার্ড */}
      <div className="rounded-lg bg-muted/40 p-4 border border-border/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {activeConfig.icon}
            <span className="font-semibold text-sm text-foreground">
              {activeConfig.label}
            </span>
          </div>
          <Badge variant={activeConfig.badgeVariant} className="text-xs">
            {currentStatus}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {activeConfig.description}
        </p>
      </div>

      {/* স্টেট সিলেকশন বাটন বার */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-foreground">
          স্টেট পরিবর্তন করুন:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              "order_placed",
              "preparing",
              "on_the_way",
              "delivered",
              "cancelled",
            ] as const
          ).map((status) => (
            <Button
              key={status}
              size="xs"
              variant={currentStatus === status ? "default" : "outline"}
              onClick={() => setCurrentStatus(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Null Rendering ডেমো: showMetadata false হলে null রিটার্ন করায় কিছুই আঁকা হবে না */}
      <div className="pt-2 border-t border-border">
        {!showMetadata ? null : (
          <div className="rounded-lg bg-background p-3 border border-border text-xs space-y-1 animate-in fade-in duration-200">
            <span className="font-semibold text-primary block">
              🔍 ইন্টারনাল ডিবাগ মেটাডেটা (Null Rendering Demo):
            </span>
            <div className="font-mono text-muted-foreground text-[11px]">
              Active Key: {currentStatus} | Badge: {activeConfig.badgeVariant} | Mounted: Yes
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
