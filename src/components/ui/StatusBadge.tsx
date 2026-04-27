import { cn } from '@/lib/utils'
import type { FunilStatusCodigo } from '@/types/enums'

const STATUS_STYLES: Record<FunilStatusCodigo, string> = {
  LEAD: 'bg-neutral-700/50 text-neutral-300',
  QUALIFICADO: 'bg-blue-900/30 text-blue-400',
  PROPOSTA: 'bg-yellow-900/30 text-yellow-400',
  NEGOCIACAO: 'bg-orange-900/30 text-orange-400',
  FECHADO: 'bg-green-900/30 text-green-400',
  PERDIDO: 'bg-red-900/30 text-red-400',
}

const STATUS_LABELS: Record<FunilStatusCodigo, string> = {
  LEAD: 'Lead',
  QUALIFICADO: 'Qualificado',
  PROPOSTA: 'Proposta',
  NEGOCIACAO: 'Negociação',
  FECHADO: 'Fechado',
  PERDIDO: 'Perdido',
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const key = status as FunilStatusCodigo
  const style = STATUS_STYLES[key] ?? 'bg-neutral-700/50 text-neutral-300'
  const label = STATUS_LABELS[key] ?? status

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        style,
        className,
      )}
    >
      {label}
    </span>
  )
}
