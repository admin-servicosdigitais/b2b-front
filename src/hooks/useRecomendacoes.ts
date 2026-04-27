'use client'

import { useEffect } from 'react'
import { useRecomendacoesStore } from '@/store/recomendacoes.store'
import type { StatusRecomendacao } from '@/types/enums'

export function useRecomendacoes(clienteId?: number) {
  const { all, byCliente, loading, error, fetchAll, fetchByCliente, updateStatus } =
    useRecomendacoesStore()

  useEffect(() => {
    if (clienteId !== undefined) {
      void fetchByCliente(clienteId)
    } else {
      void fetchAll()
    }
  }, [clienteId, fetchAll, fetchByCliente])

  const recs = clienteId !== undefined ? (byCliente[clienteId] ?? []) : all

  const handleUpdateStatus = (id: number, status: StatusRecomendacao) =>
    updateStatus(id, status)

  return { recs, loading, error, updateStatus: handleUpdateStatus }
}
