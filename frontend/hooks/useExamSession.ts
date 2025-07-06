'use client'

import { useState, useEffect, useCallback } from 'react'
import { fetchExamSession } from '@/services/api/examSessions'
import { ExamSession } from '@/types/exam'

interface UseExamSessionReturn {
  examSession: ExamSession | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useExamSession(slug: string): UseExamSessionReturn {
  const [examSession, setExamSession] = useState<ExamSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!slug) return

    try {
      setLoading(true)
      setError(null)
      const data = await fetchExamSession(slug)
      setExamSession(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '試験セッションの取得に失敗しました'
      setError(errorMessage)
      console.error('試験セッション取得エラー:', err)
    } finally {
      setLoading(false)
    }
  }, [slug])

  // slugが変更された時やマウント時にデータを取得
  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  return {
    examSession,
    loading,
    error,
    refetch
  }
}