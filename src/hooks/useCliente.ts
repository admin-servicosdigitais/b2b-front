'use client'

import { useEffect } from 'react'
import { useClienteStore } from '@/store/cliente.store'

export function useCliente(id: number) {
  const resumos = useClienteStore((s) => s.resumos)
  const proximasAcoes = useClienteStore((s) => s.proximasAcoes)
  const loading = useClienteStore((s) => s.loading)
  const errors = useClienteStore((s) => s.errors)

  useEffect(() => {
    if (id) useClienteStore.getState().fetchCliente(id)
  }, [id])

  return {
    resumo: resumos[id] ?? null,
    proximaAcao: proximasAcoes[id] ?? null,
    loading: loading[id] ?? false,
    error: errors[id] ?? null,
  }
}
