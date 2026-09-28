"use client"

import * as React from "react"
import {
  ChevronDown,
  FileCode,
  Folder,
  MoreHorizontal,
  PanelLeft,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Input } from "@workspace/ui/components/input"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { Separator } from "@workspace/ui/components/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet"
import { Skeleton } from "@workspace/ui/components/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { useIsMobile } from "@workspace/ui/hooks/use-mobile"
import { cn } from "@workspace/ui/lib/utils"

/* ==========================================================================
   Types
   ========================================================================== */

export type SidebarSelectEvent = Readonly<{
  defaultPrevented: boolean
  preventDefault: () => void
}>

export type SidebarActionItem = Readonly<{
  id: string
  title: React.ReactNode
  icon?: React.ReactNode
  badge?: React.ReactNode
  disabled?: boolean
  href?: string
  onSelect?: (event: React.MouseEvent<HTMLElement>) => void
}>

export type SidebarItemBase = Readonly<{
  id: string
  title: React.ReactNode
  icon?: React.ReactNode
  badge?: React.ReactNode
  accessibleLabel?: string
  tooltip?: React.ReactNode
  active?: boolean
  disabled?: boolean
  hidden?: boolean
  actions?: readonly SidebarActionItem[]
}>

export type SidebarItem =
  | (SidebarItemBase &
    Readonly<{
      type: "link"
      href: string
      target?: string
      rel?: string
      onSelect?: (event: React.MouseEvent<HTMLElement>) => void
      items?: never
    }>)
  | (SidebarItemBase &
    Readonly<{
      type: "action"
      onSelect: (event: React.MouseEvent<HTMLElement>) => void
      href?: never
      items?: never
    }>)
  | (SidebarItemBase &
    Readonly<{
      type: "folder"
      items: readonly SidebarItem[]
      collapsible?: boolean
      defaultOpen?: boolean
      href?: never
    }>)
  | Readonly<{ type: "separator"; id: string; hidden?: boolean }>

export type SidebarSection = Readonly<{
  id: string
  title?: React.ReactNode
  hidden?: boolean
  items: readonly SidebarItem[]
  actions?: readonly SidebarActionItem[]
}>

export type SidebarLabels = Readonly<{
  navigation: string
  open: string
  close: string
  expand: string
  collapse: string
  actions: string
}>

export type SidebarClassNames = Readonly<
  Partial<
    Record<
      | "root"
      | "header"
      | "footer"
      | "section"
      | "sectionTitle"
      | "menu"
      | "item"
      | "control"
      | "icon"
      | "title"
      | "badge"
      | "subMenu"
      | "content"
      | "toggle"
      | "actions",
      string
    >
  >
>

export type SidebarBehaviorProps = Readonly<{
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  openMobile?: boolean
  defaultOpenMobile?: boolean
  onOpenMobileChange?: (open: boolean) => void
  expandedIds?: readonly string[]
  defaultExpandedIds?: readonly string[]
  onExpandedIdsChange?: (ids: readonly string[]) => void
  defaultOpenLevel?: number
  expandActiveAncestors?: boolean
  scrollActiveIntoView?: boolean
  navigationKey?: string
  closeOnNavigate?: boolean
  collapsible?: "icon" | "offcanvas" | "none"
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  hoverExpand?: boolean
  hoverDelay?: number
  keyboardShortcut?:
  | false
  | Readonly<{ key: string; modifier?: "meta" | "ctrl" | "either" }>
  persistence?: Readonly<{ key: string; storage?: "local" | "session" }>
  mobileMediaQuery?: string
  mode?: "responsive" | "desktop" | "mobile"
  width?: string
  collapsedWidth?: string
  mobileWidth?: string
  /** Whether expanding one folder automatically collapses others (accordion mode). Defaults to true. */
  accordion?: boolean
}>

export type SidebarPrimitives = Readonly<{
  Root: React.ComponentType<React.ComponentProps<"aside">>
  Header: React.ComponentType<React.ComponentProps<"div">>
  Footer: React.ComponentType<React.ComponentProps<"div">>
  Section: React.ComponentType<React.ComponentProps<"section">>
  Menu: React.ComponentType<React.ComponentProps<"ul">>
  Item: React.ComponentType<React.ComponentProps<"li">>
  Link: React.ComponentType<React.ComponentProps<"a">>
  ToggleIcon: React.ComponentType<{ className?: string }>
  FolderIcon: React.ComponentType<{ className?: string }>
  ActionsIcon: React.ComponentType<{ className?: string }>
  Button: typeof Button
  Input: typeof Input
  Separator: typeof Separator
  Skeleton: typeof Skeleton
  ScrollArea: typeof ScrollArea
  Tooltip: typeof Tooltip
  Sheet: typeof Sheet
  Collapsible: typeof Collapsible
  DropdownMenu: typeof DropdownMenu
}>

type FolderId<TItem> = TItem extends {
  type: "folder"
  id: infer TId extends string
  items: infer TItems extends readonly unknown[]
}
  ? string extends TId
  ? string
  : TId | FolderId<TItems[number]>
  : never

export type SidebarFolderId<
  TSections extends readonly { items: readonly unknown[] }[],
> = FolderId<TSections[number]["items"][number]>

export type SidebarProps<
  TSections extends readonly SidebarSection[] = readonly SidebarSection[],
> = Omit<React.ComponentProps<"aside">, "children" | "title"> &
  Omit<
    SidebarBehaviorProps,
    "expandedIds" | "defaultExpandedIds" | "onExpandedIdsChange"
  > &
  Readonly<{
    sections: TSections
    expandedIds?: readonly string[]
    defaultExpandedIds?: readonly string[]
    onExpandedIdsChange?: (ids: readonly string[]) => void
    labels?: Partial<SidebarLabels>
    header?: React.ReactNode
    headerIcon?: React.ReactNode
    headerActions?: readonly SidebarActionItem[]
    footer?: React.ReactNode
    footerActions?: readonly SidebarActionItem[]
    input?: React.ComponentProps<typeof Input>
    loading?: boolean
    skeletonCount?: number
    emptyContent?: React.ReactNode
    showToggle?: boolean
    classNames?: SidebarClassNames
    LinkComponent?: React.ComponentType<React.ComponentProps<"a">>
  }>

/* ==========================================================================
   Primitives
   ========================================================================== */

export function SidebarRoot({
  className,
  ...props
}: React.ComponentProps<"aside">) {
  return (
    <aside
      {...props}
      data-slot="sidebar"
      className={cn(
        "group/generated-sidebar relative flex h-full min-h-0 shrink-0 flex-col overflow-hidden border-r bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-in-out",
        "data-[side=right]:border-r-0 data-[side=right]:border-l",
        "data-[variant=floating]:rounded-xl data-[variant=floating]:border data-[variant=floating]:shadow-sm data-[variant=floating]:m-2",
        "data-[variant=inset]:rounded-xl data-[variant=inset]:border-0",
        className
      )}
    />
  )
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="sidebar-header"
      className={cn(
        "flex shrink-0 items-center gap-2 p-2 border-b border-sidebar-border/40",
        className
      )}
    />
  )
}

export function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="sidebar-footer"
      className={cn(
        "mt-auto shrink-0 p-2 border-t border-sidebar-border/40",
        className
      )}
    />
  )
}

export function SidebarSectionRoot({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      {...props}
      data-slot="sidebar-section"
      className={cn("space-y-1 p-2", className)}
    />
  )
}

export function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      {...props}
      data-slot="sidebar-menu"
      className={cn("flex min-w-0 flex-col gap-1 list-none p-0 m-0", className)}
    />
  )
}

export function SidebarItemRoot({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      {...props}
      data-slot="sidebar-item"
      className={cn("relative min-w-0 list-none", className)}
    />
  )
}

export function SidebarToggleIcon({ className }: { className?: string }) {
  return <PanelLeft aria-hidden="true" className={cn("size-4", className)} />
}

export function SidebarFolderIcon({ className }: { className?: string }) {
  return (
    <ChevronDown
      aria-hidden="true"
      className={cn("size-3.5 transition-transform duration-200 shrink-0", className)}
    />
  )
}

export function SidebarActionsIcon({ className }: { className?: string }) {
  return (
    <MoreHorizontal aria-hidden="true" className={cn("size-4", className)} />
  )
}

export function NavigationLink(props: React.ComponentProps<"a">) {
  return <a {...props} />
}

export const defaultSidebarPrimitives: SidebarPrimitives = {
  Root: SidebarRoot,
  Header: SidebarHeader,
  Footer: SidebarFooter,
  Section: SidebarSectionRoot,
  Menu: SidebarMenu,
  Item: SidebarItemRoot,
  Link: NavigationLink,
  ToggleIcon: SidebarToggleIcon,
  FolderIcon: SidebarFolderIcon,
  ActionsIcon: SidebarActionsIcon,
  Button,
  Input,
  Separator,
  Skeleton,
  ScrollArea,
  Tooltip,
  Sheet,
  Collapsible,
  DropdownMenu,
}

/* ==========================================================================
   Helper Functions & Hooks
   ========================================================================== */

function hasActiveSidebarItem(item: SidebarItem): boolean {
  if (item.hidden || item.type === "separator") return false
  if (item.active === true) return true
  if (item.type === "folder") {
    return item.items.some(hasActiveSidebarItem)
  }
  return false
}

function initialExpandedSidebarIds(
  items: readonly SidebarItem[],
  level: number,
  expandActive: boolean,
  depth = 1
): string[] {
  return items.flatMap((item) => {
    if (item.hidden || item.type !== "folder") return []
    const open =
      item.collapsible === false ||
      (expandActive && hasActiveSidebarItem(item)) ||
      (item.defaultOpen ?? depth <= level)
    return [
      ...(open ? [item.id] : []),
      ...initialExpandedSidebarIds(item.items, level, expandActive, depth + 1),
    ]
  })
}

function activeSidebarAncestorIds(items: readonly SidebarItem[]): string[] {
  return items.flatMap((item) =>
    item.type === "folder" && !item.hidden
      ? [
        ...(hasActiveSidebarItem(item) ? [item.id] : []),
        ...activeSidebarAncestorIds(item.items),
      ]
      : []
  )
}

function areArraysEqual(a: readonly string[], b: readonly string[]): boolean {
  if (a === b) return true
  if (a.length !== b.length) return false
  return a.every((val, idx) => val === b[idx])
}

function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
) {
  const [localValue, setLocalValue] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : localValue
  const currentValueRef = React.useRef(currentValue)
  currentValueRef.current = currentValue
  const onChangeRef = React.useRef(onChange)
  onChangeRef.current = onChange

  const update = React.useCallback(
    (next: React.SetStateAction<T>) => {
      const resolved =
        typeof next === "function"
          ? (next as (prev: T) => T)(currentValueRef.current)
          : next
      if (!isControlled) {
        setLocalValue(resolved)
      }
      onChangeRef.current?.(resolved)
    },
    [isControlled]
  )

  return [currentValue, update] as const
}

const SIDEBAR_STORAGE_EVENT = "workspace:sidebar-storage"

function useSidebarPersistence(
  persistence: SidebarBehaviorProps["persistence"]
) {
  const key = persistence?.key
  const backend = persistence?.storage ?? "local"

  const getSnapshot = React.useCallback(() => {
    if (!key || typeof window === "undefined") return undefined
    try {
      const storage =
        backend === "session" ? window.sessionStorage : window.localStorage
      const stored = storage.getItem(key)
      return stored === "true" ? true : stored === "false" ? false : undefined
    } catch {
      return undefined
    }
  }, [key, backend])

  const subscribe = React.useCallback(
    (notify: () => void) => {
      if (!key || typeof window === "undefined") return () => undefined
      window.addEventListener("storage", notify)
      window.addEventListener(SIDEBAR_STORAGE_EVENT, notify)
      return () => {
        window.removeEventListener("storage", notify)
        window.removeEventListener(SIDEBAR_STORAGE_EVENT, notify)
      }
    },
    [key]
  )

  const preference = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => undefined
  )

  const save = React.useCallback(
    (open: boolean) => {
      if (!key || typeof window === "undefined") return
      try {
        const storage =
          backend === "session" ? window.sessionStorage : window.localStorage
        storage.setItem(key, String(open))
        window.dispatchEvent(new Event(SIDEBAR_STORAGE_EVENT))
      } catch {
        /* storage may be blocked */
      }
    },
    [key, backend]
  )

  return [preference, save] as const
}

/* ==========================================================================
   createSidebar Factory
   ========================================================================== */

const defaultLabels: SidebarLabels = {
  navigation: "Navigation",
  open: "Open sidebar",
  close: "Close sidebar",
  expand: "Expand sidebar",
  collapse: "Collapse sidebar",
  actions: "More actions",
}

export function createSidebar(
  primitives: SidebarPrimitives = defaultSidebarPrimitives,
  overrides?: {
    Link?: React.ComponentType<React.ComponentProps<"a">>
  }
) {
  const Primitives = {
    ...primitives,
    Link: overrides?.Link ?? primitives.Link,
  }

  return function Sidebar<
    const TSections extends readonly SidebarSection[],
  >({
    sections,
    labels: customLabels,
    header,
    headerIcon,
    headerActions,
    footer,
    footerActions,
    input,
    loading = false,
    skeletonCount = 5,
    emptyContent = null,
    showToggle = true,
    classNames,
    open: openProp,
    defaultOpen = true,
    onOpenChange,
    openMobile: openMobileProp,
    defaultOpenMobile = false,
    onOpenMobileChange,
    expandedIds: expandedIdsProp,
    defaultExpandedIds,
    onExpandedIdsChange,
    defaultOpenLevel = 0,
    expandActiveAncestors = true,
    accordion = true,
    scrollActiveIntoView,
    navigationKey,
    closeOnNavigate = true,
    collapsible = "icon",
    side = "left",
    variant = "sidebar",
    hoverExpand = false,
    hoverDelay = 150,
    keyboardShortcut = { key: "b", modifier: "either" },
    persistence,
    mobileMediaQuery,
    mode = "responsive",
    width = "16rem",
    collapsedWidth = "3.5rem",
    mobileWidth = "18rem",
    className,
    style,
    id,
    LinkComponent,
    ...rootProps
  }: SidebarProps<TSections>) {
    const isMobileBreakpoint = useIsMobile()
    const isMobile = mode === "mobile" || (mode === "responsive" && isMobileBreakpoint)

    const labels: SidebarLabels = { ...defaultLabels, ...customLabels }
    const generatedId = React.useId()
    const sidebarId = id ?? generatedId

    const [persistedOpen, saveOpen] = useSidebarPersistence(persistence)
    const [open, setOpen] = useControllableState<boolean>(
      openProp,
      persistedOpen ?? defaultOpen,
      (next) => {
        saveOpen(next)
        onOpenChange?.(next)
      }
    )

    const [openMobile, setOpenMobile] = useControllableState<boolean>(
      openMobileProp,
      defaultOpenMobile,
      onOpenMobileChange
    )

    const allItems = React.useMemo(
      () =>
        sections
          .filter((s) => !s.hidden)
          .flatMap((s) => s.items),
      [sections]
    )

    const initialExpanded = React.useMemo(() => {
      if (defaultExpandedIds) return defaultExpandedIds
      const initial = initialExpandedSidebarIds(
        allItems,
        defaultOpenLevel,
        expandActiveAncestors
      )
      if (accordion) {
        const active = activeSidebarAncestorIds(allItems)
        return active.length > 0 ? active : initial.slice(0, 1)
      }
      return initial
    }, [defaultExpandedIds, allItems, defaultOpenLevel, expandActiveAncestors, accordion])

    const [expandedIds, setExpandedIds] = useControllableState<readonly string[]>(
      expandedIdsProp,
      initialExpanded,
      onExpandedIdsChange
    )

    const [hovered, setHovered] = React.useState(false)
    const [focused, setFocused] = React.useState(false)
    const hoverTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
      undefined
    )
    const viewportRef = React.useRef<HTMLDivElement>(null)

    // Keyboard shortcut handler
    React.useEffect(() => {
      if (!keyboardShortcut) return

      function handleKeyDown(event: KeyboardEvent) {
        if (
          event.defaultPrevented ||
          (event.target instanceof HTMLElement &&
            event.target.closest("input, textarea, select, [contenteditable=true]"))
        ) {
          return
        }

        if (!keyboardShortcut) return
        const modifier = keyboardShortcut.modifier ?? "either"
        const matchesModifier =
          modifier === "meta"
            ? event.metaKey
            : modifier === "ctrl"
              ? event.ctrlKey
              : event.metaKey || event.ctrlKey

        if (
          matchesModifier &&
          event.key.toLowerCase() === keyboardShortcut.key.toLowerCase()
        ) {
          event.preventDefault()
          if (isMobile) {
            setOpenMobile((prev) => !prev)
          } else {
            setOpen((prev) => !prev)
          }
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [keyboardShortcut, isMobile, setOpen, setOpenMobile])

    // Auto-expand active ancestors when navigation changes
    React.useEffect(() => {
      if (!expandActiveAncestors) return
      const activeAncestors = activeSidebarAncestorIds(allItems)
      if (activeAncestors.length > 0) {
        setExpandedIds((prev) => {
          if (accordion) {
            return areArraysEqual(prev, activeAncestors) ? prev : activeAncestors
          }
          const additions = activeAncestors.filter((id) => !prev.includes(id))
          return additions.length > 0 ? [...prev, ...additions] : prev
        })
      }
    }, [accordion, expandActiveAncestors, allItems, navigationKey, setExpandedIds])

    // Auto-scroll active item into view
    React.useEffect(() => {
      if (!scrollActiveIntoView || (!open && !isMobile) || (isMobile && !openMobile)) {
        return
      }
      const frame = requestAnimationFrame(() => {
        const viewport = viewportRef.current
        const activeEl = viewport?.querySelector<HTMLElement>(
          '[aria-current="page"]'
        )
        if (viewport && activeEl) {
          const vBounds = viewport.getBoundingClientRect()
          const aBounds = activeEl.getBoundingClientRect()
          if (aBounds.top < vBounds.top || aBounds.bottom > vBounds.bottom) {
            activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" })
          }
        }
      })
      return () => cancelAnimationFrame(frame)
    }, [scrollActiveIntoView, open, isMobile, openMobile, navigationKey])

    const isTransientExpanded = hoverExpand && !isMobile && (hovered || focused)
    const isExpanded = open || isTransientExpanded || collapsible === "none"
    const isCollapsed = !isMobile && !isExpanded
    const isOffcanvasHidden = isCollapsed && collapsible === "offcanvas"

    function toggleFolder(folderId: string) {
      setExpandedIds((prev) => {
        const isOpen = prev.includes(folderId)
        if (accordion) {
          return isOpen ? [] : [folderId]
        }
        return isOpen
          ? prev.filter((id) => id !== folderId)
          : [...prev, folderId]
      })
    }

    function handleNavigate() {
      if (isMobile && closeOnNavigate) {
        setOpenMobile(false)
      }
    }

    const ActiveLink = LinkComponent ?? Primitives.Link

    // Render an action dropdown
    function renderActionsMenu(
      items?: readonly SidebarActionItem[],
      label = labels.actions
    ) {
      if (!items || items.length === 0) return null
      return (
        <Primitives.DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Primitives.Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="size-6 p-0 text-muted-foreground hover:text-foreground"
                aria-label={label}
              >
                <Primitives.ActionsIcon />
              </Primitives.Button>
            }
          />
          <DropdownMenuContent align="end" side={side === "left" ? "right" : "left"}>
            {items.map((act) => (
              <DropdownMenuItem
                key={act.id}
                disabled={act.disabled}
                onClick={act.onSelect}
              >
                {act.icon && <span className="mr-2 size-4">{act.icon}</span>}
                <span>{act.title}</span>
                {act.badge && <span className="ml-auto text-xs">{act.badge}</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </Primitives.DropdownMenu>
      )
    }

    // Render single sidebar item
    function renderSidebarItem(item: SidebarItem, depth = 0) {
      if (item.hidden) return null

      if (item.type === "separator") {
        return (
          <Primitives.Item key={item.id} className="py-1">
            <Primitives.Separator />
          </Primitives.Item>
        )
      }

      const accessibleText =
        item.accessibleLabel ??
        (typeof item.title === "string" ? item.title : item.id)

      if (item.type === "folder") {
        const isFolderOpen =
          item.collapsible === false || expandedIds.includes(item.id)
        const hasActive = hasActiveSidebarItem(item)

        // Collapsed mode: render as dropdown flyout
        if (isCollapsed) {
          return (
            <Primitives.Item key={item.id} className={classNames?.item}>
              <Primitives.DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Primitives.Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      aria-label={accessibleText}
                      className={cn(
                        "size-9 p-0 justify-center rounded-lg hover:bg-sidebar-accent",
                        hasActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                        classNames?.control
                      )}
                    >
                      {item.icon ? (
                        <span className="size-4 shrink-0">{item.icon}</span>
                      ) : (
                        <Folder className="size-4 shrink-0 text-sidebar-foreground/70" />
                      )}
                    </Primitives.Button>
                  }
                />
                <DropdownMenuContent
                  side={side === "left" ? "right" : "left"}
                  align="start"
                  className="min-w-48"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-semibold text-xs text-muted-foreground">
                      {item.title}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {item.items.map((subItem) => {
                      if (subItem.hidden) return null
                      if (subItem.type === "separator") {
                        return <DropdownMenuSeparator key={subItem.id} />
                      }
                      if (subItem.type === "link") {
                        return (
                          <DropdownMenuItem
                            key={subItem.id}
                            render={
                              <ActiveLink
                                href={subItem.href}
                                onClick={(e) => {
                                  subItem.onSelect?.(e)
                                  handleNavigate()
                                }}
                                className="flex items-center gap-2 cursor-pointer w-full"
                              />
                            }
                          >
                            {subItem.icon && (
                              <span className="size-4 shrink-0">
                                {subItem.icon}
                              </span>
                            )}
                            <span className="truncate">{subItem.title}</span>
                            {subItem.badge && (
                              <span className="ml-auto text-xs opacity-75">
                                {subItem.badge}
                              </span>
                            )}
                          </DropdownMenuItem>
                        )
                      }
                      return (
                        <DropdownMenuItem
                          key={subItem.id}
                          disabled={subItem.disabled}
                          onClick={(e) => {
                            if (subItem.type === "action") {
                              subItem.onSelect(e as unknown as React.MouseEvent<HTMLElement>)
                            }
                            handleNavigate()
                          }}
                        >
                          {subItem.icon && (
                            <span className="mr-2 size-4 shrink-0">
                              {subItem.icon}
                            </span>
                          )}
                          <span>{subItem.title}</span>
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </Primitives.DropdownMenu>
            </Primitives.Item>
          )
        }

        // Expanded mode: collapsible disclosure
        return (
          <Primitives.Item key={item.id} className={classNames?.item}>
            <Primitives.Collapsible open={isFolderOpen}>
              <div className="flex items-center gap-1 group/folder">
                <button
                  type="button"
                  onClick={() => toggleFolder(item.id)}
                  aria-label={accessibleText}
                  aria-expanded={isFolderOpen}
                  disabled={item.disabled}
                  className={cn(
                    "group/button inline-flex shrink-0 items-center justify-start rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50",
                    "w-full gap-2 px-2.5 h-8 font-normal transition-colors",
                    hasActive
                      ? "font-medium text-foreground bg-sidebar-accent/50"
                      : "text-sidebar-foreground/75 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground",
                    classNames?.control
                  )}
                >
                  {item.icon && (
                    <span className="size-4 shrink-0 text-sidebar-foreground/70">
                      {item.icon}
                    </span>
                  )}
                  <span className="flex-1 text-left truncate text-xs">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span
                      className={cn(
                        "inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-sidebar-accent text-sidebar-accent-foreground",
                        classNames?.badge
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.collapsible !== false && (
                    <Primitives.FolderIcon
                      className={cn(
                        "size-3.5 transition-transform duration-200 text-muted-foreground",
                        !isFolderOpen && "-rotate-90"
                      )}
                    />
                  )}
                </button>
                {renderActionsMenu(item.actions)}
              </div>
              <CollapsibleContent>
                <ul
                  data-slot="sidebar-sub-menu"
                  className={cn(
                    "ml-3.5 mt-1 space-y-1 border-l border-sidebar-border/60 pl-2 list-none p-0 m-0",
                    classNames?.subMenu
                  )}
                >
                  {item.items.map((subItem) =>
                    renderSidebarItem(subItem, depth + 1)
                  )}
                </ul>
              </CollapsibleContent>
            </Primitives.Collapsible>
          </Primitives.Item>
        )
      }

      // Link or Action item
      const itemContent = (
        <>
          {item.icon ? (
            <span className="size-4 shrink-0">{item.icon}</span>
          ) : isCollapsed ? (
            <FileCode className="size-4 shrink-0 text-sidebar-foreground/70" />
          ) : null}
          {!isCollapsed && (
            <span className="flex-1 truncate text-left text-xs font-normal">
              {item.title}
            </span>
          )}
          {!isCollapsed && item.badge && (
            <span
              className={cn(
                "inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-sidebar-accent text-sidebar-accent-foreground",
                classNames?.badge
              )}
            >
              {item.badge}
            </span>
          )}
        </>
      )

      const buttonClasses = cn(
        "flex items-center gap-2 rounded-lg text-xs transition-colors outline-none",
        isCollapsed
          ? "size-9 justify-center p-0"
          : "w-full justify-start px-2.5 h-8",
        item.active
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
        item.disabled && "pointer-events-none opacity-50",
        classNames?.control
      )

      let controlNode: React.ReactNode

      if (item.type === "link") {
        controlNode = (
          <ActiveLink
            href={item.href}
            target={item.target}
            rel={item.rel}
            aria-label={accessibleText}
            aria-current={item.active ? "page" : undefined}
            onClick={(e) => {
              item.onSelect?.(e)
              if (!e.defaultPrevented) {
                handleNavigate()
              }
            }}
            className={buttonClasses}
          >
            {itemContent}
          </ActiveLink>
        )
      } else {
        controlNode = (
          <Primitives.Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={item.disabled}
            aria-label={accessibleText}
            aria-current={item.active ? "page" : undefined}
            onClick={(e) => {
              item.onSelect(e)
              handleNavigate()
            }}
            className={buttonClasses}
          >
            {itemContent}
          </Primitives.Button>
        )
      }

      // If collapsed, wrap control in tooltip
      if (isCollapsed) {
        controlNode = (
          <Primitives.Tooltip>
            <TooltipTrigger render={controlNode as React.ReactElement} />
            <TooltipContent side={side === "left" ? "right" : "left"}>
              {item.tooltip ?? accessibleText}
            </TooltipContent>
          </Primitives.Tooltip>
        )
      }

      return (
        <Primitives.Item key={item.id} className={classNames?.item}>
          <div className="flex items-center gap-1 group/item">
            <div className="flex-1 min-w-0">{controlNode}</div>
            {!isCollapsed && renderActionsMenu(item.actions)}
          </div>
        </Primitives.Item>
      )
    }

    // Toggle button element
    const toggleButton =
      showToggle && (isMobile || collapsible !== "none") ? (
        <Primitives.Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={
            isMobile
              ? labels.close
              : isExpanded
                ? labels.collapse
                : labels.expand
          }
          onClick={() => {
            if (isMobile) {
              setOpenMobile((prev) => !prev)
            } else {
              setOpen((prev) => !prev)
            }
          }}
          className={cn("size-7 text-muted-foreground hover:text-foreground", classNames?.toggle)}
        >
          <Primitives.ToggleIcon />
        </Primitives.Button>
      ) : null

    // Main surface content
    const sidebarSurface = (
      <Primitives.Root
        {...rootProps}
        id={sidebarId}
        data-state={isCollapsed ? "collapsed" : "expanded"}
        data-side={side}
        data-variant={variant}
        data-mobile={isMobile}
        className={cn(classNames?.root, className)}
        style={{
          width: isMobile
            ? "100%"
            : isOffcanvasHidden
              ? 0
              : isCollapsed
                ? collapsedWidth
                : width,
          ...style,
        }}
        onPointerEnter={(e) => {
          rootProps.onPointerEnter?.(e)
          if (!hoverExpand || isMobile || e.pointerType === "touch") return
          clearTimeout(hoverTimer.current)
          hoverTimer.current = setTimeout(
            () => setHovered(true),
            Math.max(0, hoverDelay)
          )
        }}
        onPointerLeave={(e) => {
          rootProps.onPointerLeave?.(e)
          if (!hoverExpand || isMobile) return
          clearTimeout(hoverTimer.current)
          hoverTimer.current = setTimeout(
            () => setHovered(false),
            Math.max(0, hoverDelay)
          )
        }}
        onFocus={(e) => {
          rootProps.onFocus?.(e)
          if (hoverExpand && !isMobile) setFocused(true)
        }}
        onBlur={(e) => {
          rootProps.onBlur?.(e)
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setFocused(false)
          }
        }}
      >
        {/* Header */}
        {(header != null || headerIcon != null || showToggle) && (
          <Primitives.Header
            className={cn(
              "h-12",
              isCollapsed && "justify-center px-1",
              classNames?.header
            )}
          >
            {!isCollapsed && (
              <>
                {headerIcon && (
                  <span className={cn("size-5 shrink-0 flex items-center justify-center", classNames?.icon)}>
                    {headerIcon}
                  </span>
                )}
                {header && (
                  <div className={cn("flex-1 min-w-0 font-semibold text-sm truncate", classNames?.title)}>
                    {header}
                  </div>
                )}
                {renderActionsMenu(headerActions)}
              </>
            )}
            {toggleButton}
          </Primitives.Header>
        )}

        {/* Input / Search */}
        {input && !isCollapsed && (
          <div className="px-2 pb-2">
            <Primitives.Input {...input} className="h-8 text-xs" />
          </div>
        )}

        {/* Navigation Content */}
        <Primitives.ScrollArea
          className={cn("flex-1 min-h-0", classNames?.content)}
        >
          <div ref={viewportRef} className="p-2 space-y-4">
            {loading ? (
              <div className="space-y-2 p-2">
                {Array.from({ length: Math.max(0, skeletonCount) }, (_, i) => (
                  <Primitives.Skeleton
                    key={i}
                    className="h-8 w-full rounded-lg"
                  />
                ))}
              </div>
            ) : sections.length > 0 ? (
              sections
                .filter((s) => !s.hidden)
                .map((sec) => (
                  <Primitives.Section
                    key={sec.id}
                    className={cn("space-y-1 p-0", classNames?.section)}
                  >
                    {!isCollapsed && (sec.title != null || sec.actions?.length) && (
                      <div className="flex items-center justify-between px-2 py-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                        {sec.title && (
                          <span
                            className={cn("truncate", classNames?.sectionTitle)}
                          >
                            {sec.title}
                          </span>
                        )}
                        {renderActionsMenu(sec.actions)}
                      </div>
                    )}
                    <Primitives.Menu className={classNames?.menu}>
                      {sec.items.map((item) => renderSidebarItem(item))}
                    </Primitives.Menu>
                  </Primitives.Section>
                ))
            ) : (
              emptyContent
            )}
          </div>
        </Primitives.ScrollArea>

        {/* Footer */}
        {(footer != null || footerActions?.length) && (
          <Primitives.Footer
            className={cn(
              isCollapsed && "justify-center px-1",
              classNames?.footer
            )}
          >
            <div className="flex items-center gap-2 w-full">
              {!isCollapsed && footer && (
                <div className="flex-1 min-w-0 text-xs text-muted-foreground truncate">
                  {footer}
                </div>
              )}
              {renderActionsMenu(footerActions)}
            </div>
          </Primitives.Footer>
        )}
      </Primitives.Root>
    )

    // Mobile viewport: wrap in Sheet drawer
    if (isMobile) {
      return (
        <>
          {showToggle && (
            <Primitives.Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label={labels.open}
              aria-expanded={openMobile}
              onClick={() => setOpenMobile(true)}
              className="m-2"
            >
              <Primitives.ToggleIcon />
            </Primitives.Button>
          )}
          <Primitives.Sheet open={openMobile} onOpenChange={setOpenMobile}>
            <SheetContent
              side={side}
              className="p-0 gap-0 w-(--mobile-sidebar-width,18rem) max-w-[85vw]"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>{labels.navigation}</SheetTitle>
              </SheetHeader>
              {sidebarSurface}
            </SheetContent>
          </Primitives.Sheet>
        </>
      )
    }

    // Offcanvas hidden toggle button
    return (
      <div className="relative flex h-full shrink-0">
        {isOffcanvasHidden && showToggle && (
          <div className="absolute top-2 left-2 z-20">
            <Primitives.Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label={labels.open}
              onClick={() => setOpen(true)}
            >
              <Primitives.ToggleIcon />
            </Primitives.Button>
          </div>
        )}
        {sidebarSurface}
      </div>
    )
  }
}

/** Ready-to-use Sidebar bound to workspace presentation. */
export const Sidebar = createSidebar(defaultSidebarPrimitives)

/** Properties accepted by the default Sidebar component. */
export type SidebarDefaultProps = React.ComponentProps<typeof Sidebar>
