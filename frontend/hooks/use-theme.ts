"use client"

import { useState, useEffect, useRef } from "react"

type Theme = "light" | "dark" | "system"

export function useTheme() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>("system")
  const isInitialized = useRef(false)

  useEffect(() => {
    setMounted(true)
    if (!isInitialized.current) {
      // 初回のみlocalStorageから取得
      const stored = localStorage.getItem("theme") as Theme
      if (stored) {
        setTheme(stored)
      }
      isInitialized.current = true
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement

    // 以前のテーマクラスを削除
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    // ローカルストレージに保存（初期化時以外）
    if (isInitialized.current) {
      localStorage.setItem("theme", theme)
    }
  }, [theme, mounted])

  return { theme, setTheme, mounted }
}