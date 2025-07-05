# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**基本情報AImate** は、AI支援による基本情報技術者試験の学習プラットフォームです。Rails 8 API バックエンドと Next.js 15 フロントエンドで構成され、正解を狙い撃ちする新しい学習体験を提供します。

### サービス名・ブランディング
- **サービス名**: 基本情報AImate (キホンジョウホウエーアイメイト)
- **コンセプト**: AI時代の新しい学習体験で、正解を狙い撃ちする
- **ロゴ**: ダーツボード風ターゲット + 学習ブック + AI要素
- **カラー**: オレンジ（AI部分）、ブルー（狙い撃ち要素）

## Development Commands

### Rails Backend
```bash
bin/setup                    # Initial project setup
bin/rails server            # Start Rails API server (port 3000)
bin/rails console           # Rails console
bin/rails db:migrate        # Run database migrations
bin/rails db:seed           # Seed database
bin/rubocop                 # Code style checking
bin/brakeman               # Security analysis
```

### Next.js Frontend
```bash
cd frontend
npm install                 # Install dependencies
npm run dev                # Start development server with Turbopack (port 3001)
npm run build              # Production build
npm run lint               # ESLint checking
```

## Architecture

### Backend Structure
- **API-only Rails**: Configured for JSON API responses
- **Database**: SQLite3 with Solid Cache, Solid Queue, Solid Cable
- **Deployment**: Kamal with Docker support
- **Security**: Brakeman and Rubocop configured
- **Module Name**: `AiMultipleChoice`

### Frontend Structure
- **Next.js 15**: App Router with React 19 and TypeScript
- **Styling**: Tailwind CSS 4.x with custom design system
- **Fonts**: Geist Sans and Geist Mono optimized
- **Path Aliases**: `@/*` maps to `./*` (frontend root)

### URL Structure
IPAの基本情報技術者試験の過去問に基づいた構造：

```
/                              # → /practice (リダイレクト)
/practice                      # 練習問題トップ
/practice/[year]/[subject]     # 問題解答ページ

# 例:
/practice/2023-spring/subject-a  # 2023年春期 科目A
/practice/2023-autumn/subject-b  # 2023年秋期 科目B
/practice/2022-spring/subject-a  # 2022年春期 午前（科目A扱い）
```

### Directory Structure
```
frontend/
├── app/                         # App Router pages
│   ├── practice/               # 練習問題関連ページ
│   │   ├── [year]/            # 年度別ページ
│   │   │   └── [subject]/     # 科目別問題ページ
│   │   └── page.tsx           # 練習問題トップ
│   ├── globals.css            # グローバルスタイル（テーマ設定）
│   └── layout.tsx             # ルートレイアウト
├── components/                 # 共有コンポーネント
│   ├── ui/                    # 基本UIコンポーネント
│   │   ├── logo.tsx           # ブランドロゴ
│   │   ├── theme-toggle.tsx   # ダーク/ライトモード切り替え
│   │   ├── auto-resize-textarea.tsx # 自動高さ調整テキストエリア
│   │   └── badge.tsx, button.tsx, card.tsx, etc.
│   ├── layout/                # レイアウトコンポーネント
│   │   └── header.tsx         # 共通ヘッダー
│   └── exam/                  # 試験関連コンポーネント
│       ├── question-card.tsx      # 問題カード
│       ├── question-options.tsx   # 選択肢（ラジオボタン）
│       ├── reasoning-input.tsx    # 理由記述欄
│       └── submit-actions.tsx     # 提出・リセットボタン
├── lib/                       # ライブラリ設定
│   ├── utils.ts              # ユーティリティ関数
│   └── sample-data.ts        # サンプル問題データ（API置き換え予定）
├── hooks/                     # カスタムフック
│   └── use-theme.ts          # テーマ管理フック
├── types/                     # TypeScript型定義
│   └── exam.ts               # 試験関連の型
└── services/                  # API services (未実装)
```

## Current Implementation Status

### ✅ 完成済み機能

#### UI/UX
- **ロゴ・ブランディング**: ターゲット型ロゴで狙い撃ち感を表現
- **テーマシステム**: ライト/ダークモード切り替え
- **レスポンシブデザイン**: 各種デバイス対応
- **カラーシステム**: カスタムプロパティベースの一貫した配色

#### コンポーネント設計
- **Header**: 汎用的なヘッダー（ロゴ、サブタイトル、バッジ、テーマ切り替え）
- **問題表示**: カード形式の問題レイアウト
- **選択肢**: クリック範囲最適化済みラジオボタン
- **理由入力**: 自動高さ調整テキストエリア
- **バッジシステム**: カテゴリ・難易度表示

#### 技術実装
- **型安全性**: TypeScript での厳密な型定義
- **コンポーネント分割**: 再利用可能な粒度でモジュール化
- **アクセシビリティ**: ラベル関連付け、キーボード操作対応

### 🚧 実装予定・要改善

#### バックエンド連携
- **API実装**: Rails側での問題データAPI
- **認証システム**: ユーザー管理・学習履歴
- **データベース設計**: ✅ 完了（テーブル分割による選択式・記述式対応）

#### 学習機能
- **問題ナビゲーション**: 問題間の移動、進捗表示
- **解答履歴**: 過去の回答・理由の保存
- **学習統計**: 正答率、弱点分析
- **解説機能**: 問題の詳細解説表示

#### データ管理
```typescript
// 現在のサンプルデータ構造（lib/sample-data.ts）
interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  category: string
  difficulty: string
}

// API関数（現在はサンプルデータ）
fetchQuestions(year: string, subject: string): Promise<Question[]>
fetchQuestion(year: string, subject: string, questionId: number): Promise<Question | null>
```

## Design System

### カラーパレット
```css
/* ライトモード */
--primary: #2563eb        /* メインブルー */
--secondary: #dbeafe      /* 薄いブルー（バッジ） */
--orange-500: #f97316     /* AI要素（温かみ） */
--background: #ffffff     /* 背景 */
--foreground: #0f172a     /* テキスト */

/* ダークモード */
--primary: #3b82f6
--secondary: #1e3a8a
--background: #0a0a0a
--foreground: #ededed
```

### コンポーネント規則
- **バッジ**: カテゴリは`secondary`、難易度は`outline`
- **ロゴ**: `Logo`, `LogoIcon`, `LogoText`の3パターン
- **ヘッダー**: タイトル、サブタイトル、バッジ、テーマ切り替えをオプション対応

## Development Workflow

### セットアップ
1. **Rails**: 通常port 3000で起動
2. **Frontend**: port 3001で起動（`npm run dev`）
3. **API**: 将来的にRails APIと連携

### 開発時の注意点
- **型定義**: 新機能追加時は`types/exam.ts`を更新
- **コンポーネント**: 再利用性を重視した設計
- **テーマ対応**: 新しい色はカスタムプロパティで定義
- **アクセシビリティ**: ラベル関連付けとキーボード操作を考慮

### 今後の開発優先度
1. **Rails API実装**: 問題データのCRUD
2. **ユーザー認証**: 学習履歴の個人化
3. **学習機能**: 進捗管理、統計表示
4. **パフォーマンス**: データ取得の最適化
5. **SEO対策**: 基本情報関連キーワード最適化

## Technical Notes

### Key Libraries
- **Next.js 15**: App Router, React 19, TypeScript
- **Tailwind CSS 4**: カスタムプロパティベース
- **Lucide React**: アイコンライブラリ
- **clsx + tailwind-merge**: 条件付きスタイリング

### API Integration準備
現在は`lib/sample-data.ts`でサンプルデータを提供。将来的に以下のAPI呼び出しに置き換え：

```typescript
// 実装予定のAPI呼び出し
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${year}/${subject}`)
const questions = await response.json()
```

### SEO考慮事項
- URLに「基本情報」「基本情報技術者」キーワードを含む
- メタデータの最適化（実装予定）
- 構造化データの追加（実装予定）

## Database Design

### テーブル構造（分割設計）

#### **exam_sessions** (試験セッション)
```ruby
- id: bigint (primary key)
- slug: string (unique) # "2023-spring-subject-a"
- year: string # "2023"
- period: string # "2023年度春期"
- subject_slug: string # "subject-a"
- subject_name: string # "科目A"
- subject_description: text # "多肢選択式"
- created_at: datetime
- updated_at: datetime
```

#### **questions** (問題 - 親テーブル)
```ruby
- id: bigint (primary key)
- exam_session_id: bigint (foreign key)
- text: text (not null) # 問題文
- question_type: string (not null) # "multiple_choice" | "essay"
- category: string (not null) # カテゴリ（定数から選択）
- created_at: datetime
- updated_at: datetime
```

#### **multiple_choice_questions** (選択式問題)
```ruby
- id: bigint (primary key)
- question_id: bigint (foreign key)
- options: json (not null) # ["選択肢1", "選択肢2", "選択肢3", "選択肢4"]
- correct_answer: integer (not null) # 0-3 (正解のインデックス)
- created_at: datetime
- updated_at: datetime
```

#### **essay_questions** (記述式問題)
```ruby
- id: bigint (primary key)
- question_id: bigint (foreign key)
- answer_criteria: json (not null) # AI判定用の基準
- sample_answers: json (not null) # 模範解答例
- evaluation_rubric: json # 評価観点
- min_length: integer (default: 0) # 最小文字数
- max_length: integer (default: 1000) # 最大文字数
- created_at: datetime
- updated_at: datetime
```

### モデル関係

```ruby
# ExamSession 1:N Questions
class ExamSession < ApplicationRecord
  has_many :questions, dependent: :destroy
end

# Question (親モデル)
class Question < ApplicationRecord
  belongs_to :exam_session
  has_one :multiple_choice_question, dependent: :destroy
  has_one :essay_question, dependent: :destroy
  
  def detail
    case question_type
    when 'multiple_choice'
      multiple_choice_question
    when 'essay'
      essay_question
    end
  end
end

# 選択式問題
class MultipleChoiceQuestion < ApplicationRecord
  belongs_to :question
  validates :options, length: { is: 4 }
  validates :correct_answer, inclusion: { in: 0..3 }
end

# 記述式問題（AI判定対応）
class EssayQuestion < ApplicationRecord
  belongs_to :question
  validates :min_length, :max_length, numericality: { greater_than: 0 }
end
```

### カテゴリ分類

基本情報技術者試験の出題範囲に基づいた定数カテゴリ：

#### **基礎理論 (Fundamentals)**
- 基礎理論, 離散数学, 応用数学

#### **コンピュータシステム (Computer Systems)**  
- コンピュータ構成要素, システム構成要素, ソフトウェア, ハードウェア

#### **技術要素 (Technical Elements)**
- データベース, ネットワーク, セキュリティ, ヒューマンインタフェース

#### **開発技術 (Development)**
- アルゴリズム, プログラミング, システム開発技術

#### **マネジメント系 (Management)**
- プロジェクトマネジメント, サービスマネジメント

#### **ストラテジ系 (Strategy)**
- システム戦略, 経営戦略, 企業と法務

### データ例

#### **選択式問題**
```json
{
  "question": {
    "text": "データベースの正規化について...",
    "question_type": "multiple_choice",
    "category": "データベース"
  },
  "multiple_choice_question": {
    "options": [
      "第1正規形は、繰り返し項目を排除した形である",
      "第2正規形は、部分関数従属を排除した形である",
      "第3正規形は、推移関数従属を排除した形である",
      "すべての正規形において、データの冗長性は完全に排除される"
    ],
    "correct_answer": 2
  }
}
```

#### **記述式問題**
```json
{
  "question": {
    "text": "第三正規形について説明せよ",
    "question_type": "essay",
    "category": "データベース"
  },
  "essay_question": {
    "answer_criteria": {
      "required_keywords": ["正規化", "第三正規形", "推移関数従属"],
      "prohibited_keywords": ["非正規化"],
      "scoring_weights": {
        "concept_understanding": 0.4,
        "technical_accuracy": 0.3,
        "explanation_clarity": 0.3
      }
    },
    "sample_answers": {
      "perfect_answer": "第三正規形は、第二正規形の条件を満たしつつ、推移関数従属を排除した形である...",
      "good_answers": [
        "正規化の第三段階で、推移関数従属をなくすことで...",
        "第三正規形では、非キー属性が主キー以外の属性に依存しない..."
      ]
    },
    "evaluation_rubric": {
      "criteria": [
        {
          "name": "concept_understanding",
          "description": "正規化の概念理解"
        }
      ]
    },
    "min_length": 50,
    "max_length": 300
  }
}
```

### 設計のメリット

1. **型安全性**: 選択式では4つの`options`が必須、記述式では`answer_criteria`が必須
2. **拡張性**: 新しい問題タイプを追加しやすい
3. **保守性**: 各問題タイプの責務が明確に分離
4. **AI対応**: 記述式問題でのAI判定に必要な情報を構造化して保存
5. **バリデーション**: 各種制約（選択肢数、文字数、正解インデックス等）をDB・モデルレベルで保証
6. **インデックス最適化**: 検索頻度の高いフィールドに適切なインデックスを設定