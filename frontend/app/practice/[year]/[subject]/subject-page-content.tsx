"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { QuestionCard } from "@/components/exam/question-card"
import { QuestionOptions } from "@/components/exam/question-options"
import { ReasoningInput } from "@/components/exam/reasoning-input"
import { SubmitActions } from "@/components/exam/submit-actions"
import { SubjectPageContentProps } from "@/types/components"

export function SubjectPageContent({ 
  yearDisplay, 
  subjectDisplay, 
  question,
  totalQuestions
}: SubjectPageContentProps) {
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [reasoning, setReasoning] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!selectedAnswer || !reasoning.trim()) {
      alert("選択肢と理由の両方を入力してください。")
      return
    }
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setSelectedAnswer("")
    setReasoning("")
    setIsSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <Header 
          subtitle={`${yearDisplay} ${subjectDisplay.name} (全${totalQuestions}問)`}
          badges={[
            { label: question.category, variant: "secondary" },
            { label: question.difficulty, variant: "outline" }
          ]}
        />
        
        <div className="max-w-4xl mx-auto">
          <QuestionCard question={question} isSubmitted={isSubmitted}>
            <QuestionOptions
              options={question.options}
              selectedAnswer={selectedAnswer}
              onAnswerChange={setSelectedAnswer}
              isSubmitted={isSubmitted}
            />
            
            <ReasoningInput
              reasoning={reasoning}
              onReasoningChange={setReasoning}
              isSubmitted={isSubmitted}
            />
            
            <SubmitActions
              selectedAnswer={selectedAnswer}
              reasoning={reasoning}
              isSubmitted={isSubmitted}
              onSubmit={handleSubmit}
              onReset={handleReset}
            />
          </QuestionCard>
        </div>
      </div>
    </div>
  )
}