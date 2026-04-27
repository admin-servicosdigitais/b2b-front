'use client'

import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'

interface KpiCardProps {
  label: string
  value: number
  format?: (v: number) => string
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
  className?: string
}

export function KpiCard({ label, value, format, icon: Icon, trend, trendUp, className }: KpiCardProps) {
  return (
    <div
      className={cn(
        'bg-surface-card border border-surface-border rounded-xl p-5 flex flex-col gap-4',
        'hover:border-neutral-600 transition-colors animate-count-up',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">{label}</span>
        <div className="size-8 rounded-lg bg-surface-elevated flex items-center justify-center">
          <Icon className="size-4 text-neutral-400" />
        </div>
      </div>

      <div>
        <p className="text-2xl font-bold text-neutral-100 tabular-nums">
          <AnimatedNumber value={value} format={format} />
        </p>
        {trend && (
          <p className={cn('text-xs mt-1', trendUp ? 'text-brand-success' : 'text-neutral-500')}>
            {trend}
          </p>
        )}
      </div>
    </div>
  )
}
