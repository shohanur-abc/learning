"use client"

import * as React from "react"
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Code2,
  HelpCircle,
  Info,
  Layers,
  Lightbulb,
  RefreshCw,
  X,
  XCircle,
  Zap,
} from "lucide-react"
import { Highlight, themes } from "prism-react-renderer"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * REUSABLE LEARNING COMPONENTS FOR REACT CURRICULUM ("SCRATCH TO PRO")
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── 1. TOPIC HERO BANNER ─────────────────────────────────────────────────── */

export interface TopicHeroFormula {
  readonly label: string
  readonly value: string
}

export interface TopicHeroProps {
  /** Optional badge text or node, e.g. "কোর কনসেপ্ট • Level 1.1" */
  readonly badge?: React.ReactNode
  /** Optional icon displayed in badge, defaults to BookOpen */
  readonly badgeIcon?: React.ReactNode
  /** Topic main title heading */
  readonly title: React.ReactNode
  /** Conceptual explanation */
  readonly description: React.ReactNode
  /** Optional formula or mental model pill */
  readonly formula?: TopicHeroFormula
  readonly children?: React.ReactNode
  readonly className?: string
}

/**
 * Reusable visual hero banner displayed at the top of curriculum topic pages.
 */
export function TopicHero({
  badge,
  badgeIcon,
  title,
  description,
  formula,
  children,
  className,
}: TopicHeroProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-gradient-to-br from-primary/5 via-card to-background p-6 md:p-8 space-y-4",
        className
      )}
    >
      {Boolean(badge) && (
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {badgeIcon ?? <BookOpen className="size-3.5" />}
          <span>{badge}</span>
        </div>
      )}

      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {formula ? (
        <div className="inline-flex items-center gap-3 rounded-xl border bg-card/80 px-4 py-2.5 shadow-xs font-mono text-xs">
          <Zap className="size-4 text-amber-500 shrink-0" />
          <span>{formula.label}:</span>
          <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
            {formula.value}
          </span>
        </div>
      ) : null}

      {children}
    </div>
  )
}

/* ── 2. CONCEPT ALERT CARD ─────────────────────────────────────────────────── */

export interface ConceptAlertProps {
  readonly type?: "info" | "warning" | "success" | "tip"
  readonly title?: React.ReactNode
  readonly children: React.ReactNode
  readonly className?: string
}

/**
 * Reusable alert card for highlighting critical concepts, pitfalls, and tips.
 */
export function ConceptAlert({
  type = "info",
  title,
  children,
  className,
}: ConceptAlertProps) {
  const config = {
    info: {
      border: "border-blue-500/20",
      bg: "bg-blue-500/10",
      text: "text-blue-700 dark:text-blue-400",
      icon: Info,
    },
    warning: {
      border: "border-amber-500/20",
      bg: "bg-amber-500/10",
      text: "text-amber-700 dark:text-amber-400",
      icon: AlertCircle,
    },
    success: {
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/10",
      text: "text-emerald-700 dark:text-emerald-400",
      icon: CheckCircle2,
    },
    tip: {
      border: "border-purple-500/20",
      bg: "bg-purple-500/10",
      text: "text-purple-700 dark:text-purple-400",
      icon: Lightbulb,
    },
  }[type]

  const Icon = config.icon

  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-lg border p-3.5 text-xs leading-relaxed",
        config.border,
        config.bg,
        config.text,
        className
      )}
    >
      <Icon className="size-4 shrink-0 mt-0.5" />
      <div className="space-y-1">
        {Boolean(title) && <div className="font-semibold">{title}</div>}
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}

/* ── 3. COMPARISON GRID (2-COLUMN) ─────────────────────────────────────────── */

export interface ComparisonColumn {
  readonly title: React.ReactNode
  readonly badge?: string
  readonly variant?: "destructive" | "emerald" | "default" | "primary"
  readonly description?: React.ReactNode
  readonly items?: readonly string[]
  readonly content?: React.ReactNode
}

export interface ComparisonGridProps {
  readonly left: ComparisonColumn
  readonly right: ComparisonColumn
  readonly className?: string
}

/**
 * Reusable 2-column side-by-side comparison widget for contrasting Imperative vs Declarative,
 * Bad vs Good practices, or Vanilla JS vs React.
 */
export function ComparisonGrid({
  left,
  right,
  className,
}: ComparisonGridProps) {
  const getStyles = (variant: ComparisonColumn["variant"] = "default") => {
    switch (variant) {
      case "destructive":
        return {
          card: "border-destructive/20 bg-destructive/5",
          header: "text-destructive",
          icon: X,
        }
      case "emerald":
        return {
          card: "border-emerald-500/20 bg-emerald-500/5",
          header: "text-emerald-600 dark:text-emerald-400",
          icon: Check,
        }
      case "primary":
        return {
          card: "border-primary/20 bg-primary/5",
          header: "text-primary",
          icon: Zap,
        }
      default:
        return {
          card: "border-border bg-card",
          header: "text-foreground",
          icon: Info,
        }
    }
  }

  const renderColumn = (col: ComparisonColumn) => {
    const s = getStyles(col.variant)
    const ColIcon = s.icon

    return (
      <div className={cn("rounded-lg border p-4 space-y-2 text-xs", s.card)}>
        <div className={cn("flex items-center justify-between font-semibold", s.header)}>
          <div className="flex items-center gap-1.5">
            <ColIcon className="size-4" />
            <span>{col.title}</span>
          </div>
          {Boolean(col.badge) && (
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-current opacity-80 font-mono">
              {col.badge}
            </span>
          )}
        </div>

        {Boolean(col.description) && (
          <p className="text-muted-foreground leading-relaxed">{col.description}</p>
        )}

        {Boolean(col.items?.length) && (
          <ul className="space-y-1.5 text-muted-foreground list-disc pl-4 leading-relaxed">
            {col.items?.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        )}

        {col.content}
      </div>
    )
  }

  return (
    <div className={cn("grid gap-3 md:grid-cols-2", className)}>
      {renderColumn(left)}
      {renderColumn(right)}
    </div>
  )
}

/* ── 4. COMMON PITFALL CARD (GOTCHA & FIX) ─────────────────────────────────── */

export interface CommonPitfallProps {
  /** The Gotcha title, e.g. "Direct State Mutation (array.push)" */
  readonly title: React.ReactNode
  /** Explanation of why this is a mistake */
  readonly mistakeDescription: React.ReactNode
  /** Why this causes bugs in React */
  readonly whyItFails: React.ReactNode
  /** How to solve it correctly */
  readonly solutionDescription: React.ReactNode
  /** Optional bad code snippet */
  readonly badCode?: string
  /** Optional good code snippet */
  readonly goodCode?: string
  readonly className?: string
}

/**
 * Visual card highlighting common beginner pitfalls with the exact mistake, why it fails,
 * and the recommended idiom.
 */
export function CommonPitfall({
  title,
  mistakeDescription,
  whyItFails,
  solutionDescription,
  badCode,
  goodCode,
  className,
}: CommonPitfallProps) {
  return (
    <div className={cn("rounded-xl border border-destructive/20 bg-card overflow-hidden text-xs shadow-xs", className)}>
      <div className="flex items-center gap-2 border-b bg-destructive/10 px-4 py-3 font-semibold text-destructive">
        <AlertCircle className="size-4 shrink-0" />
        <span>সাধারণ ভুল (Common Pitfall): {title}</span>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          {/* Wrong Approach */}
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-destructive">
              <XCircle className="size-3.5" />
              <span>ভুল পদ্ধতি (The Mistake)</span>
            </div>
            <div className="text-muted-foreground leading-relaxed">
              {mistakeDescription}
            </div>
            {badCode ? (
              <pre className="rounded bg-[#1e1e1e] p-2.5 font-mono text-[11px] text-red-300 overflow-x-auto">
                <code>{badCode.trim()}</code>
              </pre>
            ) : null}
          </div>

          {/* Correct Approach */}
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-3.5" />
              <span>সঠিক সমাধান (The Fix)</span>
            </div>
            <div className="text-muted-foreground leading-relaxed">
              {solutionDescription}
            </div>
            {goodCode ? (
              <pre className="rounded bg-[#1e1e1e] p-2.5 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                <code>{goodCode.trim()}</code>
              </pre>
            ) : null}
          </div>
        </div>

        {/* Why it fails note */}
        <div className="rounded-lg bg-muted/40 p-3 text-muted-foreground border leading-relaxed">
          <strong className="text-foreground">কেন এটি সমস্যা তৈরি করে?</strong> {whyItFails}
        </div>
      </div>
    </div>
  )
}

/* ── 5. MENTAL MODEL STEPS (LIFECYCLE & DATA FLOW) ─────────────────────────── */

export interface MentalModelStep {
  readonly step: number | string
  readonly title: string
  readonly description: string
  readonly badge?: string
}

export interface MentalModelStepsProps {
  readonly title?: React.ReactNode
  readonly steps: readonly MentalModelStep[]
  readonly className?: string
}

/**
 * Visual connected step sequence for explaining React lifecycles, re-render phases,
 * and data flow (e.g. Trigger -> Render -> Commit).
 */
export function MentalModelSteps({
  title = "ধাপসমূহ (How it Works):",
  steps,
  className,
}: MentalModelStepsProps) {
  return (
    <div className={cn("rounded-xl border bg-card p-5 space-y-4 text-xs", className)}>
      {Boolean(title) && (
        <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
          <Zap className="size-4 text-primary" />
          <span>{title}</span>
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-3">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="relative rounded-lg border bg-muted/20 p-3.5 space-y-1.5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground font-mono font-bold text-[11px]">
                {s.step}
              </span>
              {Boolean(s.badge) && (
                <span className="font-mono text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-muted">
                  {s.badge}
                </span>
              )}
            </div>
            <div className="font-semibold text-foreground">{s.title}</div>
            <p className="text-muted-foreground leading-relaxed text-[11px]">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 6. RULE TABLE (CHEATSHEET / REFERENCE) ────────────────────────────────── */

export interface RuleTableRow {
  readonly feature: React.ReactNode
  readonly vanillaOrHtml: React.ReactNode
  readonly reactEquivalent: React.ReactNode
  readonly note?: React.ReactNode
}

export interface RuleTableProps {
  readonly title?: React.ReactNode
  readonly colHeaders?: [string, string, string, string?]
  readonly rows: readonly RuleTableRow[]
  readonly className?: string
}

/**
 * Reusable table for cheatsheets and attribute mappings (e.g. HTML vs JSX, Props vs State).
 */
export function RuleTable({
  title,
  colHeaders = ["ফিচার (Feature)", "HTML / Vanilla JS", "React (JSX)", "নোট (Note)"],
  rows,
  className,
}: RuleTableProps) {
  return (
    <div className={cn("rounded-xl border bg-card overflow-hidden text-xs shadow-xs space-y-0", className)}>
      {Boolean(title) && (
        <div className="border-b bg-muted/20 px-4 py-3 font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="size-4 text-primary" />
          <span>{title}</span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-muted/30 text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
              <th className="py-2.5 px-4">{colHeaders[0]}</th>
              <th className="py-2.5 px-4">{colHeaders[1]}</th>
              <th className="py-2.5 px-4">{colHeaders[2]}</th>
              {colHeaders[3] ? <th className="py-2.5 px-4">{colHeaders[3]}</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-muted/10 transition-colors">
                <td className="py-2.5 px-4 font-medium text-foreground">{row.feature}</td>
                <td className="py-2.5 px-4 text-muted-foreground font-mono text-[11px]">
                  {row.vanillaOrHtml}
                </td>
                <td className="py-2.5 px-4 text-primary font-mono text-[11px] font-semibold">
                  {row.reactEquivalent}
                </td>
                {colHeaders[3] ? (
                  <td className="py-2.5 px-4 text-muted-foreground text-[11px] leading-relaxed">
                    {row.note}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ── 7. INTERACTIVE CONCEPT QUIZ ───────────────────────────────────────────── */

export interface QuizOption {
  readonly text: string
  readonly isCorrect: boolean
  readonly feedback: string
}

export interface ConceptQuizProps {
  readonly question: string
  readonly options: readonly QuizOption[]
  readonly hint?: string
  readonly className?: string
}

/**
 * Interactive multiple-choice knowledge check widget with immediate Bengali feedback.
 */
export function ConceptQuiz({
  question,
  options,
  hint,
  className,
}: ConceptQuizProps) {
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null)
  const [showHint, setShowHint] = React.useState(false)

  const selected = selectedIdx !== null ? options[selectedIdx] : null

  const handleReset = () => {
    setSelectedIdx(null)
    setShowHint(false)
  }

  return (
    <div className={cn("rounded-xl border bg-card p-5 space-y-4 text-xs shadow-xs", className)}>
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
          <HelpCircle className="size-4 text-primary" />
          <span>কুইক কনসেপ্ট চেক (Quick Quiz)</span>
        </div>
        {hint ? (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => setShowHint((h) => !h)}
            className="text-[11px] text-muted-foreground hover:text-foreground gap-1"
          >
            <Lightbulb className="size-3" />
            <span>{showHint ? "হিন্ট লুকান" : "হিন্ট দেখুন"}</span>
          </Button>
        ) : null}
      </div>

      {showHint && hint ? (
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 text-amber-700 dark:text-amber-400 text-[11px]">
          💡 <strong>হিন্ট:</strong> {hint}
        </div>
      ) : null}

      <div className="font-medium text-foreground text-sm leading-relaxed">
        {question}
      </div>

      {/* Options List */}
      <div className="space-y-2">
        {options.map((opt, idx) => {
          const isChosen = selectedIdx === idx
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={cn(
                "w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer",
                isChosen
                  ? opt.isCorrect
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 font-semibold"
                    : "border-destructive bg-destructive/10 text-destructive font-semibold"
                  : "bg-background hover:bg-muted/50 border-border text-foreground"
              )}
            >
              <span>{opt.text}</span>
              {isChosen ? (
                opt.isCorrect ? (
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="size-4 text-destructive shrink-0" />
                )
              ) : null}
            </button>
          )
        })}
      </div>

      {/* Result feedback */}
      {selected ? (
        <div
          className={cn(
            "rounded-lg p-3 border flex items-start justify-between gap-3 text-xs leading-relaxed",
            selected.isCorrect
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
              : "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400"
          )}
        >
          <div className="space-y-1">
            <div className="font-semibold">
              {selected.isCorrect ? "🎉 একদম সঠিক উত্তর!" : "❌ উত্তরটি সঠিক নয়"}
            </div>
            <div>{selected.feedback}</div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={handleReset}
            className="shrink-0 gap-1 text-[11px]"
          >
            <RefreshCw className="size-3" />
            <span>আবার চেষ্টা করুন</span>
          </Button>
        </div>
      ) : null}
    </div>
  )
}

/* ── 8. RENDER PULSE (VISUAL RE-RENDER TRACKER) ────────────────────────────── */

export interface RenderPulseProps {
  readonly count?: number
  readonly label?: string
  readonly className?: string
}

/**
 * Visual badge that flashes a subtle glow whenever the parent component re-renders.
 * Essential for teaching React re-render mechanics, state batching, and memoization.
 */
export function RenderPulse({
  count,
  label = "Render Count",
  className,
}: RenderPulseProps) {
  const renderRef = React.useRef(0)
  renderRef.current += 1
  const displayCount = count ?? renderRef.current

  const badgeRef = React.useRef<HTMLDivElement>(null)

  // Direct DOM styling without useState to prevent infinite re-render loops
  React.useEffect(() => {
    const el = badgeRef.current
    if (!el) return

    el.classList.add("border-emerald-500", "bg-emerald-500/20", "text-emerald-600", "dark:text-emerald-400", "scale-105")
    const timer = setTimeout(() => {
      el.classList.remove("border-emerald-500", "bg-emerald-500/20", "text-emerald-600", "dark:text-emerald-400", "scale-105")
    }, 400)

    return () => clearTimeout(timer)
  })

  return (
    <div
      ref={badgeRef}
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-border bg-muted/40 text-muted-foreground text-[11px] font-mono transition-all duration-300",
        className
      )}
      title="Component Render Tracker"
    >
      <span className="size-1.5 rounded-full bg-emerald-500" />
      <span>{label}:</span>
      <span className="font-bold text-foreground">{displayCount}</span>
    </div>
  )
}

/* ── 9. TAKEAWAY LIST ──────────────────────────────────────────────────────── */

export interface TakeawayListProps {
  readonly title?: React.ReactNode
  readonly items: readonly string[]
  readonly className?: string
}

/**
 * Reusable checklist of takeaways for educational summaries.
 */
export function TakeawayList({
  title = "কী টেকঅ্যাওয়ে (Key Takeaways):",
  items,
  className,
}: TakeawayListProps) {
  return (
    <div className={cn("rounded-lg border bg-card/60 p-4 space-y-2.5 text-xs", className)}>
      <div className="flex items-center gap-1.5 font-semibold text-foreground">
        <Zap className="size-3.5 text-primary" />
        <span>{title}</span>
      </div>
      <ul className="space-y-1.5 text-muted-foreground">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── 10. TOPIC PAGINATION FOOTER ───────────────────────────────────────────── */

export interface TopicPaginationItem {
  readonly title: string
  readonly href: string
}

export interface TopicPaginationProps {
  readonly previous?: TopicPaginationItem
  readonly next?: TopicPaginationItem
  readonly overviewHref?: string
  readonly overviewLabel?: string
  readonly linkComponent?: React.ComponentType<{
    href: string
    className?: string
    children: React.ReactNode
  }>
  readonly className?: string
}

/**
 * Reusable pagination footer for navigating across curriculum topics.
 */
export function TopicPagination({
  previous,
  next,
  overviewHref = "/",
  overviewLabel = "কারিকুলাম ওভারভিউ",
  linkComponent: LinkComp = "a" as unknown as React.ComponentType<{
    href: string
    className?: string
    children: React.ReactNode
  }>,
  className,
}: TopicPaginationProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-4 border-t pt-6", className)}>
      <div>
        {previous ? (
          <LinkComp href={previous.href}>
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              <ArrowLeft className="size-4" />
              <span>{previous.title}</span>
            </Button>
          </LinkComp>
        ) : (
          <LinkComp href={overviewHref}>
            <Button variant="ghost" size="sm" className="gap-2 text-xs">
              <Layers className="size-4" />
              <span>{overviewLabel}</span>
            </Button>
          </LinkComp>
        )}
      </div>

      <div className="flex items-center gap-2">
        {Boolean(previous) && (
          <LinkComp href={overviewHref}>
            <Button variant="ghost" size="sm" className="gap-2 text-xs">
              <Layers className="size-4" />
              <span className="hidden sm:inline">{overviewLabel}</span>
            </Button>
          </LinkComp>
        )}

        {next ? (
          <LinkComp href={next.href}>
            <Button size="sm" className="gap-2 text-xs">
              <span>{next.title}</span>
              <ArrowRight className="size-4" />
            </Button>
          </LinkComp>
        ) : null}
      </div>
    </div>
  )
}
