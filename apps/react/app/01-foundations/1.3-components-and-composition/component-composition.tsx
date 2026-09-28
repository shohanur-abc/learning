import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Mail, UserPlus } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ১.৩ Component Composition: একাধিক ছোট কম্পোনেন্ট একত্রিত (Compose) করা
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * প্রতিটি ছোট কম্পোনেন্ট Single Responsibility Principle (একটি নির্দিষ্ট কাজ) মেনে চলে।
 * পরে একটি মূল প্যারেন্ট কম্পোনেন্ট এই ছোট ছোট ব্লকগুলোকে একসাথে জোড়া লাগিয়ে সম্পূর্ণ UI গঠন করে।
 */

/** ছোট কম্পোনেন্ট ১: ইউজারের অ্যাভাটার বা প্রোফাইল ছবি */
function UserAvatar() {
  return (
    <img
      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      alt="User Profile"
      className="size-14 rounded-full border-2 border-primary/20 object-cover"
    />
  )
}

/** ছোট কম্পোনেন্ট ২: ইউজারের নাম ও পদবির তথ্য */
function UserDetails() {
  return (
    <div className="space-y-0.5">
      <h4 className="text-sm font-semibold text-foreground">তানজিলা ইসলাম</h4>
      <p className="text-xs text-muted-foreground">Frontend Engineer • Dhaka</p>
    </div>
  )
}

/** ছোট কম্পোনেন্ট ৩: অ্যাকশন বাটনসমূহ */
function UserActions() {
  return (
    <div className="flex gap-2">
      <Button size="sm" variant="default" className="h-8 gap-1.5 text-xs">
        <UserPlus className="size-3.5" />
        <span>Follow</span>
      </Button>
      <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs">
        <Mail className="size-3.5" />
        <span>Message</span>
      </Button>
    </div>
  )
}

/**
 * মূল প্যারেন্ট কম্পোনেন্ট:
 * UserAvatar, UserDetails এবং UserActions - এই ৩টি ছোট কম্পোনেন্ট কম্পোজ করে তৈরি সম্পূর্ণ কার্ড।
 */
export default function UserProfileCard() {
  return (
    <div className="flex max-w-sm flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="flex items-center gap-4">
        <UserAvatar />
        <UserDetails />
      </div>
      <UserActions />
    </div>
  )
}
