'use client'

import { Header } from "@/components/layout/header"
import Link from "next/link"
import { useExamSessions } from "@/hooks/useExamSessions"
import { useMemo, useState } from "react"

export default function PracticePage() {
  const { sessions: examSessions, loading, error, refetch } = useExamSessions()
  const [selectedYear, setSelectedYear] = useState<string>('all')

  // 利用可能な年度を取得
  const availableYears = useMemo(() => {
    if (!examSessions) return []
    const years = [...new Set(examSessions.map(session => session.year))]
    return years.sort((a, b) => b.localeCompare(a)) // 新しい年度順
  }, [examSessions])

  // フィルタリングされたセッション
  const filteredSessions = useMemo(() => {
    if (!examSessions) return []
    if (selectedYear === 'all') return examSessions
    return examSessions.filter(session => session.year === selectedYear)
  }, [examSessions, selectedYear])

  // 期別にグループ化
  const periods = useMemo(() => {
    const groupedSessions = filteredSessions.reduce((acc, session) => {
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
  }, [filteredSessions])

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <Header 
          subtitle="練習問題"
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              練習問題を選択してください
            </h2>
            <p className="text-muted-foreground mb-6">
              年度と科目を選択して練習を開始できます
            </p>
            
            {/* フィルタリング */}
            {!loading && availableYears.length > 0 && (
              <div className="mb-8 flex justify-center">
                <div className="flex items-center space-x-2">
                  <label htmlFor="year-filter" className="text-sm font-medium text-foreground">
                    年度:
                  </label>
                  <select
                    id="year-filter"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="all">すべて</option>
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}年度
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            
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
                  {selectedYear === 'all' 
                    ? '利用可能な練習問題がありません' 
                    : `${selectedYear}年度の練習問題はありません`
                  }
                </p>
                {selectedYear !== 'all' && (
                  <button 
                    onClick={() => setSelectedYear('all')}
                    className="mt-2 text-sm text-primary hover:underline"
                  >
                    すべての年度を表示
                  </button>
                )}
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