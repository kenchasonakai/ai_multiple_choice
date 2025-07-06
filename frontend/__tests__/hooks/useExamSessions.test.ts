/**
 * Hooksテスト例: useExamSessions
 * - カスタムフックの動作確認
 * - 非同期処理のテスト
 * - エラーハンドリング
 */

import { renderHook, waitFor, act } from '@testing-library/react'
import { useExamSessions } from '@/hooks/useExamSessions'

// API関数をモック
import { fetchExamSessions } from '../__mocks__/api'

jest.mock('@/services/api/examSessions', () => ({
  fetchExamSessions: require('../__mocks__/api').fetchExamSessions,
}))
const mockFetchExamSessions = fetchExamSessions as jest.MockedFunction<typeof fetchExamSessions>

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
]

describe('useExamSessions Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('正常な動作', () => {
    it('初期状態でloadingがtrueになる', () => {
      mockFetchExamSessions.mockImplementation(() => new Promise(() => {})) // 永続的にpending
      
      const { result } = renderHook(() => useExamSessions())
      
      expect(result.current.loading).toBe(true)
      expect(result.current.sessions).toEqual([])
      expect(result.current.error).toBe(null)
    })

    it('API取得成功時にデータが設定される', async () => {
      mockFetchExamSessions.mockResolvedValue(mockExamSessions)
      
      const { result } = renderHook(() => useExamSessions())
      
      // 初期状態
      expect(result.current.loading).toBe(true)
      
      // API取得完了待機
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.sessions).toEqual(mockExamSessions)
      expect(result.current.error).toBe(null)
      expect(mockFetchExamSessions).toHaveBeenCalledTimes(1)
    })
  })

  describe('エラーハンドリング', () => {
    it('API取得失敗時にエラーが設定される', async () => {
      const errorMessage = 'Network Error'
      mockFetchExamSessions.mockRejectedValue(new Error(errorMessage))
      
      const { result } = renderHook(() => useExamSessions())
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.sessions).toEqual([])
      expect(result.current.error).toBe(errorMessage)
    })

    it('API取得失敗時にデフォルトエラーメッセージが設定される', async () => {
      mockFetchExamSessions.mockRejectedValue('Unknown error')
      
      const { result } = renderHook(() => useExamSessions())
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.error).toBe('試験セッションの取得に失敗しました')
    })
  })

  describe('refetch機能', () => {
    it('refetch関数でデータを再取得できる', async () => {
      mockFetchExamSessions.mockResolvedValue(mockExamSessions)
      
      const { result } = renderHook(() => useExamSessions())
      
      // 初回取得完了待機
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(mockFetchExamSessions).toHaveBeenCalledTimes(1)
      
      // refetch実行
      await act(async () => {
        result.current.refetch()
      })
      
      await waitFor(() => {
        expect(mockFetchExamSessions).toHaveBeenCalledTimes(2)
      })
    })
  })
})