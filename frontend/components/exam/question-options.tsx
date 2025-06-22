import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuestionOptionsProps {
  options: string[]
  selectedAnswer: string
  onAnswerChange: (answer: string) => void
  isSubmitted: boolean
}

export function QuestionOptions({
  options,
  selectedAnswer,
  onAnswerChange,
  isSubmitted
}: QuestionOptionsProps) {
  return (
    <RadioGroup
      value={selectedAnswer}
      onValueChange={onAnswerChange}
      className="mb-6"
      disabled={isSubmitted}
    >
      {options.map((option, index) => (
        <Label
          key={index}
          htmlFor={`option-${index}`}
          className={`flex items-start space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
            selectedAnswer === index.toString()
              ? "bg-accent border-accent text-accent-foreground"
              : "bg-card border-border hover:bg-accent/50 text-card-foreground"
          } ${isSubmitted ? "opacity-75 cursor-not-allowed" : ""}`}
        >
          <RadioGroupItem 
            value={index.toString()} 
            id={`option-${index}`} 
            className="mt-1" 
          />
          <div className="flex-1 text-sm leading-relaxed text-inherit">
            <span className="font-medium mr-2">
              ({String.fromCharCode(65 + index)})
            </span>
            {option}
          </div>
        </Label>
      ))}
    </RadioGroup>
  )
}