import { cn } from '@/lib/utils'
import type { Prioridade } from '@/types/enums'

const STYLES: Record<Prioridade, string> = {
  ALTA: 'bg-red-900/20 text-red-400 border-red-800/30',
  MEDIA: 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30',
  BAIXA: 'bg-green-900/20 text-green-400 border-green-800/30',
}

interface PriorityBadgeProps {
  prioridade: string | null
  className?: string
}

export function PriorityBadge({ prioridade, className }: PriorityBadgeProps) {
  if (!prioridade) return null
  const key = prioridade as Prioridade
  return (
    <span
      className={cn(
        'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border uppercase tracking-wide',
        STYLES[key] ?? 'bg-neutral-800 text-neutral-400 border-neutral-700',
        className,
      )}
    >
      {prioridade}
    </span>
  )
}
