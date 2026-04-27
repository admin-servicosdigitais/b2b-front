import { create } from 'zustand'
import type { DashboardResponse } from '@/types/api'
import { getDashboard } from '@/services/dashboard.service'
import { ApiError } from '@/services/api-client'

interface DashboardState {
  data: DashboardResponse | null
  loading: boolean
  error: string | null
  fetch: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set) => ({
  data: null,
  loading: false,
  error: null,
  fetch: async () => {
    set({ loading: true, error: null })
    try {
      const data = await getDashboard()
      set({ data, loading: false })
    } catch (err) {
      const detail = err instanceof ApiError ? err.detail : 'Erro ao carregar dashboard'
      set({ error: detail, loading: false })
    }
  },
}))
