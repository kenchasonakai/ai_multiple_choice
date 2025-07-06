import { SlugPageClient } from "./slug-page-client"

// 静的生成用のパラメータを定義
// TODO: Rails APIデプロイ後にAPI連携に変更予定
export async function generateStaticParams() {
  // 現在は静的な値を使用（API未デプロイのため）
  console.log('Using static exam session slugs (API not deployed yet)')
  
  return [
    { slug: '2023-spring-subject-a' },
    { slug: '2023-spring-subject-b' },
    { slug: '2022-spring-subject-a' },
  ]
}

interface SlugPageProps {
  params: Promise<{ slug: string }>
}

export default function SlugPage({ params }: SlugPageProps) {
  return <SlugPageClient params={params} />
}