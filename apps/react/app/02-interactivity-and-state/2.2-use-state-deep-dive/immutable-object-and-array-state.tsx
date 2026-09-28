"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Badge } from "@workspace/ui/components/badge"
import { Trash2 } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ২.২ useState Deep Dive: অবজেক্ট এবং অ্যারে স্টেটের ইমিউটেবিলিটি
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * React স্টেট অবজেক্ট ও অ্যারেকে রিড-অনলি (Read-only) বিবেচনা করে।
 * `state.title = "New"` বা `array.push(...)` করলে মেমোরি রেফারেন্স পরিবর্তন হয় না,
 * ফলে React-এর Shallow Comparison (Object.is) কোনো পরিবর্তন ধরতে পারে না এবং
 * UI রি-রেন্ডার হয় না। সমাধান: স্প্রেড অপারেটর (`...`) ব্যবহার করে সম্পূর্ণ নতুন কপি তৈরি করা।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. অবজেক্ট আপডেট: `setUser(prev => ({ ...prev, name: "নতুন নাম" }))`
 * ২. নেস্টেড অবজেক্ট: প্রতি লেভেলে স্প্রেড অপারেটর দিতে হয়।
 * ৩. অ্যারে যোগ: `setItems(prev => [...prev, newItem])`
 * ৪. অ্যারে মুছে ফেলা: `setItems(prev => prev.filter(item => item.id !== id))`
 * ─────────────────────────────────────────────────────────────────────────────
 */

interface SkillItem {
  readonly id: number
  readonly name: string
  readonly level: "Junior" | "Mid" | "Senior"
}

interface DeveloperProfile {
  readonly name: string
  readonly details: {
    readonly title: string
    readonly experienceYears: number
  }
}

export default function ImmutableObjectAndArrayState() {
  // ১. নেস্টেড অবজেক্ট স্টেট
  const [profile, setProfile] = React.useState<DeveloperProfile>({
    name: "সাকিব হাসান",
    details: {
      title: "Frontend Engineer",
      experienceYears: 2,
    },
  })

  // ২. অ্যারে স্টেট
  const [skills, setSkills] = React.useState<readonly SkillItem[]>([
    { id: 1, name: "React 19", level: "Senior" },
    { id: 2, name: "TypeScript", level: "Mid" },
    { id: 3, name: "Tailwind CSS", level: "Senior" },
  ])

  const [newSkillName, setNewSkillName] = React.useState<string>("")

  // নেস্টেড অবজেক্ট ইমিউটেবল আপডেট
  function handlePromoteTitle() {
    setProfile((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        title: "Lead Frontend Architect",
        experienceYears: prev.details.experienceYears + 1,
      },
    }))
  }

  // অ্যারেতে নতুন আইটেম ইমিউটেবলভাবে যোগ করা
  function handleAddSkill() {
    if (!newSkillName.trim()) return

    const newItem: SkillItem = {
      id: Date.now(),
      name: newSkillName.trim(),
      level: "Junior",
    }

    setSkills((prev) => [...prev, newItem])
    setNewSkillName("")
  }

  // অ্যারে থেকে ইমিউটেবলভাবে আইটেম ডিলিট করা
  function handleRemoveSkill(idToRemove: number) {
    setSkills((prev) => prev.filter((skill) => skill.id !== idToRemove))
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-6 shadow-xs">
      {/* সেকশন ১: নেস্টেড অবজেক্ট আপডেট */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="text-xs font-semibold text-foreground">
            ১. নেস্টেড অবজেক্ট ইমিউটেবল আপডেট (Spread Operator):
          </span>
          <Badge variant="outline" className="text-xs">
            Nested Object
          </Badge>
        </div>

        <div className="rounded-lg bg-muted/40 p-3 text-xs space-y-1.5 border border-border/50">
          <div>
            <span className="text-muted-foreground">ডেভেলপার নাম:</span>{" "}
            <span className="font-semibold text-foreground">{profile.name}</span>
          </div>
          <div>
            <span className="text-muted-foreground">পদবী (Title):</span>{" "}
            <span className="font-mono text-primary font-semibold">
              {profile.details.title}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">অভিজ্ঞতা:</span>{" "}
            <span className="font-semibold text-foreground">
              {profile.details.experienceYears} বছর
            </span>
          </div>
        </div>

        <Button size="sm" variant="outline" onClick={handlePromoteTitle}>
          🚀 পদোন্নতি দাও (ইমিউটেবল নেস্টেড আপডেট)
        </Button>
      </div>

      {/* সেকশন ২: অ্যারে স্টেট ইমিউটেবল হ্যান্ডলিং */}
      <div className="space-y-3 pt-2 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            ২. অ্যারে স্টেট আপডেট ([...prev] ও .filter()):
          </span>
          <Badge variant="outline" className="text-xs">
            মোট স্কিল: {skills.length}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Input
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="নতুন স্কিলের নাম লিখুন..."
            className="text-xs"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddSkill()
            }}
          />
          <Button size="sm" onClick={handleAddSkill}>
            + স্কিল যোগ করো
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs"
            >
              <span className="font-medium text-foreground">{skill.name}</span>
              <Badge variant="secondary" className="text-[10px] px-1 py-0">
                {skill.level}
              </Badge>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill.id)}
                className="text-muted-foreground hover:text-destructive transition-colors ml-1"
                aria-label={`Remove ${skill.name}`}
              >
                <Trash2 className="size-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
