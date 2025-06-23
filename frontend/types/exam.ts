export interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  category: string
  difficulty: string
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
  subject: SubjectInfo
  questions: Question[]
}

