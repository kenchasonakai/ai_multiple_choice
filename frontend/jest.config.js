const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Next.jsアプリのディレクトリを指定
  dir: './',
})

// Jestのカスタム設定
const customJestConfig = {
  // テスト実行前にセットアップファイルを読み込み
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // テスト環境をjsdomに設定（ブラウザ環境をシミュレート）
  testEnvironment: 'jest-environment-jsdom',
  
  // テストファイルのパターン
  testMatch: [
    '**/__tests__/**/*.(test|spec).(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)',
  ],
  
  // テスト対象から除外するパターン
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/__mocks__/',
  ],
  
  // カバレッジ対象から除外するパターン
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/coverage/',
    '/public/',
  ],
  
  // モジュールパスエイリアス（tsconfig.jsonと同期）
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  
  // カバレッジ設定
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/*.config.{ts,js}',
  ],
}

// Next.jsの設定と統合
module.exports = createJestConfig(customJestConfig)