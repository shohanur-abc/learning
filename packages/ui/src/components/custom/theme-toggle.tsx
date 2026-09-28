"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export interface ThemeToggleProps {
  readonly className?: string
}

const emptySubscribe = () => () => {}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Toggle theme"
        className={cn("text-muted-foreground", className)}
      >
        <span className="size-4" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn("text-muted-foreground hover:text-foreground", className)}
    >
      {isDark ? (
        <Sun className="size-4 text-amber-400 transition-all hover:rotate-45" />
      ) : (
        <Moon className="size-4 text-slate-700 transition-all hover:-rotate-12 dark:text-slate-200" />
      )}
    </Button>
  )
}
