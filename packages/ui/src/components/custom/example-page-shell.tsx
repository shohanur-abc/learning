import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"
import {
  ShowcaseCard,
  type ShowcaseCardProps,
} from "@workspace/ui/components/custom/showcase-card"

/**
 * Configuration descriptor for a single showcase demonstration item.
 */
export interface ShowcaseItem extends Omit<ShowcaseCardProps, "children"> {
  /** Stable identifier for the showcase example. If omitted, falls back to index. */
  readonly id?: string
  /** Component interactive preview element. */
  readonly preview: React.ReactNode
}

/** Props accepted by {@link ExamplePageShell}. */
export interface ExamplePageShellProps {
  /** Page title heading. */
  readonly title: React.ReactNode
  /** Explanatory description below the title. */
  readonly description?: React.ReactNode
  /** Optional controls or badges displayed alongside the header. */
  readonly actions?: React.ReactNode
  /** Optional class name override for the outer wrapper. */
  readonly className?: string
  /** Structured array of showcase items rendered as ShowcaseCards. */
  readonly items?: readonly ShowcaseItem[]
  /** Optional custom showcase page content rendered below or in place of items. */
  readonly children?: React.ReactNode
}

/**
 * Standard page shell layout for component showcases, providing a unified header, spacing,
 * and automatic rendering of ShowcaseCard items.
 *
 * @param props - Title, description, optional actions, items array, and children.
 * @returns The structured showcase page shell view.
 */
export function ExamplePageShell({
  title,
  description,
  actions,
  className,
  items,
  children,
}: ExamplePageShellProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {Boolean(description) && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {Boolean(actions) && <div>{actions}</div>}
      </div>

      {items?.map(({ id, preview, ...cardProps }, index) => (
        <ShowcaseCard key={id ?? index} {...cardProps}>
          {preview}
        </ShowcaseCard>
      ))}

      {children}
    </div>
  )
}
