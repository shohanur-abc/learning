"use client"

import { Check, ChevronDown, Code2, Copy, ExternalLink, Eye, FileCode } from "lucide-react"
import { Highlight, themes } from "prism-react-renderer"
import * as React from "react"

import { Button, buttonVariants } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

/** Resolves an editor URL (defaulting to vscode:// protocol) for a file path. */
function resolveEditorUrl(filePath: string, customUrl?: string): string {
  if (customUrl) return customUrl
  if (
    filePath.startsWith("vscode://") ||
    filePath.startsWith("cursor://") ||
    filePath.startsWith("http://") ||
    filePath.startsWith("https://")
  ) {
    return filePath
  }
  if (filePath.startsWith("/")) {
    return `vscode://file${filePath}`
  }
  const root = "/run/media/shakib/Code/WebDev/practice/learning"
  const clean = filePath.replace(/^\.?\//, "")
  return `vscode://file${root}/${clean}`
}

/** Extracts the basename from a file path. */
function getFileName(filePath: string): string {
  const parts = filePath.split("/").filter(Boolean)
  return parts[parts.length - 1] ?? filePath
}

/** Props accepted by {@link ShowcaseCard}. */
export interface ShowcaseCardProps extends Omit<
  React.ComponentProps<typeof Card>,
  "title"
> {
  /** Section heading for the showcase example. */
  readonly title: React.ReactNode
  /** Explanatory description of the demonstration. */
  readonly description?: React.ReactNode
  /** Optional badge or tag displayed alongside the title. */
  readonly badge?: React.ReactNode
  /** Relative or absolute file path to the corresponding source file (e.g. apps/react/app/.../example.tsx). */
  readonly filePath?: string
  /** Custom editor URL scheme override (e.g. vscode://file/... or cursor://file/...). */
  readonly fileUrl?: string
  /** Optional interactive controls displayed above the component preview. */
  readonly controls?: React.ReactNode
  /** Optional code preview string displayed in an expandable tab. */
  readonly code?: string
  /** Optional programming language for syntax highlighting (e.g. 'tsx', 'typescript', 'bash'). Defaults to 'tsx'. */
  readonly language?: string
  /** Optional learning notes, comparison grids, or educational components displayed below the demonstration. */
  readonly learningNotes?: React.ReactNode
  /** Alias for learningNotes. */
  readonly notes?: React.ReactNode
  /** Whether the learning notes are initially expanded. Defaults to false. */
  readonly defaultShowNotes?: boolean
  /** Component interactive preview content. */
  readonly children: React.ReactNode
}

/**
 * Container card for rendering component examples with optional controls and code preview.
 *
 * @param props - Card heading, description, controls, code preview, and children.
 * @returns The structured showcase card view.
 */
export function ShowcaseCard({
  title,
  description,
  badge,
  filePath,
  fileUrl,
  controls,
  code,
  language = "tsx",
  learningNotes,
  notes,
  defaultShowNotes = false,
  children,
  className,
  ...props
}: ShowcaseCardProps) {
  const [viewMode, setViewMode] = React.useState<"preview" | "code">("preview")
  const [copied, setCopied] = React.useState(false)
  const [showNotes, setShowNotes] = React.useState(defaultShowNotes)

  const copyToClipboard = React.useCallback(() => {
    if (!code) return
    navigator.clipboard.writeText(code)
    setCopied(true)
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [code])

  const fileName = filePath ? getFileName(filePath) : undefined
  const editorUrl = filePath ? resolveEditorUrl(filePath, fileUrl) : undefined

  return (
    <Card className={cn("overflow-hidden bg-card/20 py-0", className)} {...props}>
      <CardHeader className="border-b bg-muted/20 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {Boolean(badge) && <div>{badge}</div>}
        </div>
        {Boolean(description) && (
          <CardDescription className="text-xs">{description}</CardDescription>
        )}
        <CardAction className="flex items-center gap-2">
          {Boolean(editorUrl) && (
            <a
              href={editorUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`Open ${fileName} in editor (vscode://)`}
              className={cn(
                buttonVariants({ variant: "outline", size: "xs" }),
                "h-6 gap-1 px-2 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              )}
            >
              <FileCode className="size-3 text-primary" />
              <span className="max-w-[120px] truncate sm:max-w-[190px]">
                {fileName}
              </span>
              <ExternalLink className="size-2.5 opacity-60" />
            </a>
          )}
          {Boolean(code) && (
            <div className="flex items-center rounded-lg border bg-background p-0.5 shadow-xs">
              <Button
                type="button"
                variant={viewMode === "preview" ? "secondary" : "ghost"}
                size="xs"
                className="h-6 gap-1 px-2 text-xs"
                onClick={() => setViewMode("preview")}
              >
                <Eye className="size-3.5" />
                Preview
              </Button>
              <Button
                type="button"
                variant={viewMode === "code" ? "secondary" : "ghost"}
                size="xs"
                className="h-6 gap-1 px-2 text-xs"
                onClick={() => setViewMode("code")}
              >
                <Code2 className="size-3.5" />
                Code
              </Button>
            </div>
          )}
        </CardAction>
      </CardHeader>

      {Boolean(controls) && (
        <div className="flex flex-wrap items-center gap-3 border-b bg-muted/10 px-6 py-3 text-xs">
          {controls}
        </div>
      )}

      <CardContent className="p-6 space-y-4">
        {viewMode === "preview" ? (
          <div className="min-w-0 border-dashed border-3 p-3 rounded-lg">
            {children}
          </div>
        ) : code ? (
          <div className="relative rounded-xl overflow-hidden border border-border/70 bg-[#1e1e1e] dark:bg-[#121212] shadow-sm">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5 text-[11px] text-zinc-400 font-mono">
              <div className="flex items-center gap-2 min-w-0">
                <span className="uppercase font-semibold tracking-wider text-[10px] text-zinc-500 shrink-0">
                  {language}
                </span>
                {Boolean(editorUrl) && (
                  <>
                    <span className="text-zinc-600 shrink-0">•</span>
                    <a
                      href={editorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors truncate underline-offset-2 hover:underline"
                      title={`Open in editor: ${filePath}`}
                    >
                      <FileCode className="size-3 text-primary shrink-0" />
                      <span className="truncate">{filePath}</span>
                      <ExternalLink className="size-2.5 opacity-60 shrink-0" />
                    </a>
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer text-xs shrink-0"
                title="Copy code"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-sans">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span className="font-sans">Copy</span>
                  </>
                )}
              </button>
            </div>

            <Highlight
              theme={themes.vsDark}
              code={code.trim()}
              language={language}
            >
              {({ className: highlightClass, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  style={{ ...style, backgroundColor: "transparent" }}
                  className={cn(
                    "max-h-[460px] overflow-auto p-4 font-mono text-xs leading-relaxed",
                    highlightClass
                  )}
                >
                  <code>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })} className="table-row">
                        <span className="table-cell select-none pr-4 text-right text-zinc-600 text-[11px] w-8">
                          {i + 1}
                        </span>
                        <span className="table-cell">
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              )}
            </Highlight>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground italic">No code available.</div>
        )}

        {Boolean(learningNotes ?? notes) && (
          <div className="border-t border-border/60 pt-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowNotes((prev) => !prev)}
              className="h-8 gap-2 px-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              aria-expanded={showNotes}
            >
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-200",
                  showNotes && "rotate-180"
                )}
              />
              <span>{showNotes ? "Show less" : "Show more"}</span>
              <span className="text-[11px] text-muted-foreground/80 font-normal">
                {showNotes ? "(Hide learning notes)" : "(Learning notes & explanations)"}
              </span>
            </Button>

            {showNotes && (
              <div className="pt-3 animate-in fade-in-50 duration-200">
                {learningNotes ?? notes}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
