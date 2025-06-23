import { notFound } from "next/navigation"
import { SubjectPageContent } from "./subject-page-content"
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

  // 最初の問題を表示（後で問題選択機能を追加予定）
  const currentQuestion = examSession.questions[0]

  return (
    <SubjectPageContent
      yearDisplay={examSession.year_display}
      subjectDisplay={examSession.subject}
      question={currentQuestion}
      totalQuestions={examSession.questions.length}
    />
  )
}