import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"
import { HeaderProps } from "@/types/components"

export function Header({ 
  subtitle, 
  badges = [], 
  showThemeToggle = true 
}: HeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo />
            </Link>
          </div>
          {subtitle && (
            <p className="text-lg text-muted-foreground mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {showThemeToggle && <ThemeToggle />}
      </div>
      {badges.length > 0 && (
        <div className="flex gap-2">
          {badges.map((badge, index) => (
            <Badge key={index} variant={badge.variant || "default"}>
              {badge.label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}