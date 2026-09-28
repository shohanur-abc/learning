import { Geist_Mono, Inter } from "next/font/google"
import type * as React from "react"
import {
  Atom,
  Blocks,
  BookOpen,
  Boxes,
  Compass,
  Gauge,
  Sliders,
  Zap,
} from "lucide-react"

import "@workspace/ui/globals.css"
import { AppShell } from "@workspace/ui/components/custom/app-shell"
import type { SidebarSection } from "@workspace/ui/components/custom/sidebar"
import { ThemeProvider } from "@workspace/ui/components/theme-provider"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { cn } from "@workspace/ui/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

/**
 * Curriculum navigation sections definition for the React learning app.
 */
const curriculumSections: readonly SidebarSection[] = [
  {
    id: "sec-overview",
    title: "ভূমিকা ও প্রস্তুতি",
    items: [
      {
        id: "nav-overview",
        type: "link",
        title: "কোর্সের ওভারভিউ ও রোডম্যাপ",
        href: "/",
        icon: <Compass className="size-4" />,
      },
    ],
  },
  {
    id: "sec-curriculum",
    title: "কারিকুলাম (Scratch to Pro)",
    items: [
      {
        id: "folder-01-foundations",
        type: "folder",
        title: "০১. Foundations",
        badge: "4",
        icon: <Blocks className="size-4" />,
        items: [
          {
            id: "topic-1-1",
            type: "link",
            title: "1.1 Imperative vs Declarative UI",
            href: "/01-foundations/1.1-imperative-vs-declarative-ui",
          },
          {
            id: "topic-1-2",
            type: "link",
            title: "1.2 JSX Rules & Expressions",
            href: "/01-foundations/1.2-jsx-rules-and-expressions",
          },
          {
            id: "topic-1-3",
            type: "link",
            title: "1.3 Components & Composition",
            href: "/01-foundations/1.3-components-and-composition",
          },
          {
            id: "topic-1-4",
            type: "link",
            title: "1.4 Props & Children",
            href: "/01-foundations/1.4-props-and-children",
          },
        ],
      },
      {
        id: "folder-02-interactivity",
        type: "folder",
        title: "০২. Interactivity & State",
        badge: "4",
        icon: <Zap className="size-4" />,
        items: [
          {
            id: "topic-2-1",
            type: "link",
            title: "2.1 Event Handling",
            href: "/02-interactivity-and-state/2.1-event-handling",
          },
          {
            id: "topic-2-2",
            type: "link",
            title: "2.2 useState Deep Dive",
            href: "/02-interactivity-and-state/2.2-use-state-deep-dive",
          },
          {
            id: "topic-2-3",
            type: "link",
            title: "2.3 Conditional Rendering",
            href: "/02-interactivity-and-state/2.3-conditional-rendering",
          },
          {
            id: "topic-2-4",
            type: "link",
            title: "2.4 Lists & Keys (.map)",
            href: "/02-interactivity-and-state/2.4-lists-and-keys",
          },
        ],
      },
      {
        id: "folder-03-forms-effects",
        type: "folder",
        title: "০৩. Forms & Side Effects",
        badge: "4",
        icon: <Sliders className="size-4" />,
        items: [
          {
            id: "topic-3-1",
            type: "link",
            title: "3.1 Forms in React",
            href: "/03-forms-and-side-effects/3.1-forms-in-react",
          },
          {
            id: "topic-3-2",
            type: "link",
            title: "3.2 useEffect Hook",
            href: "/03-forms-and-side-effects/3.2-use-effect-hook",
          },
          {
            id: "topic-3-3",
            type: "link",
            title: "3.3 useRef & DOM Access",
            href: "/03-forms-and-side-effects/3.3-use-ref-and-dom-access",
          },
          {
            id: "topic-3-4",
            type: "link",
            title: "3.4 Custom Hooks",
            href: "/03-forms-and-side-effects/3.4-custom-hooks",
          },
        ],
      },
      {
        id: "folder-04-state-arch",
        type: "folder",
        title: "০৪. State Architecture",
        badge: "3",
        icon: <Boxes className="size-4" />,
        items: [
          {
            id: "topic-4-1",
            type: "link",
            title: "4.1 Lifting State Up",
            href: "/04-state-architecture/4.1-lifting-state-up",
          },
          {
            id: "topic-4-2",
            type: "link",
            title: "4.2 Context API & useContext",
            href: "/04-state-architecture/4.2-context-api-and-use-context",
          },
          {
            id: "topic-4-3",
            type: "link",
            title: "4.3 useReducer Hook",
            href: "/04-state-architecture/4.3-use-reducer-hook",
          },
        ],
      },
      {
        id: "folder-05-perf",
        type: "folder",
        title: "০৫. Performance Optimization",
        badge: "3",
        icon: <Gauge className="size-4" />,
        items: [
          {
            id: "topic-5-1",
            type: "link",
            title: "5.1 Re-render Mechanics",
            href: "/05-performance-optimization/5.1-react-re-render-mechanics",
          },
          {
            id: "topic-5-2",
            type: "link",
            title: "5.2 useMemo & useCallback",
            href: "/05-performance-optimization/5.2-use-memo-and-use-callback",
          },
          {
            id: "topic-5-3",
            type: "link",
            title: "5.3 React.memo & Lazy Loading",
            href: "/05-performance-optimization/5.3-react-memo-and-lazy-loading",
          },
        ],
      },
      {
        id: "folder-06-modern",
        type: "folder",
        title: "০৬. React 19 & Next.js Pro",
        badge: "3",
        icon: <Atom className="size-4" />,
        items: [
          {
            id: "topic-6-1",
            type: "link",
            title: "6.1 Server vs Client Components",
            href: "/06-modern-react-19-and-nextjs/6.1-server-vs-client-components",
          },
          {
            id: "topic-6-2",
            type: "link",
            title: "6.2 React 19 New Hooks",
            href: "/06-modern-react-19-and-nextjs/6.2-react-19-new-hooks",
          },
          {
            id: "topic-6-3",
            type: "link",
            title: "6.3 Tailwind & Shadcn Architecture",
            href: "/06-modern-react-19-and-nextjs/6.3-tailwind-and-shadcn-architecture",
          },
        ],
      },
    ],
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <AppShell
              title="React Tutorial"
              titleIcon={<BookOpen className="size-4 text-primary" />}
              footer="Scratch to Pro"
              sections={curriculumSections}
            >
              {children}
            </AppShell>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

