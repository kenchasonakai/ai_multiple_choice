import { redirect } from "next/navigation"

export default function Home() {
  // ルートページから練習ページにリダイレクト
  redirect('/practice')
}