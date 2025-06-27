"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useExam } from "@/contexts/exam-context"

interface QuestionNavigationProps {
  currentQuestionIndex: number
  totalQuestions: number
}

export function QuestionNavigation({ currentQuestionIndex, totalQuestions }: QuestionNavigationProps) {
  const { goToNext, goToPrevious, canGoNext, canGoPrevious } = useExam()

  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
      {/* 前へボタン */}
      <Button
        variant="outline"
        onClick={goToPrevious}
        disabled={!canGoPrevious}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        前の問題
      </Button>

      {/* 問題番号表示 */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          問題 {currentQuestionIndex + 1} / {totalQuestions}
        </span>
        
        {/* プログレスバー */}
        <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* 次へボタン */}
      <Button
        variant="outline"
        onClick={goToNext}
        disabled={!canGoNext}
        className="flex items-center gap-2"
      >
        次の問題
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}