import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function PracticePage() {
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
              <div className="border border-border rounded-lg p-6 hover:bg-accent transition-colors">
                <h3 className="text-lg font-semibold mb-2">2023年度春期</h3>
                <p className="text-sm text-muted-foreground mb-4">科目A・科目B</p>
                <div className="space-y-2">
                  <Link href="/practice/2023-spring-subject-a" 
                     className="block text-sm text-primary hover:underline">
                    2023年度春期 科目A
                  </Link>
                  <Link href="/practice/2023-spring-subject-b" 
                     className="block text-sm text-primary hover:underline">
                    2023年度春期 科目B
                  </Link>
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-6 hover:bg-accent transition-colors">
                <h3 className="text-lg font-semibold mb-2">2022年度春期</h3>
                <p className="text-sm text-muted-foreground mb-4">科目A・科目B</p>
                <div className="space-y-2">
                  <Link href="/practice/2022-spring-subject-a" 
                     className="block text-sm text-primary hover:underline">
                    2022年度春期 科目A
                  </Link>
                  <Link href="/practice/2022-spring-subject-b" 
                     className="block text-sm text-primary hover:underline">
                    2022年度春期 科目B
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}