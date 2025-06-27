"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface AutoResizeTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number
  maxRows?: number
}

const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
  ({ className, minRows = 3, maxRows = 10, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const combinedRef = React.useMemo(() => {
      if (typeof ref === 'function') {
        return (node: HTMLTextAreaElement) => {
          textareaRef.current = node
          ref(node)
        }
      } else if (ref) {
        return (node: HTMLTextAreaElement) => {
          textareaRef.current = node
          ref.current = node
        }
      } else {
        return textareaRef
      }
    }, [ref])

    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current
      if (!textarea) return

      // リセット
      textarea.style.height = 'auto'
      
      // 行の高さを計算
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight)
      const minHeight = lineHeight * minRows
      const maxHeight = lineHeight * maxRows
      
      // 新しい高さを計算
      const scrollHeight = textarea.scrollHeight
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight)
      
      textarea.style.height = `${newHeight}px`
    }, [minRows, maxRows])

    React.useEffect(() => {
      adjustHeight()
    }, [props.value, adjustHeight])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      adjustHeight()
      props.onChange?.(e)
    }

    return (
      <textarea
        className={cn(
          "flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className
        )}
        ref={combinedRef}
        {...props}
        onChange={handleChange}
        style={{
          minHeight: `${20 * minRows}px`,
          maxHeight: `${20 * maxRows}px`,
          overflow: maxRows && textareaRef.current && textareaRef.current.scrollHeight > 20 * maxRows ? 'auto' : 'hidden',
          ...props.style
        }}
      />
    )
  }
)
AutoResizeTextarea.displayName = "AutoResizeTextarea"

export { AutoResizeTextarea }