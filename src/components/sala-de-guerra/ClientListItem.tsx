import Link from 'next/link'
import type { ClienteKanbanCard } from '@/types/api'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import { formatBRL } from '@/lib/formatters'

interface ClientListItemProps {
  card: ClienteKanbanCard
  detail?: string
}

export function ClientListItem({ card, detail }: ClientListItemProps) {
  return (
    <Link
      href={`/clientes/${card.id}`}
      className="flex items-center justify-between gap-3 py-2.5 border-b border-surface-border last:border-0 hover:opacity-80 transition-opacity group"
    >
      <div className="min-w-0">
        <p className="text-xs font-semibold text-neutral-200 truncate group-hover:text-blue-400 transition-colors">
          {card.nome_empresa}
        </p>
        {(card.segmento || detail) && (
          <p className="text-[10px] text-neutral-600 truncate">{detail ?? card.segmento}</p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {card.ticket_estimado !== null && (
          <span className="text-xs font-semibold text-brand-success">{formatBRL(card.ticket_estimado)}</span>
        )}
        <ScoreBadge score={card.score_conversao} />
      </div>
    </Link>
  )
}
