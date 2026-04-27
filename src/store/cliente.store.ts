import { create } from 'zustand'
import type { ProximaAcaoResponse, ResumoClienteResponse } from '@/types/api'
import { getProximaAcao, getResumoCliente } from '@/services/clientes.service'
import { ApiError } from '@/services/api-client'

interface ClienteState {
  resumos: Record<number, ResumoClienteResponse>
  proximasAcoes: Record<number, ProximaAcaoResponse>
  loading: Record<number, boolean>
  errors: Record<number, string>
  fetchCliente: (id: number) => Promise<void>
}

export const useClienteStore = create<ClienteState>((set, get) => ({
  resumos: {},
  proximasAcoes: {},
  loading: {},
  errors: {},
  fetchCliente: async (id) => {
    if (get().resumos[id] || get().loading[id]) return
    set((s) => ({ loading: { ...s.loading, [id]: true } }))
    try {
      const [resumo, proximaAcao] = await Promise.all([
        getResumoCliente(id),
        getProximaAcao(id),
      ])
      set((s) => ({
        resumos: { ...s.resumos, [id]: resumo },
        proximasAcoes: { ...s.proximasAcoes, [id]: proximaAcao },
        loading: { ...s.loading, [id]: false },
      }))
    } catch (err) {
      const detail = err instanceof ApiError ? err.detail : 'Erro ao carregar cliente'
      set((s) => ({
        errors: { ...s.errors, [id]: detail },
        loading: { ...s.loading, [id]: false },
      }))
    }
  },
}))
