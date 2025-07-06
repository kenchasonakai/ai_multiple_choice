"use client"

import { Header } from "@/components/layout/header"
import { QuestionCard } from "@/components/exam/question-card"
import { QuestionOptions } from "@/components/exam/question-options"
import { ReasoningInput } from "@/components/exam/reasoning-input"
import { SubmitActions } from "@/components/exam/submit-actions"
import { QuestionNavigation } from "@/components/exam/question-navigation"
import { useExam } from "@/contexts/exam-context"

export function ExamContent() {
  const {
    examSession,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    answers,
    reasoning,
    isSubmitted,
    setAnswer,
    setReasoning,
    submitAnswer,
    resetAnswer
  } = useExam()

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-muted-foreground">問題が見つかりません</p>
          </div>
        </div>
      </div>
    )
  }

  const questionId = currentQuestion.id
  const selectedAnswer = answers[questionId] || ""
  const currentReasoning = reasoning[questionId] || ""
  const isCurrentSubmitted = isSubmitted[questionId] || false

  const handleSubmit = () => {
    if (!selectedAnswer || !currentReasoning.trim()) {
      alert("選択肢と理由の両方を入力してください。")
      return
    }
    submitAnswer(questionId)
  }

  const handleReset = () => {
    resetAnswer(questionId)
  }

  const handleAnswerChange = (answer: string) => {
    setAnswer(questionId, answer)
  }

  const handleReasoningChange = (text: string) => {
    setReasoning(questionId, text)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <Header 
          subtitle={`${examSession?.period} ${examSession?.subject_name} (全${totalQuestions}問)`}
          badges={[
            { label: currentQuestion.category, variant: "secondary" }
          ]}
        />
        
        <div className="max-w-4xl mx-auto space-y-6">
          {/* 問題ナビゲーション */}
          <QuestionNavigation 
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
          />

          {/* 問題カード */}
          <QuestionCard question={currentQuestion} isSubmitted={isCurrentSubmitted}>
            <QuestionOptions
              options={currentQuestion.options}
              selectedAnswer={selectedAnswer}
              onAnswerChange={handleAnswerChange}
              isSubmitted={isCurrentSubmitted}
            />
            
            <ReasoningInput
              reasoning={currentReasoning}
              onReasoningChange={handleReasoningChange}
              isSubmitted={isCurrentSubmitted}
            />
            
            <SubmitActions
              selectedAnswer={selectedAnswer}
              reasoning={currentReasoning}
              isSubmitted={isCurrentSubmitted}
              onSubmit={handleSubmit}
              onReset={handleReset}
            />
          </QuestionCard>
        </div>
      </div>
    </div>
  )
}