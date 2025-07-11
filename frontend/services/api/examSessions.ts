import { apiClient } from './client'
import { Question, ExamSession, ExamSessionListItem } from '@/types/exam'

// API用の型定義
interface ApiMultipleChoiceQuestion {
  options: string[]
  correct_answer: number
}

interface ApiEssayQuestion {
  answer_criteria: string
  sample_answers: string[]
  evaluation_rubric: string
  min_length: number
  max_length: number
}

interface ApiQuestion {
  id: number
  text: string
  question_type: 'multiple_choice' | 'essay'
  category: string
  multiple_choice_question: ApiMultipleChoiceQuestion | null
  essay_question: ApiEssayQuestion | null
}

interface ApiExamSession {
  slug: string
  year: string
  period: string
  subject_slug: string
  subject_name: string
  subject_description: string
  questions: ApiQuestion[]
}

interface ApiExamSessionListItem {
  slug: string
  year: string
  period: string
  subject_slug: string
  subject_name: string
  subject_description: string
  question_count: number
}

// 試験セッション一覧を取得
export async function fetchExamSessions(): Promise<ExamSessionListItem[]> {
  try {
    const response = await apiClient.get<ApiExamSessionListItem[]>('/api/exam_sessions')
    return response.data
  } catch (error) {
    console.error('試験セッション一覧取得エラー:', error)
    throw error
  }
}

// 特定の試験セッションを取得
export async function fetchExamSession(slug: string): Promise<ExamSession> {
  try {
    const response = await apiClient.get<ApiExamSession>(`/api/exam_sessions/${slug}`)
    const data = response.data
    
    // APIレスポンスをフロントエンド形式に変換
    return {
      slug: data.slug,
      year: data.year,
      period: data.period,
      subject_slug: data.subject_slug,
      subject_name: data.subject_name,
      subject_description: data.subject_description,
      questions: data.questions.map((q: ApiQuestion): Question => ({
        id: q.id,
        text: q.text,
        question_type: q.question_type,
        category: q.category,
        multiple_choice_question: q.multiple_choice_question,
        essay_question: q.essay_question
      }))
    }
  } catch (error) {
    console.error('試験セッション取得エラー:', error)
    throw error
  }
}

// 後方互換性のため残しておく
export const fetchQuestionsBySlug = fetchExamSession