import { Header } from "@/components/layout/header"
import Link from "next/link"
import { sampleExamSessions } from "@/lib/sample-data"

export default function PracticePage() {
  // サンプルデータから期別にグループ化
  const examSessions = Object.values(sampleExamSessions)
  const groupedSessions = examSessions.reduce((acc, session) => {
    const key = session.period
    if (!acc[key]) {
      acc[key] = {
        period: session.period,
        sessions: []
      }
    }
    acc[key].sessions.push(session)
    return acc
  }, {} as Record<string, {
    period: string
    sessions: typeof examSessions
  }>)

  const periods = Object.values(groupedSessions)

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <Header 
          subtitle="練習問題"
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              練習問題を選択してください
            </h2>
            <p className="text-muted-foreground mb-8">
              年度と科目を選択して練習を開始できます
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {periods.map((period) => (
                <div key={period.period} className="border border-border rounded-lg p-6 hover:bg-accent transition-colors">
                  <h3 className="text-lg font-semibold mb-2">
                    {period.period}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {period.sessions.map(s => s.subject.name).join('・')}
                  </p>
                  <div className="space-y-2">
                    {period.sessions.map((session) => (
                      <Link 
                        key={session.slug}
                        href={`/practice/${session.slug}`} 
                        className="block text-sm text-primary hover:underline"
                      >
                        {session.period} {session.subject.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}