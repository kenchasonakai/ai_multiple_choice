import { ReactNode } from "react"

interface ExamLayoutProps {
  children: ReactNode
}

export default function ExamLayout({ children }: ExamLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}