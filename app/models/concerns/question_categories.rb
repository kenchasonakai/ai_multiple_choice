module QuestionCategories
  # 基礎理論
  FUNDAMENTALS = "基礎理論".freeze
  DISCRETE_MATHEMATICS = "離散数学".freeze
  APPLIED_MATHEMATICS = "応用数学".freeze

  # コンピュータシステム
  COMPUTER_COMPONENTS = "コンピュータ構成要素".freeze
  SYSTEM_COMPONENTS = "システム構成要素".freeze
  SOFTWARE = "ソフトウェア".freeze
  HARDWARE = "ハードウェア".freeze

  # 技術要素
  DATABASE = "データベース".freeze
  NETWORK = "ネットワーク".freeze
  SECURITY = "セキュリティ".freeze
  HUMAN_INTERFACE = "ヒューマンインタフェース".freeze

  # 開発技術
  ALGORITHM = "アルゴリズム".freeze
  PROGRAMMING = "プログラミング".freeze
  SYSTEM_DEVELOPMENT = "システム開発技術".freeze

  # マネジメント系
  PROJECT_MANAGEMENT = "プロジェクトマネジメント".freeze
  SERVICE_MANAGEMENT = "サービスマネジメント".freeze

  # ストラテジ系
  SYSTEM_STRATEGY = "システム戦略".freeze
  BUSINESS_STRATEGY = "経営戦略".freeze
  CORPORATE_LEGAL = "企業と法務".freeze

  ALL = [
    # 基礎理論
    FUNDAMENTALS, DISCRETE_MATHEMATICS, APPLIED_MATHEMATICS,

    # コンピュータシステム
    COMPUTER_COMPONENTS, SYSTEM_COMPONENTS, SOFTWARE, HARDWARE,

    # 技術要素
    DATABASE, NETWORK, SECURITY, HUMAN_INTERFACE,

    # 開発技術
    ALGORITHM, PROGRAMMING, SYSTEM_DEVELOPMENT,

    # マネジメント系
    PROJECT_MANAGEMENT, SERVICE_MANAGEMENT,

    # ストラテジ系
    SYSTEM_STRATEGY, BUSINESS_STRATEGY, CORPORATE_LEGAL
  ].freeze
end
