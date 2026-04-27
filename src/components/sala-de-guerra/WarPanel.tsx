import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface WarPanelProps {
  title: string
  icon: LucideIcon
  iconColor?: string
  count?: number
  children: React.ReactNode
  className?: string
}

export function WarPanel({ title, icon: Icon, iconColor = 'text-neutral-400', count, children, className }: WarPanelProps) {
  return (
    <div className={cn('bg-surface-card border border-surface-border rounded-xl flex flex-col', className)}>
      <div className="px-5 py-4 border-b border-surface-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={cn('size-4', iconColor)} />
          <h3 className="text-sm font-semibold text-neutral-300">{title}</h3>
        </div>
        {count !== undefined && (
          <span className="text-xs font-bold text-neutral-100 bg-surface-elevated px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
        {children}
      </div>
    </div>
  )
}
