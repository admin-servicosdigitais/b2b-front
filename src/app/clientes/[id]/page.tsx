'use client'

import { useParams } from 'next/navigation'
import { useCliente } from '@/hooks/useCliente'
import { ClienteHeader } from '@/components/cliente/ClienteHeader'
import { ClienteTabs } from '@/components/cliente/ClienteTabs'

function ClienteSkeleton() {
  return (
    <div className="space-y-5">
      <div className="h-28 bg-surface-card border border-surface-border rounded-xl animate-pulse" />
      <div className="h-10 bg-surface-card border border-surface-border rounded-xl animate-pulse" />
      <div className="h-64 bg-surface-card border border-surface-border rounded-xl animate-pulse" />
    </div>
  )
}

export default function ClientePage() {
  const params = useParams()
  const id = Number(params.id)
  const { resumo, proximaAcao, loading, error } = useCliente(id)

  if (error) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-800/30 rounded-xl text-red-400 text-sm">
        {error}
      </div>
    )
  }

  if (loading || !resumo) return <ClienteSkeleton />

  return (
    <div className="space-y-5 max-w-4xl">
      <ClienteHeader
        resumo={resumo}
        ticket={null}
        score={null}
      />
      <ClienteTabs
        resumo={resumo}
        proximaAcao={proximaAcao}
        loadingAcao={loading}
      />
    </div>
  )
}
