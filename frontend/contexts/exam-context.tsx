"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { ExamSession, Question } from "@/types/exam"

interface ExamAnswers {
  [questionId: number]: string
}

interface ExamReasoning {
  [questionId: number]: string
}

interface ExamProgress {
  currentQuestionIndex: number
  answers: ExamAnswers
  reasoning: ExamReasoning
  isSubmitted: { [questionId: number]: boolean }
}

interface ExamContextType {
  examSession: ExamSession | null
  currentQuestionIndex: number
  currentQuestion: Question | null
  answers: ExamAnswers
  reasoning: ExamReasoning
  isSubmitted: { [questionId: number]: boolean }
  totalQuestions: number
  goToNext: () => void
  goToPrevious: () => void
  goToQuestion: (index: number) => void
  setAnswer: (questionId: number, answer: string) => void
  setReasoning: (questionId: number, text: string) => void
  submitAnswer: (questionId: number) => void
  resetAnswer: (questionId: number) => void
  canGoNext: boolean
  canGoPrevious: boolean
}

const ExamContext = createContext<ExamContextType | undefined>(undefined)

interface ExamProviderProps {
  children: ReactNode
  examSession: ExamSession
}

export function ExamProvider({ children, examSession }: ExamProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // URL paramsから現在問題番号を取得
  const initialQuestionIndex = Math.max(0, Math.min(
    parseInt(searchParams.get('q') || '1') - 1, // 1-indexedから0-indexedに変換
    examSession.questions.length - 1
  ))

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialQuestionIndex)
  const [answers, setAnswers] = useState<ExamAnswers>({})
  const [reasoning, setReasoning] = useState<ExamReasoning>({})
  const [isSubmitted, setIsSubmitted] = useState<{ [questionId: number]: boolean }>({})

  // sessionStorageからデータを復元
  useEffect(() => {
    if (typeof window === 'undefined') return

    const storageKey = `exam-progress-${examSession.slug}`
    const savedData = sessionStorage.getItem(storageKey)
    
    if (savedData) {
      try {
        const progress: ExamProgress = JSON.parse(savedData)
        setAnswers(progress.answers || {})
        setReasoning(progress.reasoning || {})
        setIsSubmitted(progress.isSubmitted || {})
        
        // URL paramsが優先、なければsessionStorageの値を使用
        if (!searchParams.get('q')) {
          setCurrentQuestionIndex(progress.currentQuestionIndex || 0)
        }
      } catch (error) {
        console.error('Failed to restore exam progress:', error)
      }
    }
  }, [examSession.slug, searchParams])

  // 状態変更時にsessionStorageに保存
  useEffect(() => {
    if (typeof window === 'undefined') return

    const storageKey = `exam-progress-${examSession.slug}`
    const progress: ExamProgress = {
      currentQuestionIndex,
      answers,
      reasoning,
      isSubmitted
    }
    
    sessionStorage.setItem(storageKey, JSON.stringify(progress))
  }, [currentQuestionIndex, answers, reasoning, isSubmitted, examSession.slug])

  // 現在問題番号変更時にURL更新
  useEffect(() => {
    const questionNumber = currentQuestionIndex + 1 // 0-indexedから1-indexedに変換
    const currentParams = new URLSearchParams(searchParams.toString())
    currentParams.set('q', questionNumber.toString())
    
    const newUrl = `${pathname}?${currentParams.toString()}`
    router.replace(newUrl, { scroll: false })
  }, [currentQuestionIndex, pathname, router, searchParams])

  const currentQuestion = examSession.questions[currentQuestionIndex] || null
  const totalQuestions = examSession.questions.length

  const goToNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentQuestionIndex(index)
    }
  }

  const setAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const setReasoningText = (questionId: number, text: string) => {
    setReasoning(prev => ({ ...prev, [questionId]: text }))
  }

  const submitAnswer = (questionId: number) => {
    setIsSubmitted(prev => ({ ...prev, [questionId]: true }))
  }

  const resetAnswer = (questionId: number) => {
    setAnswers(prev => {
      const newAnswers = { ...prev }
      delete newAnswers[questionId]
      return newAnswers
    })
    setReasoning(prev => {
      const newReasoning = { ...prev }
      delete newReasoning[questionId]
      return newReasoning
    })
    setIsSubmitted(prev => ({ ...prev, [questionId]: false }))
  }

  const canGoNext = currentQuestionIndex < totalQuestions - 1
  const canGoPrevious = currentQuestionIndex > 0

  const value: ExamContextType = {
    examSession,
    currentQuestionIndex,
    currentQuestion,
    answers,
    reasoning,
    isSubmitted,
    totalQuestions,
    goToNext,
    goToPrevious,
    goToQuestion,
    setAnswer,
    setReasoning: setReasoningText,
    submitAnswer,
    resetAnswer,
    canGoNext,
    canGoPrevious
  }

  return (
    <ExamContext.Provider value={value}>
      {children}
    </ExamContext.Provider>
  )
}

export function useExam() {
  const context = useContext(ExamContext)
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider')
  }
  return context
}