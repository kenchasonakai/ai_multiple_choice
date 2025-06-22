import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* SVGアイコン部分 */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* 外側のターゲット円 */}
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-primary opacity-30"
        />
        
        {/* 内側のターゲット円 */}
        <circle
          cx="16"
          cy="16"
          r="9"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          className="text-primary opacity-50"
        />
        
        {/* 中心の学習ブック */}
        <path
          d="M11 12h10v8c0 0.5-0.5 1-1 1h-8c-0.5 0-1-0.5-1-1v-8z"
          fill="currentColor"
          className="text-orange-500"
        />
        
        {/* AI要素 - 中央の3つのドット */}
        <circle cx="13.5" cy="15" r="1" fill="white" />
        <circle cx="16" cy="15" r="1" fill="white" />
        <circle cx="18.5" cy="15" r="1" fill="white" />
        
        {/* 学習進捗ライン */}
        <path
          d="M12 17.5h8"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M12 19h6"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
        
        {/* ダーツの矢（狙いを表現） */}
        <path
          d="M4 16L9 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd="url(#arrowhead)"
          className="text-blue-500"
        />
        
        {/* 矢印の先端 */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="currentColor"
              className="text-blue-500"
            />
          </marker>
        </defs>
        
        {/* 照準の十字線 */}
        <path
          d="M16 4v4M16 24v4M4 16h4M24 16h4"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="text-primary opacity-60"
        />
      </svg>
      
      {/* テキスト部分 */}
      {showText && (
        <span className="font-bold text-xl text-foreground">
          基本情報<span className="text-orange-500 font-extrabold">AI</span><span className="text-foreground font-normal">m</span>
        </span>
      )}
    </div>
  )
}

// アイコンのみ版
export function LogoIcon({ className }: { className?: string }) {
  return <Logo className={className} showText={false} />
}

// テキストのみ版
export function LogoText({ className }: { className?: string }) {
  return (
    <span className={cn("font-bold text-xl text-foreground", className)}>
      基本情報<span className="text-orange-500 font-extrabold">AI</span><span className="text-foreground font-normal">m</span>
    </span>
  )
}