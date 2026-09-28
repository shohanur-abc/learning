"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

const modules = [
  {
    level: "01. Foundations",
    tag: "Level 1",
    description: "Shift from Vanilla JS DOM manipulation to React's declarative state-driven UI.",
    topics: [
      { title: "1.1 Imperative vs Declarative UI", href: "/01-foundations/1.1-imperative-vs-declarative-ui" },
      { title: "1.2 JSX Rules & Expressions", href: "/01-foundations/1.2-jsx-rules-and-expressions" },
      { title: "1.3 Components & Composition", href: "/01-foundations/1.3-components-and-composition" },
      { title: "1.4 Props & Children", href: "/01-foundations/1.4-props-and-children" },
    ],
  },
  {
    level: "02. Interactivity & State",
    tag: "Level 2",
    description: "Bring UIs to life with events, useState, conditional rendering, and dynamic lists.",
    topics: [
      { title: "2.1 Event Handling", href: "/02-interactivity-and-state/2.1-event-handling" },
      { title: "2.2 useState Deep Dive", href: "/02-interactivity-and-state/2.2-use-state-deep-dive" },
      { title: "2.3 Conditional Rendering", href: "/02-interactivity-and-state/2.3-conditional-rendering" },
      { title: "2.4 Lists & Keys (.map)", href: "/02-interactivity-and-state/2.4-lists-and-keys" },
    ],
  },
  {
    level: "03. Forms & Side Effects",
    tag: "Level 3",
    description: "Handle real-world forms, async API fetching, lifecycle cleanups, and custom hooks.",
    topics: [
      { title: "3.1 Forms in React", href: "/03-forms-and-side-effects/3.1-forms-in-react" },
      { title: "3.2 useEffect Hook", href: "/03-forms-and-side-effects/3.2-use-effect-hook" },
      { title: "3.3 useRef & DOM Access", href: "/03-forms-and-side-effects/3.3-use-ref-and-dom-access" },
      { title: "3.4 Custom Hooks", href: "/03-forms-and-side-effects/3.4-custom-hooks" },
    ],
  },
  {
    level: "04. State Architecture",
    tag: "Level 4",
    description: "Scale applications without prop drilling using Context API, Reducers, and lifting state.",
    topics: [
      { title: "4.1 Lifting State Up", href: "/04-state-architecture/4.1-lifting-state-up" },
      { title: "4.2 Context API & useContext", href: "/04-state-architecture/4.2-context-api-and-use-context" },
      { title: "4.3 useReducer Hook", href: "/04-state-architecture/4.3-use-reducer-hook" },
    ],
  },
  {
    level: "05. Performance Optimization",
    tag: "Level 5",
    description: "Diagnose re-renders, cache calculations with useMemo, memoize functions, and lazy load.",
    topics: [
      { title: "5.1 React Re-render Mechanics", href: "/05-performance-optimization/5.1-react-re-render-mechanics" },
      { title: "5.2 useMemo & useCallback", href: "/05-performance-optimization/5.2-use-memo-and-use-callback" },
      { title: "5.3 React.memo & Lazy Loading", href: "/05-performance-optimization/5.3-react-memo-and-lazy-loading" },
    ],
  },
  {
    level: "06. React 19 & Next.js Pro",
    tag: "Level 6",
    description: "Master React Server Components (RSC), React 19 Actions, useOptimistic, and Tailwind UI.",
    topics: [
      { title: "6.1 Server vs Client Components", href: "/06-modern-react-19-and-nextjs/6.1-server-vs-client-components" },
      { title: "6.2 React 19 New Hooks", href: "/06-modern-react-19-and-nextjs/6.2-react-19-new-hooks" },
      { title: "6.3 Tailwind CSS & Shadcn Architecture", href: "/06-modern-react-19-and-nextjs/6.3-tailwind-and-shadcn-architecture" },
    ],
  },
]

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="rounded-2xl border bg-gradient-to-br from-primary/5 via-card to-background p-6 md:p-8 space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="size-3.5" />
          <span>Curriculum Roadmap</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          React Mastery: From Scratch to Pro
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Tailored specifically for developers with JavaScript and Tailwind CSS fundamentals.
          Navigate through the sidebar on the left or click any topic below to explore the modules.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/01-foundations/1.1-imperative-vs-declarative-ui">
            <Button className="gap-2">
              <span>Start Level 1</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Course Modules</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((mod) => (
            <Card key={mod.level} className="flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {mod.tag}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {mod.topics.length} topics
                  </span>
                </div>
                <CardTitle className="text-base font-semibold">
                  {mod.level}
                </CardTitle>
                <CardDescription className="text-xs">
                  {mod.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1.5 border-t pt-3">
                  {mod.topics.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      className="group flex items-center justify-between rounded-md p-1.5 text-xs hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <CheckCircle2 className="size-3.5 text-muted-foreground/60 group-hover:text-primary transition-colors shrink-0" />
                        <span className="truncate group-hover:text-foreground transition-colors">
                          {t.title}
                        </span>
                      </div>
                      <ArrowRight className="size-3 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

