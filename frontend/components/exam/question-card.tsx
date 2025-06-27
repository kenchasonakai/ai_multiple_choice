import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { parseCodeBlocks } from "@/lib/utils"
import { QuestionCardProps } from "@/types/components"

export function QuestionCard({ question, isSubmitted, children }: QuestionCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          問題 {question.id}
          {isSubmitted && <CheckCircle className="w-5 h-5 text-green-600" />}
        </CardTitle>
        <CardDescription>
          以下の問題を読んで、最も適切な選択肢を選び、その理由を記述してください。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="text-lg leading-relaxed">
            {parseCodeBlocks(question.text).map((block) => {
              if (block.type === 'code') {
                return (
                  <pre key={block.key} className="bg-muted p-4 rounded-md overflow-x-auto my-4">
                    <code className={`text-sm ${block.language ? `language-${block.language}` : ''}`}>
                      {block.content}
                    </code>
                  </pre>
                )
              }
              return <span key={block.key}>{block.content}</span>
            })}
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  )
}