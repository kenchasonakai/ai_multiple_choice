/**
 * 統合テスト例: Practice Pageの全体動作
 * - APIレスポンスのモック
 * - フィルタリング機能の動作確認
 * - ユーザーインタラクションの流れ
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PracticePage from '@/app/practice/page'

// APIレスポンスのモック
const mockExamSessions = [
  {
    slug: '2023-spring-subject-a',
    year: '2023',
    period: '2023年度春期',
    subject_slug: 'subject-a',
    subject_name: '科目A',
    subject_description: '多肢選択式',
    question_count: 3,
  },
  {
    slug: '2023-spring-subject-b',
    year: '2023',
    period: '2023年度春期',
    subject_slug: 'subject-b',
    subject_name: '科目B',
    subject_description: '多肢選択式・記述式',
    question_count: 2,
  },
  {
    slug: '2022-spring-subject-a',
    year: '2022',
    period: '2022年度春期',
    subject_slug: 'subject-a',
    subject_name: '科目A',
    subject_description: '多肢選択式',
    question_count: 1,
  },
]

// API関数をモック
import { fetchExamSessions } from '../__mocks__/api'

jest.mock('@/services/api/examSessions', () => ({
  fetchExamSessions: require('../__mocks__/api').fetchExamSessions,
}))
const mockFetchExamSessions = fetchExamSessions as jest.MockedFunction<typeof fetchExamSessions>

describe('Practice Page Integration', () => {
  beforeEach(() => {
    // 各テスト前にモックをリセット
    jest.clearAllMocks()
    mockFetchExamSessions.mockResolvedValue(mockExamSessions)
  })

  describe('正常な動作フロー', () => {
    it('ページロード → データ表示 → リンククリックの統合フロー', async () => {
      const user = userEvent.setup()
      
      render(<PracticePage />)

      // 1. 初期ロード状態
      expect(screen.getByText('読み込み中...')).toBeInTheDocument()

      // 2. データ表示待機
      await waitFor(() => {
        expect(screen.getByText('問題を選択してください')).toBeInTheDocument()
      })

      // 3. APIが呼ばれたことを確認
      expect(mockFetchExamSessions).toHaveBeenCalledTimes(1)

      // 4. セッションが表示されることを確認
      expect(screen.getByText('2023年度春期')).toBeInTheDocument()
      expect(screen.getByText('2022年度春期')).toBeInTheDocument()

      // 5. リンククリックのテスト（モック）
      const practiceLink = screen.getByText(/科目A.*3問/)
      expect(practiceLink).toHaveAttribute('href', '/practice/2023-spring-subject-a')
    })
  })

  describe('エラーハンドリング', () => {
    it('API取得失敗時のエラー表示とリトライ機能', async () => {
      const user = userEvent.setup()
      
      // APIエラーをモック
      mockFetchExamSessions.mockRejectedValue(new Error('Network Error'))
      
      render(<PracticePage />)

      // エラー表示を待機
      await waitFor(() => {
        expect(screen.getByText('エラーが発生しました')).toBeInTheDocument()
        expect(screen.getByText('Network Error')).toBeInTheDocument()
      })

      // リトライボタンをクリック
      const retryButton = screen.getByText('再試行')
      
      // 2回目は成功するようにモック設定
      mockFetchExamSessions.mockResolvedValue(mockExamSessions)
      
      await user.click(retryButton)

      // 成功データが表示されることを確認
      await waitFor(() => {
        expect(screen.getByText('2023年度春期')).toBeInTheDocument()
      })
    })
  })

  describe('エッジケース', () => {
    it('データが空の場合の表示', async () => {
      mockFetchExamSessions.mockResolvedValue([])
      
      render(<PracticePage />)

      await waitFor(() => {
        expect(screen.getByText('利用可能な練習問題がありません')).toBeInTheDocument()
      })
    })
  })
})