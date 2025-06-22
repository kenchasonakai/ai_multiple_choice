import { Label } from "@/components/ui/label"
import { AutoResizeTextarea } from "@/components/ui/auto-resize-textarea"

interface ReasoningInputProps {
  reasoning: string
  onReasoningChange: (reasoning: string) => void
  isSubmitted: boolean
}

export function ReasoningInput({
  reasoning,
  onReasoningChange,
  isSubmitted
}: ReasoningInputProps) {
  return (
    <div className="mb-6">
      <Label htmlFor="reasoning" className="text-sm font-medium mb-2 block">
        選択理由を記述してください
      </Label>
      <AutoResizeTextarea
        id="reasoning"
        placeholder="なぜその選択肢が正解だと思うのか、他の選択肢のどこが間違っているのかを具体的に記述してください..."
        value={reasoning}
        onChange={(e) => onReasoningChange(e.target.value)}
        minRows={4}
        maxRows={12}
        disabled={isSubmitted}
      />
    </div>
  )
}