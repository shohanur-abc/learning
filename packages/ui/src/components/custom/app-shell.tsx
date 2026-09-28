"use client"

import * as React from "react"
import { Compass } from "lucide-react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"

import {
  createSidebar,
  defaultSidebarPrimitives,
  Sidebar as DefaultSidebar,
  type SidebarDefaultProps,
  type SidebarItem,
  type SidebarSection,
} from "@workspace/ui/components/custom/sidebar"
import { ThemeToggle } from "@workspace/ui/components/custom/theme-toggle"
import { cn } from "@workspace/ui/lib/utils"

export interface AppShellProps {
  /** Sidebar navigation sections or topic tree. */
  readonly sections: readonly SidebarSection[]
  /** App/Tutorial title in sidebar header, e.g. "React Tutorial" or "NestJS Mastery". */
  readonly title?: React.ReactNode
  /** Icon displayed next to title in sidebar header. */
  readonly titleIcon?: React.ReactNode
  /** Subtitle or footer text in sidebar, e.g. "Scratch to Pro". */
  readonly footer?: React.ReactNode
  /** Optional override for current active route pathname. */
  readonly pathname?: string
  /** Custom breadcrumb node or text. If omitted, auto-generated from pathname. */
  readonly breadcrumb?: React.ReactNode
  /** Custom header actions rendered on the right side of the top bar. Defaults to <ThemeToggle />. */
  readonly headerActions?: React.ReactNode
  /** Optional overrides for the Sidebar component. */
  readonly sidebarProps?: Partial<SidebarDefaultProps>
  /** Custom Link component for sidebar navigation (e.g. Next.js Link, Remix, or React Router). */
  readonly linkComponent?: React.ComponentType<any>
  /** Max width class for the main content container. Defaults to "max-w-5xl". */
  readonly maxWidth?: string
  /** Content rendered inside the main viewport. */
  readonly children: React.ReactNode
  /** Optional class name override for root wrapper. */
  readonly className?: string
}

function defaultFormatBreadcrumb(pathname: string): string {
  if (!pathname || pathname === "/") return "Overview"
  const segments = pathname.split("/").filter(Boolean)
  return segments
    .map((seg) =>
      seg
        .replace(/^\d+(\.\d+)?-/, "")
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    )
    .join(" / ")
}

function markActiveItem(item: SidebarItem, currentPath: string): SidebarItem {
  if (item.type === "folder") {
    return {
      ...item,
      items: item.items.map((sub) => markActiveItem(sub, currentPath)),
    }
  }
  if (item.type === "link") {
    return {
      ...item,
      active: item.href === currentPath,
    }
  }
  return item
}

/**
 * Universal, reusable docked-sidebar application shell layout for documentation,
 * tutorials, and dashboard apps (e.g. React tutorial, NestJS tutorial, Showcase, etc.).
 */
export function AppShell({
  sections,
  title = "Tutorial",
  titleIcon,
  footer = "Scratch to Pro",
  pathname: customPathname,
  breadcrumb,
  headerActions,
  sidebarProps,
  linkComponent,
  maxWidth = "max-w-5xl",
  children,
  className,
}: AppShellProps) {
  const routerPathname = usePathname()
  const activePathname = customPathname ?? routerPathname ?? ""

  // Bind Link component (defaults to NextLink from next/link for fast client-side SPA navigation)
  const SidebarComponent = React.useMemo(() => {
    const ResolvedLink = linkComponent ?? NextLink
    const BoundLink = (props: React.ComponentProps<"a">) => {
      const Comp = ResolvedLink as React.ElementType
      return <Comp {...props} href={props.href ?? ""} />
    }
    return createSidebar(defaultSidebarPrimitives, { Link: BoundLink })
  }, [linkComponent])

  // Recursively mark active item based on current pathname
  const activeSections = React.useMemo(() => {
    return sections.map((sec) => ({
      ...sec,
      items: sec.items.map((item) => markActiveItem(item, activePathname)),
    }))
  }, [sections, activePathname])

  // Format breadcrumb text
  const renderedBreadcrumb = React.useMemo(() => {
    if (breadcrumb !== undefined) return breadcrumb
    return defaultFormatBreadcrumb(activePathname)
  }, [breadcrumb, activePathname])

  return (
    <div className={cn("flex h-screen w-full overflow-hidden bg-background", className)}>
      {/* Docked Sidebar with Collapsible Topic Groups */}
      <SidebarComponent
        sections={activeSections}
        header={title}
        headerIcon={titleIcon}
        footer={footer}
        defaultOpenLevel={sidebarProps?.defaultOpenLevel ?? 0}
        expandActiveAncestors={sidebarProps?.expandActiveAncestors ?? true}
        scrollActiveIntoView={sidebarProps?.scrollActiveIntoView ?? true}
        mode={sidebarProps?.mode ?? "responsive"}
        variant={sidebarProps?.variant ?? "sidebar"}
        className={cn("h-full border-r", sidebarProps?.className)}
        accordion={sidebarProps?.accordion ?? true}
        {...sidebarProps}
      />

      {/* Main Viewport */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar Header */}
        <header className="sticky top-0 z-10 flex h-13 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Compass className="size-3.5 text-primary" />
            <span className="font-medium text-foreground">{renderedBreadcrumb}</span>
          </div>

          <div className="flex items-center gap-2">
            {headerActions ?? <ThemeToggle />}
          </div>
        </header>

        {/* Scrollable Content Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className={cn("mx-auto", maxWidth)}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
