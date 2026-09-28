"use client"

import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Flame, Snowflake, Thermometer } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৪.১ Lifting State Up: Temperature Sync Converter
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * দুটি সিবলিং ইনপুটকে (Celsius ও Fahrenheit) পরস্পরের সাথে সিঙ্ক করতে হলে
 * স্টেটকে কোনো চাইল্ডের ভেতর না রেখে তাদের নিকটতম কমন প্যারেন্টে তুলে নিতে হয়।
 * প্যারেন্ট হলো Single Source of Truth; চাইল্ডরা কেবল ভ্যালু ও অন-চেঞ্জ কলব্যাক প্রপস পায়।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. ডুপ্লিকেট স্টেট রাখা অ্যান্টি-প্যাটার্ন (Celsius ও Fahrenheit দুটোই আলাদা স্টেট নয়)।
 * ২. প্যারেন্ট একটি মৌলিক স্টেট রাখে এবং অপর স্কেলের তাপমাত্রা ডেরাইভড ভ্যালু হিসেবে ক্যালকুলেট করে।
 * ─────────────────────────────────────────────────────────────────────────────
 */

type Scale = "c" | "f"

/** সেলসিয়াস থেকে ফারেনহাইট রূপান্তর */
function toFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32
}

/** ফারেনহাইট থেকে সেলসিয়াস রূপান্তর */
function toCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9
}

/** নিরাপদ কনভার্সন ফাংশন যা ফাঁকা বা অবৈধ ইনপুট হ্যান্ডেল করে */
function tryConvert(
  temperature: string,
  convert: (input: number) => number
): string {
  const input = parseFloat(temperature)
  if (Number.isNaN(input)) {
    return ""
  }
  const output = convert(input)
  const rounded = Math.round(output * 100) / 100
  return rounded.toString()
}

interface TemperatureInputProps {
  readonly scale: Scale
  readonly temperature: string
  readonly onTemperatureChange: (value: string) => void
}

const scaleNames: Record<Scale, string> = {
  c: "সেলসিয়াস (°C)",
  f: "ফারেনহাইট (°F)",
}

/** চাইল্ড কম্পোনেন্ট: কোনো নিজস্ব স্টেট নেই, প্যারেন্ট থেকে প্রাপ্ত প্রপস দিয়ে কাজ করে */
function TemperatureInput({
  scale,
  temperature,
  onTemperatureChange,
}: TemperatureInputProps) {
  return (
    <div className="flex-1 space-y-2">
      <Label
        htmlFor={`temp-${scale}`}
        className="text-xs font-medium text-foreground flex items-center gap-1.5"
      >
        <Thermometer className="size-3.5 text-primary" />
        {scaleNames[scale]}
      </Label>
      <div className="relative">
        <Input
          id={`temp-${scale}`}
          type="number"
          step="any"
          value={temperature}
          onChange={(e) => onTemperatureChange(e.target.value)}
          placeholder={`যেমন: ${scale === "c" ? "25" : "77"}`}
          className="pr-10"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
          °{scale.toUpperCase()}
        </span>
      </div>
    </div>
  )
}

/**
 * প্যারেন্ট কম্পোনেন্ট: স্টেট সংরক্ষণ করে এবং উভয় চাইল্ডে সিঙ্ক করে
 */
export default function TemperatureSyncConverter() {
  // প্যারেন্ট সিঙ্গেল সোর্স অব ট্রুথ সংরক্ষণ করে
  const [scale, setScale] = React.useState<Scale>("c")
  const [temperature, setTemperature] = React.useState<string>("25")

  const handleCelsiusChange = (value: string) => {
    setScale("c")
    setTemperature(value)
  }

  const handleFahrenheitChange = (value: string) => {
    setScale("f")
    setTemperature(value)
  }

  // একটি মান স্টেট থেকে আসে, অন্যটি রানটাইমে ডেরাইভ করা হয়
  const celsius =
    scale === "f" ? tryConvert(temperature, toCelsius) : temperature
  const fahrenheit =
    scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature

  const celsiusNum = parseFloat(celsius)
  const isBoiling = !Number.isNaN(celsiusNum) && celsiusNum >= 100
  const isFreezing = !Number.isNaN(celsiusNum) && celsiusNum <= 0

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Single Source of Truth ডেমো
        </span>
        <div className="flex items-center gap-2">
          {isBoiling && (
            <Badge variant="destructive" className="gap-1 text-xs">
              <Flame className="size-3" /> ফুটন্ত পানি (Boiling)
            </Badge>
          )}
          {isFreezing && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <Snowflake className="size-3 text-sky-500" /> জমে বরফ (Freezing)
            </Badge>
          )}
          {!isBoiling && !isFreezing && (
            <Badge variant="outline" className="text-xs">
              স্বাভাবিক তাপমাত্রা
            </Badge>
          )}
        </div>
      </div>

      {/* দুটি সিবলিং কম্পোনেন্ট প্যারেন্ট স্টেট শেয়ার করছে */}
      <div className="flex flex-col sm:flex-row gap-4">
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={handleFahrenheitChange}
        />
      </div>

      <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground border border-border/50">
        💡 <strong>লক্ষণীয়:</strong> যেকোনো একটি ইনপুটে মান পরিবর্তন করলে অন্য ইনপুটটি স্বয়ংক্রিয়ভাবে
        হিসাব হয়ে আপডেট হয়। উভয় চাইল্ডে কোনো ডুপ্লিকেট স্টেট নেই।
      </div>
    </div>
  )
}
