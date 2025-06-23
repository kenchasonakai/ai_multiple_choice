import { notFound } from "next/navigation"
import { SubjectPageContent } from "./subject-page-content"
import { fetchQuestions } from "@/lib/sample-data"
import { SubjectPageProps } from "@/types/components"

const yearDisplayNames: Record<string, string> = {
  '2023': '2023年度',
  '2022': '2022年度',
  '2021': '2021年度'
}

const subjectDisplayNames: Record<string, { name: string; description: string }> = {
  'subject-a': { name: '科目A', description: '多肢選択式' },
  'subject-b': { name: '科目B', description: '多肢選択式' }
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { year, subject } = await params
  
  let questions
  try {
    // APIから問題データを取得（現在はサンプルデータ）
    questions = await fetchQuestions(year, subject)
  } catch (error) {
    // API側で404が返された場合（サンプルデータでシミュレート）
    notFound()
  }

  const yearDisplay = yearDisplayNames[year] || `${year}年度`
  const subjectDisplay = subjectDisplayNames[subject] || { name: subject.toUpperCase(), description: '多肢選択式' }

  // 最初の問題を表示（後で問題選択機能を追加予定）
  const currentQuestion = questions[0]

  return (
    <SubjectPageContent 
      yearDisplay={yearDisplay}
      subjectDisplay={subjectDisplay}
      question={currentQuestion}
      totalQuestions={questions.length}
    />
  )
}

