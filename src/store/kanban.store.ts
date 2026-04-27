import { create } from 'zustand'
import type { KanbanColuna } from '@/types/api'
import type { FunilStatusCodigo } from '@/types/enums'
import { getKanban } from '@/services/kanban.service'
import { ApiError } from '@/services/api-client'

interface KanbanState {
  colunas: KanbanColuna[]
  loading: boolean
  error: string | null
  fetch: () => Promise<void>
  moveCard: (clienteId: number, toStatusCodigo: FunilStatusCodigo) => void
}

export const useKanbanStore = create<KanbanState>((set, get) => ({
  colunas: [],
  loading: false,
  error: null,
  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const data = await getKanban()
      set({ colunas: data.colunas, loading: false })
    } catch (err) {
      const detail = err instanceof ApiError ? err.detail : 'Erro ao carregar kanban'
      set({ error: detail, loading: false })
    }
  },
  moveCard: (clienteId, toStatusCodigo) => {
    const { colunas } = get()
    let movedCard = null

    const updated = colunas.map((col) => {
      const found = col.clientes.find((c) => c.id === clienteId)
      if (found) movedCard = found
      return { ...col, clientes: col.clientes.filter((c) => c.id !== clienteId) }
    })

    if (!movedCard) return

    const finalColunas = updated.map((col) => {
      if (col.status.codigo === toStatusCodigo) {
        return { ...col, clientes: [...col.clientes, movedCard!] }
      }
      return col
    })

    set({ colunas: finalColunas })
  },
}))
