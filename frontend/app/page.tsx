import { redirect } from "next/navigation"

export default function Home() {
  // NOTE: 後々ルートページを作成するため、今はルートページから練習ページにリダイレクトしている
  redirect('/practice')
}