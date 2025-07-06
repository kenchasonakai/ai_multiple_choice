export interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  category: string
}

export interface SubjectInfo {
  slug: string
  name: string
  description: string
}

export interface ExamSession {
  slug: string
  year: string
  period: string
  subject_slug: string
  subject_name: string
  subject_description: string
  questions: Question[]
}

export interface ExamSessionListItem {
  slug: string
  year: string
  period: string
  subject_slug: string
  subject_name: string
  subject_description: string
  question_count: number
}

