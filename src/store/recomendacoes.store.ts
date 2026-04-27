import { create } from 'zustand'
import type { RecomendacaoOut } from '@/types/api'
import type { StatusRecomendacao } from '@/types/enums'
import {
  getAllRecomendacoes,
  getRecomendacoesByCliente,
  updateRecomendacaoStatus,
} from '@/services/recomendacoes.service'
import { ApiError } from '@/services/api-client'

interface RecomendacoesState {
  all: RecomendacaoOut[]
  byCliente: Record<number, RecomendacaoOut[]>
  loading: boolean
  error: string | null
  fetchAll: () => Promise<void>
  fetchByCliente: (clienteId: number) => Promise<void>
  updateStatus: (id: number, status: StatusRecomendacao) => Promise<void>
}

export const useRecomendacoesStore = create<RecomendacoesState>((set, get) => ({
  all: [],
  byCliente: {},
  loading: false,
  error: null,
  fetchAll: async () => {
    set({ loading: true, error: null })
    try {
      const all = await getAllRecomendacoes()
      set({ all, loading: false })
    } catch (err) {
      const detail = err instanceof ApiError ? err.detail : 'Erro ao carregar recomendações'
      set({ error: detail, loading: false })
    }
  },
  fetchByCliente: async (clienteId) => {
    if (get().byCliente[clienteId]) return
    try {
      const recs = await getRecomendacoesByCliente(clienteId)
      set((s) => ({ byCliente: { ...s.byCliente, [clienteId]: recs } }))
    } catch (err) {
      const detail = err instanceof ApiError ? err.detail : 'Erro ao carregar recomendações'
      set({ error: detail })
    }
  },
  updateStatus: async (id, status) => {
    try {
      const updated = await updateRecomendacaoStatus(id, status)
      set((s) => ({
        all: s.all.map((r) => (r.id === id ? updated : r)),
        byCliente: Object.fromEntries(
          Object.entries(s.byCliente).map(([cid, recs]) => [
            cid,
            recs.map((r) => (r.id === id ? updated : r)),
          ]),
        ),
      }))
    } catch (err) {
      const detail = err instanceof ApiError ? err.detail : 'Erro ao atualizar status'
      set({ error: detail })
    }
  },
}))
