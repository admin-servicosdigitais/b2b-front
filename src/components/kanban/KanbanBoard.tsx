'use client'

import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core'
import type { DragStartEvent } from '@dnd-kit/core'
import { useState } from 'react'
import { useKanban } from '@/hooks/useKanban'
import { KanbanColumn } from './KanbanColumn'
import { FUNIL_ORDER } from '@/lib/constants'

export function KanbanBoard() {
  const { colunas, loading, error, handleDragEnd } = useKanban()
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id))
  }

  const handleDragEndWrapper = (event: Parameters<typeof handleDragEnd>[0]) => {
    setActiveId(null)
    handleDragEnd(event)
  }

  const sortedColunas = FUNIL_ORDER
    .map((code) => colunas.find((c) => c.status.codigo === code))
    .filter(Boolean) as typeof colunas

  if (error) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-800/30 rounded-xl text-red-400 text-sm">
        {error}
      </div>
    )
  }

  if (loading && colunas.length === 0) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-60 shrink-0 h-96 bg-surface-card border border-surface-border rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEndWrapper}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {sortedColunas.map((coluna) => (
          <KanbanColumn key={coluna.status.codigo} coluna={coluna} />
        ))}
      </div>
      <DragOverlay>
        {activeId && (
          <div className="bg-surface-card border border-brand-primary rounded-lg p-3 w-60 opacity-90 shadow-2xl rotate-1" />
        )}
      </DragOverlay>
    </DndContext>
  )
}
