'use client'

import { useCallback, useEffect } from 'react'
import type { DragEndEvent } from '@dnd-kit/core'
import { useKanbanStore } from '@/store/kanban.store'
import type { FunilStatusCodigo } from '@/types/enums'

export function useKanban() {
  const { colunas, loading, error, fetch, moveCard } = useKanbanStore()

  useEffect(() => {
    const { colunas: cols, loading: isLoading } = useKanbanStore.getState()
    if (!isLoading && cols.length === 0) void fetch()
  }, [fetch])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return
      const clienteId = active.data.current?.clienteId as number | undefined
      const toStatus = over.data.current?.statusCodigo as FunilStatusCodigo | undefined
      if (clienteId && toStatus) moveCard(clienteId, toStatus)
    },
    [moveCard],
  )

  return { colunas, loading, error, handleDragEnd }
}
