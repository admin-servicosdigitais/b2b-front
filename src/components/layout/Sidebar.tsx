'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Columns2,
  MessageSquare,
  Swords,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/config/navigation'

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Columns2,
  MessageSquare,
  Swords,
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 shrink-0 flex flex-col bg-surface-card border-r border-surface-border">
      <div className="px-5 py-6 border-b border-surface-border">
        <div className="flex items-center gap-2 mb-1">
          <div className="size-7 rounded-md bg-brand-primary flex items-center justify-center">
            <span className="text-xs font-bold text-white">CC</span>
          </div>
          <span className="font-semibold text-neutral-100 text-sm">Copiloto Comercial</span>
        </div>
        <p className="text-[11px] text-neutral-500 pl-9 leading-tight">
          Dados, inteligência e ação
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_LINKS.map((link) => {
          const Icon = ICON_MAP[link.icon]
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                active
                  ? 'bg-brand-primary/15 text-blue-400 border-l-2 border-brand-primary pl-[10px]'
                  : 'text-neutral-400 hover:text-neutral-100 hover:bg-surface-elevated',
              )}
            >
              {Icon && <Icon className="size-4 shrink-0" />}
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-4 border-t border-surface-border">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-blue-400">VB</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-neutral-200 truncate">Vendedor B2B</p>
            <p className="text-[10px] text-neutral-500">Copiloto ativo</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
