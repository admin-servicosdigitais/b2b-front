'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { KanbanColuna } from '@/types/api'
import { cn } from '@/lib/utils'
import { KanbanCard } from './KanbanCard'
import { EmptyState } from '@/components/ui/EmptyState'

interface KanbanColumnProps {
  coluna: KanbanColuna
}

const COLUMN_ACCENT: Record<string, string> = {
  LEAD: 'border-t-neutral-600',
  QUALIFICADO: 'border-t-blue-600',
  PROPOSTA: 'border-t-yellow-600',
  NEGOCIACAO: 'border-t-orange-500',
  FECHADO: 'border-t-green-600',
}

export function KanbanColumn({ coluna }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `col-${coluna.status.codigo}`,
    data: { statusCodigo: coluna.status.codigo },
  })

  const accent = COLUMN_ACCENT[coluna.status.codigo] ?? 'border-t-neutral-600'
  const ids = coluna.clientes.map((c) => `card-${c.id}`)

  return (
    <div className={cn('flex flex-col bg-surface-card rounded-xl border border-t-2 border-surface-border min-h-[500px] w-60 shrink-0', accent)}>
      <div className="px-4 py-3 border-b border-surface-border flex items-center justify-between">
        <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
          {coluna.status.nome}
        </h3>
        <span className="text-xs font-semibold text-neutral-500 bg-surface-elevated px-1.5 py-0.5 rounded">
          {coluna.clientes.length}
        </span>
      </div>

      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn('flex-1 p-3 space-y-2 relative', isOver && 'bg-brand-primary/5')}
        >
          {coluna.clientes.length === 0 ? (
            <EmptyState title="Nenhum cliente" className="py-8" />
          ) : (
            coluna.clientes.map((card) => (
              <KanbanCard key={card.id} card={card} statusCodigo={coluna.status.codigo} />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  )
}
