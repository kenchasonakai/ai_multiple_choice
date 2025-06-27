import { Question, ExamSession } from "@/types/exam"

// スラグベースのサンプルデータ
export const sampleExamSessions: Record<string, ExamSession> = {
  "2023-spring-subject-a": {
    slug: "2023-spring-subject-a",
    year: "2023",
    period: "2023年度春期",
    subject: {
      slug: "subject-a",
      name: "科目A",
      description: "多肢選択式"
    },
    questions: [
      {
        id: 1,
        text: "データベースの正規化に関する説明として、最も適切なものはどれか。",
        options: [
          "第1正規形は、繰り返し項目を排除した形である",
          "第2正規形は、部分関数従属を排除した形である",
          "第3正規形は、推移関数従属を排除した形である",
          "すべての正規形において、データの冗長性は完全に排除される",
        ],
        correctAnswer: 2,
        category: "データベース",
        difficulty: "標準",
      },
      {
        id: 2,
        text: "OSI参照モデルの物理層で規定される内容として、最も適切なものはどれか。",
        options: [
          "データの暗号化方式",
          "IPアドレスの割り当て方法",
          "ケーブルのコネクタ形状",
          "HTTPプロトコルの仕様",
        ],
        correctAnswer: 2,
        category: "ネットワーク",
        difficulty: "基本",
      },
      {
        id: 3,
        text: "アルゴリズムの計算量について、O(n²)で表される処理として最も適切なものはどれか。",
        options: [
          "二分探索",
          "バブルソート",
          "線形探索",
          "クイックソート（最良の場合）",
        ],
        correctAnswer: 1,
        category: "アルゴリズム",
        difficulty: "標準",
      }
    ]
  },
  "2023-spring-subject-b": {
    slug: "2023-spring-subject-b",
    year: "2023",
    period: "2023年度春期",
    subject: {
      slug: "subject-b",
      name: "科目B",
      description: "多肢選択式"
    },
    questions: [
      {
        id: 4,
        text: "次のプログラムを実行したとき、変数xの値はいくつになるか。\n\n```\nint x = 0;\nfor (int i = 1; i <= 5; i++) {\n    x += i * 2;\n}\n```",
        options: [
          "15",
          "25",
          "30",
          "50",
        ],
        correctAnswer: 2,
        category: "プログラミング",
        difficulty: "基本",
      },
      {
        id: 5,
        text: "情報セキュリティの3要素（CIA）について、「完全性（Integrity）」の説明として最も適切なものはどれか。",
        options: [
          "情報が許可された人だけがアクセスできること",
          "情報が改ざんされていないこと",
          "システムが必要なときに利用できること",
          "情報の出所が明確であること",
        ],
        correctAnswer: 1,
        category: "セキュリティ",
        difficulty: "基本",
      },
      {
        id: 6,
        text: "TCP/IPプロトコルスイートにおいて、IPアドレスとMACアドレスの対応を管理するプロトコルはどれか。",
        options: [
          "ARP",
          "DHCP",
          "DNS",
          "ICMP",
        ],
        correctAnswer: 0,
        category: "ネットワーク",
        difficulty: "標準",
      },
      {
        id: 7,
        text: "次のJavaScriptコードの動作について、最も適切な説明はどれか。\n\n```javascript\nconst numbers = [1, 2, 3, 4, 5];\nconst result = numbers\n  .filter(n => n % 2 === 0)\n  .map(n => n * 2)\n  .reduce((sum, n) => sum + n, 0);\nconsole.log(result);\n```",
        options: [
          "12が出力される",
          "20が出力される", 
          "30が出力される",
          "エラーが発生する",
        ],
        correctAnswer: 0,
        category: "プログラミング",
        difficulty: "応用",
      }
    ]
  },
  "2022-spring-subject-a": {
    slug: "2022-spring-subject-a",
    year: "2022",
    period: "2022年度春期",
    subject: {
      slug: "subject-a",
      name: "科目A",
      description: "多肢選択式"
    },
    questions: [
      {
        id: 8,
        text: "CPUのキャッシュメモリに関する説明として、最も適切なものはどれか。",
        options: [
          "主記憶装置よりも容量が大きい",
          "主記憶装置よりもアクセス速度が速い",
          "二次記憶装置の一種である",
          "データの永続保存が可能である",
        ],
        correctAnswer: 1,
        category: "コンピュータシステム",
        difficulty: "基本",
      }
    ]
  },
  "2022-spring-subject-b": {
    slug: "2022-spring-subject-b",
    year: "2022",
    period: "2022年度春期",
    subject: {
      slug: "subject-b",
      name: "科目B",
      description: "多肢選択式"
    },
    questions: [
      {
        id: 9,
        text: "次のSQL文の実行結果として正しいものはどれか。\n\n```sql\nSELECT COUNT(*) FROM employees WHERE salary > 500000;\n```",
        options: [
          "給与が50万円を超える従業員の給与の合計",
          "給与が50万円を超える従業員の人数",
          "すべての従業員の人数",
          "給与が50万円以下の従業員の人数",
        ],
        correctAnswer: 1,
        category: "データベース",
        difficulty: "基本",
      }
    ]
  }
}

// スラグからExamSessionを取得する関数
export async function fetchQuestionsBySlug(slug: string): Promise<ExamSession> {
  // 実際のAPI呼び出しの代わりにサンプルデータを返す
  // 実装時は以下のようなAPI呼び出しに置き換える:
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/sessions/${slug}`)
  // if (!response.ok) {
  //   if (response.status === 404) throw new Error('Not Found')
  //   throw new Error('API Error')
  // }
  // const data = await response.json()
  // return data.data
  //
  // 期待するAPIレスポンス形式:
  // GET /api/v1/sessions/2023-spring-subject-a
  // Status: 200 OK
  // {
  //   "data": {
  //     "slug": "2023-spring-subject-a",
  //     "year": "2023",
  //     "period": "2023年度春期",
  //     "subject": {
  //       "slug": "subject-a",
  //       "name": "科目A",
  //       "description": "多肢選択式"
  //     },
  //     "questions": [
  //       {
  //         "id": 1,
  //         "text": "データベースの正規化に関する説明として、最も適切なものはどれか。",
  //         "options": [
  //           "第1正規形は、繰り返し項目を排除した形である",
  //           "第2正規形は、部分関数従属を排除した形である",
  //           "第3正規形は、推移関数従属を排除した形である",
  //           "すべての正規形において、データの冗長性は完全に排除される"
  //         ],
  //         "correct_answer": 2,
  //         "category": "データベース",
  //         "difficulty": "標準",
  //         "explanation": "正規化は...",
  //         "created_at": "2023-01-01T00:00:00Z",
  //         "updated_at": "2023-01-01T00:00:00Z"
  //       }
  //     ]
  //   },
  //   "meta": {
  //     "total_questions": 20,
  //     "current_question": 1
  //   }
  // }
  //
  // エラーレスポンス:
  // Status: 404 Not Found
  // {
  //   "error": {
  //     "code": "not_found",
  //     "message": "Exam session not found: 2020-spring-subject-a"
  //   }
  // }
  
  // APIレスポンスをシミュレート（少し遅延を入れる）
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // サンプルデータから該当するセッションを取得
  const examSession = sampleExamSessions[slug]
  if (!examSession) {
    throw new Error('Not Found')
  }
  
  return examSession
}

// 後方互換性のため、古い関数も残す（非推奨）
export async function fetchQuestions(year: string, subject: string): Promise<Question[]> {
  // 新しいslug形式に変換
  const slug = `${year}-spring-${subject}`
  try {
    const examSession = await fetchQuestionsBySlug(slug)
    return examSession.questions
  } catch {
    throw new Error('Not Found')
  }
}

// 特定の問題を取得する関数
export async function fetchQuestion(year: string, subject: string, questionId: number): Promise<Question | null> {
  const questions = await fetchQuestions(year, subject)
  return questions.find(q => q.id === questionId) || null
}

// スラグから特定の問題を取得する関数
export async function fetchQuestionBySlug(slug: string, questionId: number): Promise<Question | null> {
  const examSession = await fetchQuestionsBySlug(slug)
  return examSession.questions.find(q => q.id === questionId) || null
}