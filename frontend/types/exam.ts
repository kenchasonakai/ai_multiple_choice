export interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  category: string
  difficulty: string
}

export interface ExamState {
  selectedAnswer: string
  reasoning: string
  isSubmitted: boolean
}

export interface ExamActions {
  setSelectedAnswer: (answer: string) => void
  setReasoning: (reasoning: string) => void
  handleSubmit: () => void
  handleReset: () => void
}