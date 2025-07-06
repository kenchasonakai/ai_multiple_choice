export interface MultipleChoiceQuestion {
  options: string[]
  correct_answer: number
}

export interface EssayQuestion {
  answer_criteria: string
  sample_answers: string[]
  evaluation_rubric: string
  min_length: number
  max_length: number
}

export interface Question {
  id: number
  text: string
  question_type: 'multiple_choice' | 'essay'
  category: string
  multiple_choice_question: MultipleChoiceQuestion | null
  essay_question: EssayQuestion | null
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

