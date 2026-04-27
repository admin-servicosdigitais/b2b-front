'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Building2, ExternalLink } from 'lucide-react'
import type { ClienteKanbanCard } from '@/types/api'
import type { FunilStatusCodigo } from '@/types/enums'
import { cn } from '@/lib/utils'
import { formatBRL, truncate } from '@/lib/formatters'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import { PriorityBadge } from '@/components/ui/PriorityBadge'
import { KanbanCardHoverContent } from './KanbanCardHover'

interface KanbanCardProps {
  card: ClienteKanbanCard
  statusCodigo: FunilStatusCodigo
}

interface TooltipPos {
  top: number
  left: number
}

const TOOLTIP_WIDTH = 288 // w-72
const HOVER_DELAY_MS = 200
const HIDE_DELAY_MS = 80

export function KanbanCard({ card, statusCodigo }: KanbanCardProps) {
  const router = useRouter()
  const [tooltipPos, setTooltipPos] = useState<TooltipPos | null>(null)
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `card-${card.id}`,
    data: { clienteId: card.id, fromStatusCodigo: statusCodigo },
  })

  const style = { transform: CSS.Transform.toString(transform), transition }
  const isHighRisk = card.score_conversao !== null && card.score_conversao < 40

  const scheduleShow = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    const rect = e.currentTarget.getBoundingClientRect()
    showTimer.current = setTimeout(() => {
      const spaceRight = window.innerWidth - rect.right
      const left = spaceRight >= TOOLTIP_WIDTH + 8 ? rect.right + 8 : rect.left - TOOLTIP_WIDTH - 8
      setTooltipPos({ top: rect.top, left })
    }, HOVER_DELAY_MS)
  }, [])

  const scheduleHide = useCallback(() => {
    if (showTimer.current) clearTimeout(showTimer.current)
    hideTimer.current = setTimeout(() => setTooltipPos(null), HIDE_DELAY_MS)
  }, [])

  const cancelHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
  }, [])

  useEffect(() => {
    return () => {
      if (showTimer.current) clearTimeout(showTimer.current)
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [])

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'bg-surface-card border border-surface-border rounded-lg p-3 cursor-grab active:cursor-grabbing',
        'hover:border-neutral-600 transition-all group animate-slide-in',
        isDragging && 'opacity-50 scale-95',
        isHighRisk && 'border-l-2 border-l-brand-danger',
      )}
      onMouseEnter={scheduleShow}
      onMouseLeave={scheduleHide}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Building2 className="size-3.5 text-neutral-600 shrink-0" />
          <p className="text-xs font-semibold text-neutral-200 truncate">{card.nome_empresa}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/clientes/${card.id}`)
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-surface-elevated"
          aria-label={`Ver cliente ${card.nome_empresa}`}
        >
          <ExternalLink className="size-3 text-neutral-500" />
        </button>
      </div>

      {card.segmento && (
        <p className="text-[10px] text-neutral-600 mb-2">{card.segmento}</p>
      )}

      <div className="flex items-center justify-between gap-2 mb-2">
        {card.ticket_estimado !== null && (
          <span className="text-xs font-semibold text-brand-success">
            {formatBRL(card.ticket_estimado)}
          </span>
        )}
        <ScoreBadge score={card.score_conversao} />
      </div>

      {isHighRisk && (
        <div className="mb-2">
          <PriorityBadge prioridade="ALTA" />
        </div>
      )}

      {card.recomendacao_principal && (
        <p className="text-[11px] text-neutral-500 italic leading-snug">
          {truncate(card.recomendacao_principal, 70)}
        </p>
      )}

      {tooltipPos && createPortal(
        <div
          style={{ position: 'fixed', top: tooltipPos.top, left: tooltipPos.left, zIndex: 9999 }}
          className="bg-surface-card border border-surface-border rounded-lg p-3 shadow-xl w-72 animate-fade-in"
          onMouseEnter={cancelHide}
          onMouseLeave={scheduleHide}
        >
          <KanbanCardHoverContent clienteId={card.id} />
        </div>,
        document.body,
      )}
    </div>
  )
}
