import { notFound } from "next/navigation"
import { ExamProvider } from "@/contexts/exam-context"
import { ExamContent } from "./exam-content"
import { fetchQuestionsBySlug } from "@/lib/sample-data"
import { SlugPageProps } from "@/types/components"

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params

  let examSession
  try {
    // APIから問題データを取得（現在はサンプルデータ）
    examSession = await fetchQuestionsBySlug(slug)
  } catch (error) {
    // API側で404が返された場合（サンプルデータでシミュレート）
    notFound()
  }

  return (
    <ExamProvider examSession={examSession}>
      <ExamContent />
    </ExamProvider>
  )
}