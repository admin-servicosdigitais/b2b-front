'use client'

import { Swords, TrendingUp, FileText, Trophy, AlertTriangle, Users } from 'lucide-react'
import { useSalaDeGuerra } from '@/hooks/useSalaDeGuerra'
import { WarPanel } from '@/components/sala-de-guerra/WarPanel'
import { ClientListItem } from '@/components/sala-de-guerra/ClientListItem'
import { EmptyState } from '@/components/ui/EmptyState'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { formatBRL } from '@/lib/formatters'

export default function SalaDeGuerraPage() {
  const {
    negociacoesTravadas,
    propostasParadas,
    topOportunidades,
    projecaoMensal,
    semContato,
    loading,
  } = useSalaDeGuerra()

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-52 bg-surface-card border border-surface-border rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Swords className="size-4 text-brand-danger" />
          <h1 className="text-xl font-bold text-neutral-100">Sala de Guerra Comercial</h1>
        </div>
        <p className="text-sm text-neutral-500 ml-6">
          Painel executivo em tempo real da operação de vendas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WarPanel
          title="Negociações Travadas"
          icon={AlertTriangle}
          iconColor="text-brand-accent"
          count={negociacoesTravadas.length}
          className="max-h-64"
        >
          {negociacoesTravadas.length === 0 ? (
            <EmptyState title="Nenhuma negociação travada" />
          ) : (
            negociacoesTravadas.map((c) => <ClientListItem key={c.id} card={c} />)
          )}
        </WarPanel>

        <WarPanel
          title="Propostas Paradas"
          icon={FileText}
          iconColor="text-brand-warning"
          count={propostasParadas.length}
          className="max-h-64"
        >
          {propostasParadas.length === 0 ? (
            <EmptyState title="Nenhuma proposta parada" />
          ) : (
            propostasParadas.map((c) => <ClientListItem key={c.id} card={c} />)
          )}
        </WarPanel>

        <WarPanel
          title="Top Oportunidades"
          icon={Trophy}
          iconColor="text-brand-success"
          count={topOportunidades.length}
          className="max-h-64"
        >
          {topOportunidades.length === 0 ? (
            <EmptyState title="Nenhuma oportunidade identificada" />
          ) : (
            topOportunidades.map((c) => <ClientListItem key={c.id} card={c} />)
          )}
        </WarPanel>

        <div className="grid grid-rows-2 gap-4">
          <div className="bg-surface-card border border-surface-border rounded-xl p-5 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-brand-success" />
              <h3 className="text-sm font-semibold text-neutral-300">Projeção Mensal</h3>
            </div>
            <p className="text-3xl font-bold text-brand-success">
              <AnimatedNumber value={projecaoMensal} format={formatBRL} />
            </p>
            <p className="text-xs text-neutral-600">Receita fechada + em negociação</p>
          </div>

          <div className="bg-surface-card border border-surface-border rounded-xl p-5 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-brand-danger" />
              <h3 className="text-sm font-semibold text-neutral-300">Clientes Sem Contato</h3>
            </div>
            <p className="text-3xl font-bold text-brand-danger">
              <AnimatedNumber value={semContato} />
            </p>
            <p className="text-xs text-neutral-600">Sem interação nos últimos 30 dias</p>
          </div>
        </div>
      </div>
    </div>
  )
}
