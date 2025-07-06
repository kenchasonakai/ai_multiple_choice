'use client'

import { useState, useEffect, useCallback } from 'react'
import { fetchExamSessions } from '@/services/api/examSessions'

// API一覧のリターン型
type ExamSession = Awaited<ReturnType<typeof fetchExamSessions>>[0]

interface UseExamSessionsReturn {
  sessions: ExamSession[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useExamSessions(): UseExamSessionsReturn {
  const [sessions, setSessions] = useState<ExamSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchExamSessions()
      setSessions(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '試験セッションの取得に失敗しました'
      setError(errorMessage)
      console.error('試験セッション取得エラー:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // 初回マウント時にデータを取得
  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  return {
    sessions,
    loading,
    error,
    refetch
  }
}