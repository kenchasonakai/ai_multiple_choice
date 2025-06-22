import { Header } from "@/components/layout/header"
import { notFound } from "next/navigation"
import Link from "next/link"
import { YearPageProps } from "@/types/components"

const validYears = [
  '2023',
  '2022',
  '2021'
]

const yearDisplayNames: Record<string, string> = {
  '2023': '2023年度',
  '2022': '2022年度',
  '2021': '2021年度'
}

export default async function YearPage({ params }: YearPageProps) {
  const { year } = await params
  
  if (!validYears.includes(year)) {
    notFound()
  }

  const displayName = yearDisplayNames[year]
  const isNewFormat = year === '2023'

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <Header 
          subtitle={`${displayName} 練習問題`}
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {displayName}
            </h2>
            <p className="text-muted-foreground mb-8">
              科目を選択してください
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Link href={`/practice/${year}/subject-a`} 
                 className="border border-border rounded-lg p-6 hover:bg-accent transition-colors block">
                <h3 className="text-lg font-semibold mb-2">
                  科目A
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isNewFormat ? '多肢選択式' : '午前試験（多肢選択式）'}
                </p>
              </Link>
              
              <Link href={`/practice/${year}/subject-b`} 
                 className="border border-border rounded-lg p-6 hover:bg-accent transition-colors block">
                <h3 className="text-lg font-semibold mb-2">
                  科目B
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isNewFormat ? '多肢選択式' : '午後試験（多肢選択式）'}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}