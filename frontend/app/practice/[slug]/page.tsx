'use client'

import { notFound } from "next/navigation"
import { ExamProvider } from "@/contexts/exam-context"
import { ExamContent } from "./exam-content"
import { useExamSession } from "@/hooks/useExamSession"
import { useEffect, useState } from "react"

interface SlugPageProps {
  params: Promise<{ slug: string }>
}

export default function SlugPage({ params }: SlugPageProps) {
  const [slug, setSlug] = useState<string>('')

  // paramsを非同期で取得 (Next.js 15のapp routerでの新しい形式)
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    getParams()
  }, [params])
  const { examSession, loading, error, refetch } = useExamSession(slug)

  // エラーが404の場合はnotFoundを呼ぶ
  useEffect(() => {
    if (error === 'Not Found') {
      notFound()
    }
  }, [error])

  // slugがまだ取得されていない場合
  if (!slug || loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-lg text-muted-foreground">問題を読み込み中...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error && error !== 'Not Found') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="bg-destructive/10 border border-destructive rounded-lg p-6 max-w-md mx-auto">
              <p className="text-destructive font-semibold mb-2">エラーが発生しました</p>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <button 
                onClick={refetch}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                再試行
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!examSession) {
    return null // loading中またはnotFound処理中
  }

  return (
    <ExamProvider examSession={examSession}>
      <ExamContent />
    </ExamProvider>
  )
}