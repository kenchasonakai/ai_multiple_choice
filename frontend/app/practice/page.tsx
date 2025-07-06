'use client'

import { Header } from "@/components/layout/header"
import Link from "next/link"
import { useExamSessions } from "@/hooks/useExamSessions"
import { useMemo } from "react"

export default function PracticePage() {
  const { sessions: examSessions, loading, error, refetch } = useExamSessions()
  // セッションを期別にグループ化するため、フィルタリングは削除してexamSessionsを直接使用

  // 期別にグループ化
  const periods = useMemo(() => {
    if (!examSessions) return []
    const groupedSessions = examSessions.reduce((acc, session) => {
      const key = session.period
      if (!acc[key]) {
        acc[key] = {
          period: session.period,
          sessions: []
        }
      }
      acc[key].sessions.push(session)
      return acc
    }, {} as Record<string, {
      period: string
      sessions: typeof filteredSessions
    }>)

    return Object.values(groupedSessions)
  }, [examSessions])

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <Header
          subtitle="練習問題"
        />

        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              問題を選択してください
            </h2>
            <p className="text-muted-foreground mb-6">
              年度と科目を選択して練習を開始できます
            </p>


            {loading ? (
              <div className="bg-muted rounded-lg p-8">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground">読み込み中...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-destructive/10 border border-destructive rounded-lg p-6">
                <p className="text-destructive font-semibold mb-2">エラーが発生しました</p>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <button
                  onClick={refetch}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  再試行
                </button>
              </div>
            ) : periods.length === 0 ? (
              <div className="bg-muted rounded-lg p-6">
                <p className="text-muted-foreground">
                  利用可能な練習問題がありません
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {periods.map((period) => (
                  <div key={period.period} className="border border-border rounded-lg p-6 hover:bg-accent transition-colors">
                    <h3 className="text-lg font-semibold mb-2">
                      {period.period}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {period.sessions.map((s) => s.subject_name).join('・')}
                    </p>
                    <div className="space-y-2">
                      {period.sessions.map((session) => (
                        <Link
                          key={session.slug}
                          href={`/practice/${session.slug}`}
                          className="block text-sm text-primary hover:underline"
                        >
                          {session.period} {session.subject_name} ({session.question_count}問)
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}