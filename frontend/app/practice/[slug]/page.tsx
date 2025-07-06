import { SlugPageClient } from "./slug-page-client"

// 静的生成用のパラメータをAPIから取得
export async function generateStaticParams() {
  try {
    // 本番環境とビルド時のAPIエンドポイント
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const response = await fetch(`${apiUrl}/api/exam_sessions`)
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    
    if (!data.success) {
      throw new Error(`API returned error: ${data.message}`)
    }
    
    const sessions = data.data
    
    if (!Array.isArray(sessions) || sessions.length === 0) {
      throw new Error('No exam sessions found in API response')
    }
    
    return sessions.map((session: any) => ({
      slug: session.slug
    }))
  } catch (error) {
    console.error('Failed to fetch exam sessions during build:', error)
    throw error // ビルドを失敗させる
  }
}

interface SlugPageProps {
  params: Promise<{ slug: string }>
}

export default function SlugPage({ params }: SlugPageProps) {
  return <SlugPageClient params={params} />
}