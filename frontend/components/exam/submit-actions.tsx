import { Button } from "@/components/ui/button"
import { SubmitActionsProps } from "@/types/components"

export function SubmitActions({
  selectedAnswer,
  reasoning,
  isSubmitted,
  onSubmit,
  onReset
}: SubmitActionsProps) {
  return (
    <>
      <div className="flex gap-3">
        {!isSubmitted ? (
          <Button 
            onClick={onSubmit} 
            disabled={!selectedAnswer || !reasoning.trim()} 
            className="flex-1"
          >
            解答を提出
          </Button>
        ) : (
          <>
            <Button onClick={onReset} variant="outline" className="flex-1">
              次の問題へ
            </Button>
            <Button variant="secondary" className="flex-1">
              解説を見る
            </Button>
          </>
        )}
      </div>

      {isSubmitted && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            解答を提出しました。解説を確認して理解を深めましょう。
          </p>
        </div>
      )}
    </>
  )
}