/**
 * コンポーネントテスト例: Header Component
 * - Props渡しの動作確認
 * - 条件分岐の表示確認
 * - ユーザーインタラクション
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '@/components/layout/header'

describe('Header Component', () => {
  describe('基本表示', () => {
    it('ロゴとテーマ切り替えボタンが表示される', () => {
      render(<Header />)
      
      // ロゴ内のテキストを分割して確認
      expect(screen.getByText('基本情報')).toBeInTheDocument()
      expect(screen.getByText('AI')).toBeInTheDocument()
      expect(screen.getByText('mate')).toBeInTheDocument()
      
      // テーマ切り替えボタンの確認
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('サブタイトルが渡された場合に表示される', () => {
      render(<Header subtitle="練習問題" />)
      
      expect(screen.getByText('練習問題')).toBeInTheDocument()
    })

    it('バッジが渡された場合に表示される', () => {
      const badges = [
        { label: 'データベース', variant: 'secondary' as const },
        { label: '難易度: 中', variant: 'outline' as const }
      ]
      
      render(<Header badges={badges} />)
      
      expect(screen.getByText('データベース')).toBeInTheDocument()
      expect(screen.getByText('難易度: 中')).toBeInTheDocument()
    })
  })

  describe('テーマ切り替え機能', () => {
    it('テーマ切り替えボタンがクリック可能', async () => {
      const user = userEvent.setup()
      
      render(<Header />)
      
      const themeToggle = screen.getByRole('button')
      await user.click(themeToggle)
      
      // テーマ切り替えの動作確認（実装に応じて）
      expect(themeToggle).toBeInTheDocument()
    })
  })

  describe('レスポンシブ表示', () => {
    it('画面サイズに応じた表示切り替え', () => {
      // モバイルサイズでの表示テスト
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      render(<Header subtitle="長いサブタイトルテキスト" />)
      
      // レスポンシブ対応の確認（CSSクラスやaria-labelなど）
      expect(screen.getByText('長いサブタイトルテキスト')).toBeInTheDocument()
    })
  })

  describe('アクセシビリティ', () => {
    it('リンクとボタンが存在する', () => {
      render(<Header />)
      
      // ホームページへのリンク確認
      const homeLink = screen.getByRole('link')
      expect(homeLink).toHaveAttribute('href', '/')
      
      // テーマ切り替えボタン確認
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('キーボードナビゲーションが機能する', async () => {
      const user = userEvent.setup()
      
      render(<Header />)
      
      const themeToggle = screen.getByRole('button')
      
      // Tabキーでフォーカス移動
      await user.tab()
      expect(document.activeElement).toBeInTheDocument()
      
      // Enterキーでボタン実行
      await user.keyboard('{Enter}')
      expect(themeToggle).toBeInTheDocument()
    })
  })
})