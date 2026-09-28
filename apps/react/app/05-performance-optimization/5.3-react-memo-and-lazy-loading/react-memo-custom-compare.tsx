"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { RenderPulse } from "@workspace/ui/components/custom/learning-components"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৫.৩ React.memo with Custom arePropsEqual Comparison
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * ডিফল্টভাবে `React.memo` শ্যালো তুলনা (shallow equality) করে। প্রপস যদি নেস্টেড অবজেক্ট
 * ধারণ করে এবং প্যারেন্ট প্রতি রেন্ডারে নতুন অবজেক্ট রেফারেন্স তৈরি করে, তবে ডিফল্ট মেমো
 * ভেঙে যায়।
 * `React.memo(Component, arePropsEqual)` এর মাধ্যমে আমরা কাস্টম লজিক দিয়ে বলে দিতে পারি
 * কোন কোন ফিল্ডের পরিবর্তন হলে রি-রেন্ডার হবে আর কোনটিতে স্কিপ হবে।
 *
 * ⚠️ সতর্কতা: `arePropsEqual` সত্য (true) রিটার্ন করলে রেন্ডার স্কিপ হয়,
 * এবং মিথ্যা (false) রিটার্ন করলে রি-রেন্ডার হয়!
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface ProjectData {
  readonly id: number
  readonly title: string
  readonly meta: {
    readonly lastPing: string
  }
}

interface ProjectCardProps {
  readonly project: ProjectData
}

/**
 * ১. ডিফল্ট শ্যালো মেমো (নতুন অবজেক্ট তৈরি হলেই রেন্ডার হবে)
 */
const DefaultShallowCard = React.memo(function DefaultCard({
  project,
}: ProjectCardProps) {
  return (
    <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
          ডিফল্ট শ্যালো মেমো (Shallow)
        </span>
        <RenderPulse label="রেন্ডার সংখ্যা" />
      </div>
      <div className="text-xs font-medium text-foreground">
        প্রজেক্ট: {project.title} (ID: #{project.id})
      </div>
      <div className="text-[11px] text-muted-foreground font-mono">
        পিং টাইম: {project.meta.lastPing}
      </div>
      <p className="text-[11px] text-muted-foreground">
        অবজেক্ট রেফারেন্স বদলালেই (Shallow Mismatch) এটি রি-রেন্ডার হয়।
      </p>
    </div>
  )
})

/**
 * ২. কাস্টম arePropsEqual ফাংশন দিয়ে অপ্টিমাইজড মেমো
 */
function areProjectsEqual(
  prevProps: ProjectCardProps,
  nextProps: ProjectCardProps
): boolean {
  // শুধুমাত্র আইডি এবং শিরোনাম পরিবর্তিত হলে রি-রেন্ডার হবে, পিং টাইমস্ট্যাম্পে স্কিপ হবে
  return (
    prevProps.project.id === nextProps.project.id &&
    prevProps.project.title === nextProps.project.title
  )
}

const CustomCompareCard = React.memo(function CustomCard({
  project,
}: ProjectCardProps) {
  return (
    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          কাস্টম arePropsEqual মেমো (Smart)
        </span>
        <RenderPulse label="রেন্ডার সংখ্যা" />
      </div>
      <div className="text-xs font-medium text-foreground">
        প্রজেক্ট: {project.title} (ID: #{project.id})
      </div>
      <div className="text-[11px] text-muted-foreground font-mono">
        পিং টাইম: {project.meta.lastPing}
      </div>
      <p className="text-[11px] text-muted-foreground">
        নতুন অবজেক্ট তৈরি হলেও আইডি ও নাম এক থাকায় রেন্ডার স্কিপ হয়েছে!
      </p>
    </div>
  )
}, areProjectsEqual)

export default function ReactMemoCustomCompare() {
  const [projectId, setProjectId] = React.useState(101)
  const [pingTime, setPingTime] = React.useState(() => new Date().toLocaleTimeString())

  // প্রতিবার নতুন অবজেক্ট রেফারেন্স তৈরি হচ্ছে
  const project: ProjectData = {
    id: projectId,
    title: projectId === 101 ? "Next.js Learning App" : "Design System Library",
    meta: {
      lastPing: pingTime,
    },
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      {/* হেডার */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            কাস্টম arePropsEqual ফাংশন দিয়ে অবজেক্ট প্রপস নিয়ন্ত্রণ
          </h4>
          <p className="text-xs text-muted-foreground">
            নেস্টেড ডেটা ও ফ্রেশ অবজেক্ট রেফারেন্স থাকা সত্ত্বেও বুদ্ধিমান কম্প্যারিজন
          </p>
        </div>
        <RenderPulse label="প্যারেন্ট রেন্ডার" />
      </div>

      {/* অ্যাকশন কন্ট্রোলস */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* অ্যাকশন ১: শুধু টাইমস্ট্যাম্প বদলানো */}
        <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">
              অ্যাকশন ১: পিং টাইমস্ট্যাম্প আপডেট
            </span>
            <Badge variant="outline" className="font-mono text-[11px]">
              {pingTime}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            এটি একটি নতুন <code>project</code> অবজেক্ট রেফারেন্স তৈরি করে কিন্তু মূল আইডি একই থাকে।
          </p>
          <Button
            size="sm"
            onClick={() => setPingTime(new Date().toLocaleTimeString())}
            className="text-xs"
          >
            নতুন পিং টাইম পাঠান
          </Button>
        </div>

        {/* অ্যাকশন ২: প্রজেক্ট আইডি পরিবর্তন */}
        <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">
              অ্যাকশন ২: মূল প্রজেক্ট আইডি পরিবর্তন
            </span>
            <Badge variant="secondary" className="font-mono text-xs">
              ID: #{projectId}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            এটি প্রজেক্টের বিজনেস পরিচয় বদলায়, ফলে দুটি কার্ডই রি-রেন্ডার হবে।
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setProjectId((id) => (id === 101 ? 202 : 101))}
            className="text-xs"
          >
            প্রজেক্ট সুইচ করুন
          </Button>
        </div>
      </div>

      {/* দুটি মেমোর তুলনা কার্ড */}
      <div className="space-y-3">
        <div className="text-xs font-medium text-muted-foreground">
          নেস্টেড অবজেক্টে মেমোইজেশন রেসপন্স তুলনা:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DefaultShallowCard project={project} />
          <CustomCompareCard project={project} />
        </div>
      </div>
    </div>
  )
}
