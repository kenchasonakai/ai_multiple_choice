import { ReactNode } from "react"
import { Question, SubjectInfo } from "./exam"

// Badge関連
export interface BadgeItem {
  label: string
  variant?: "default" | "secondary" | "destructive" | "outline"
}

// Header関連
export interface HeaderProps {
  subtitle?: string
  badges?: BadgeItem[]
  showThemeToggle?: boolean
}

// Question関連コンポーネント
export interface QuestionCardProps {
  question: Question
  isSubmitted: boolean
  children: ReactNode
}

export interface QuestionOptionsProps {
  options: string[]
  selectedAnswer: string
  onAnswerChange: (answer: string) => void
  isSubmitted: boolean
}

export interface ReasoningInputProps {
  reasoning: string
  onReasoningChange: (reasoning: string) => void
  isSubmitted: boolean
}

export interface SubmitActionsProps {
  selectedAnswer: string
  reasoning: string
  isSubmitted: boolean
  onSubmit: () => void
  onReset: () => void
}

// Page関連
export interface SubjectPageContentProps {
  yearDisplay: string
  subjectDisplay: SubjectInfo
  question: Question
  totalQuestions: number
}

// Logo関連
export interface LogoProps {
  className?: string
  showText?: boolean
}

// Page関連のNext.js params
export interface YearPageProps {
  params: Promise<{
    year: string
  }>
}

export interface SubjectPageProps {
  params: Promise<{
    year: string
    subject: string
  }>
}

export interface SlugPageProps {
  params: Promise<{
    slug: string
  }>
}