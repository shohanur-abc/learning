"use client"

import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Sun, Moon, Laptop, Palette } from "lucide-react"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ৪.২ Context API & useContext: Theme Context Provider
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 🧠 MENTAL MODEL:
 * React Context হলো এমন একটি পাইপলাইন যা যেকোনো ডেটাকে সরাসরি ট্রি-র গভীরে থাকা
 * কম্পোনেন্টগুলোতে পৌঁছে দেয়, মাঝে থাকা কোনো কম্পোনেন্টকে স্পর্শ না করেই (Prop Drilling মুক্ত)।
 * একটি প্রোভাইডার ভ্যালু ব্রডকাস্ট করে এবং সাবস্ক্রাইব করা চাইল্ডরা `useContext` দিয়ে তা রিসিভ করে।
 *
 * 🌟 KEY TAKEAWAYS:
 * ১. `createContext` দিয়ে কনটেক্সট তৈরি হয় এবং `<Context.Provider value={...}>` ডেটা সরবরাহ করে।
 * ২. নিরাপদ কনজিউমার হুক তৈরি করে প্রোভাইডারের অনুপস্থিতিতে সহায়ক এরর থ্রো করা বেস্ট প্র্যাকটিস।
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type ThemeMode = "light" | "dark" | "system"

interface ThemeContextType {
  readonly theme: ThemeMode
  readonly resolvedTheme: "light" | "dark"
  readonly setTheme: (mode: ThemeMode) => void
  readonly toggleTheme: () => void
}

// ১. কনটেক্সট তৈরি (ডিফল্ট মান undefined দিয়ে টাইপ গার্ড সহজ করা হয়)
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  readonly children: React.ReactNode
  readonly defaultTheme?: ThemeMode
}

/**
 * থিম প্রোভাইডার: স্টেট সংরক্ষণ করে এবং চাইল্ড ট্রিতে ব্রডকাস্ট করে
 */
export function CustomThemeProvider({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<ThemeMode>(defaultTheme)

  // সিস্টেম মোড হ্যান্ডলিং
  const resolvedTheme: "light" | "dark" =
    theme === "system" ? "dark" : theme

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const value = React.useMemo<ThemeContextType>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/**
 * নিরাপদ কাস্টম কনটেক্সট কনজিউমার হুক
 * প্রোভাইডারের বাইরে কল করলে এটি স্পষ্ট নির্দেশনামূলক এরর থ্রো করে।
 */
export function useAppTheme(): ThemeContextType {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error(
      "useAppTheme অবশ্যই একটি <CustomThemeProvider> এর ভেতরে ব্যবহার করতে হবে।"
    )
  }
  return context
}

/** চাইল্ড কম্পোনেন্ট ১: কন্ট্রোল প্যানেল (কোনো প্রপস ছাড়া সরাসরি হুক ব্যবহার করছে) */
function ThemeController() {
  const { theme, setTheme, toggleTheme } = useAppTheme()

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-1.5">
        <Button
          size="sm"
          variant={theme === "light" ? "default" : "outline"}
          onClick={() => setTheme("light")}
          className="gap-1.5 text-xs"
        >
          <Sun className="size-3.5" />
          Light
        </Button>
        <Button
          size="sm"
          variant={theme === "dark" ? "default" : "outline"}
          onClick={() => setTheme("dark")}
          className="gap-1.5 text-xs"
        >
          <Moon className="size-3.5" />
          Dark
        </Button>
        <Button
          size="sm"
          variant={theme === "system" ? "default" : "outline"}
          onClick={() => setTheme("system")}
          className="gap-1.5 text-xs"
        >
          <Laptop className="size-3.5" />
          System
        </Button>
      </div>

      <Button
        size="sm"
        variant="secondary"
        onClick={toggleTheme}
        className="text-xs"
      >
        টগল থিম
      </Button>
    </div>
  )
}

/** চাইল্ড কম্পোনেন্ট ২: ভিউ কার্ড (কোনো প্রপস ছাড়া সরাসরি হুক ব্যবহার করছে) */
function ThemedCardPreview() {
  const { theme, resolvedTheme } = useAppTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div
      className={`rounded-lg border p-4 transition-all duration-300 ${
        isDark
          ? "border-zinc-700 bg-zinc-900 text-zinc-100 shadow-inner"
          : "border-amber-200 bg-amber-50/70 text-zinc-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isDark ? (
            <Moon className="size-4 text-sky-400" />
          ) : (
            <Sun className="size-4 text-amber-500" />
          )}
          <span className="text-sm font-semibold">
            {isDark ? "ডার্ক মোড কার্ড ভিউ" : "লাইট মোড কার্ড ভিউ"}
          </span>
        </div>
        <Badge
          variant="outline"
          className={`text-xs ${
            isDark
              ? "border-zinc-700 bg-zinc-800 text-zinc-300"
              : "border-amber-300 bg-amber-100 text-amber-900"
          }`}
        >
          বর্তমান মোড: {theme}
        </Badge>
      </div>
      <p className="mt-2 text-xs opacity-80 leading-relaxed">
        এই চাইল্ড কম্পোনেন্টটি কোনো ইন্টারমিডিয়েট প্রপস পাসিং ছাড়াই সরাসরি{" "}
        <code>useAppTheme()</code> হুকের মাধ্যমে Context থেকে রিয়েল-টাইম ডেটা গ্রহণ করছে।
      </p>
    </div>
  )
}

/**
 * মূল শোকেস এক্সাম্পল: Provider দিয়ে চাইল্ড ট্রাকে মোড়ানো
 */
export default function ThemeContextProviderDemo() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Palette className="size-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Context API: Theme Provider ও Custom Consumer
          </span>
        </div>
        <Badge variant="outline" className="text-xs">
          Zero Prop Drilling
        </Badge>
      </div>

      {/* কাস্টম প্রোভাইডারের আওতায় চাইল্ড কম্পোনেন্টসমূহ */}
      <CustomThemeProvider defaultTheme="light">
        <div className="space-y-4">
          <ThemeController />
          <ThemedCardPreview />
        </div>
      </CustomThemeProvider>

      <div className="rounded-md bg-muted/40 p-2.5 text-[11px] text-muted-foreground">
        💡 <strong>লক্ষণীয়:</strong> <code>ThemeController</code> এবং <code>ThemedCardPreview</code>{" "}
        উভয়েই কোনো প্যারেন্ট প্রপস ছাড়াই একই কনটেক্সট শেয়ার করছে।
      </div>
    </div>
  )
}
