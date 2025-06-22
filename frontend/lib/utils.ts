import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseCodeBlocks(text: string) {
  const parts = text.split(/(```[\s\S]*?```)/g)
  
  return parts.map((part, index) => {
    if (part.startsWith('```')) {
      const lines = part.split('\n')
      const firstLine = lines[0]
      const language = firstLine.replace('```', '').trim()
      const code = lines.slice(1, -1).join('\n')
      
      return {
        type: 'code',
        content: code,
        language,
        key: index
      }
    }
    return {
      type: 'text',
      content: part,
      key: index
    }
  })
}