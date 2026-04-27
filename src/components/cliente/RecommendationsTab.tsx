'use client'

import type { RecomendacaoOut } from '@/types/api'
import { StatusRecomendacao, type StatusRecomendacao as StatusType } from '@/types/enums'
import { useRecomendacoes } from '@/hooks/useRecomendacoes'
import { PriorityBadge } from '@/components/ui/PriorityBadge'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatDate } from '@/lib/formatters'

const STATUS_OPTIONS: { value: StatusType; label: string }[] = [
  { value: StatusRecomendacao.PENDENTE, label: 'Pendente' },
  { value: StatusRecomendacao.CONCLUIDA, label: 'Concluída' },
  { value: StatusRecomendacao.IGNORADA, label: 'Ignorada' },
  { value: StatusRecomendacao.RESOLVIDA, label: 'Resolvida' },
]

function RecomendacaoItem({ rec, onUpdate }: { rec: RecomendacaoOut; onUpdate: (id: number, s: StatusType) => void }) {
  return (
    <div className="bg-surface-elevated border border-surface-border rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-200">{rec.titulo}</p>
          {rec.descricao && (
            <p className="text-xs text-neutral-500 mt-1">{rec.descricao}</p>
          )}
        </div>
        <PriorityBadge prioridade={rec.prioridade} />
      </div>

      <div className="flex items-center justify-between gap-2 mt-3">
        <span className="text-[10px] text-neutral-600">{formatDate(rec.criada_em)}</span>
        <select
          value={rec.status}
          onChange={(e) => onUpdate(rec.id, e.target.value as StatusType)}
          className="text-xs bg-surface-card border border-surface-border text-neutral-300 rounded-lg px-2 py-1 outline-none focus:border-brand-primary cursor-pointer"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

interface RecommendationsTabProps {
  clienteId: number
}

export function RecommendationsTab({ clienteId }: RecommendationsTabProps) {
  const { recs, loading, updateStatus } = useRecomendacoes(clienteId)

  if (loading && recs.length === 0) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-surface-elevated animate-pulse rounded-xl" />
        ))}
      </div>
    )
  }

  if (recs.length === 0) {
    return <EmptyState title="Nenhuma recomendação para este cliente" />
  }

  return (
    <div className="space-y-3">
      {recs.map((rec) => (
        <RecomendacaoItem key={rec.id} rec={rec} onUpdate={updateStatus} />
      ))}
    </div>
  )
}
