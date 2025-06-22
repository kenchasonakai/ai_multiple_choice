"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme()

  // SSRハイドレーション対策：マウント前は常にsystemとして表示
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        title="現在: システム"
        disabled
      >
        <Monitor className="h-4 w-4" />
        <span className="hidden sm:inline">システム</span>
      </Button>
    )
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      case "system":
        return <Monitor className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "ライトモード"
      case "dark":
        return "ダークモード"
      case "system":
        return "システム"
      default:
        return "システム"
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="gap-2"
      title={`現在: ${getLabel()}`}
    >
      {getIcon()}
      <span className="hidden sm:inline">{getLabel()}</span>
    </Button>
  )
}