'use client'

import { useEffect } from 'react'
import { useDashboardStore } from '@/store/dashboard.store'
import { useKanbanStore } from '@/store/kanban.store'

export function useSalaDeGuerra() {
  const { data: dashboard, fetch: fetchDashboard } = useDashboardStore()
  const { colunas, fetch: fetchKanban } = useKanbanStore()

  useEffect(() => {
    void fetchDashboard()
    void fetchKanban()
  }, [fetchDashboard, fetchKanban])

  const negociacoesTravadas =
    colunas
      .find((c) => c.status.codigo === 'NEGOCIACAO')
      ?.clientes.slice()
      .sort((a, b) => (a.score_conversao ?? 0) - (b.score_conversao ?? 0)) ?? []

  const propostasParadas =
    colunas.find((c) => c.status.codigo === 'PROPOSTA')?.clientes ?? []

  const topOportunidades = colunas
    .flatMap((c) => c.clientes)
    .filter((c) => c.ticket_estimado !== null)
    .sort((a, b) => (b.ticket_estimado ?? 0) - (a.ticket_estimado ?? 0))
    .slice(0, 5)

  const projecaoMensal =
    (dashboard?.valor_fechado ?? 0) + (dashboard?.valor_em_negociacao ?? 0)

  const semContato = dashboard?.clientes_sem_interacao ?? 0

  return {
    negociacoesTravadas,
    propostasParadas,
    topOportunidades,
    projecaoMensal,
    semContato,
    loading: !dashboard && colunas.length === 0,
  }
}
