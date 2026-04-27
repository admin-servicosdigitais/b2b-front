'use client'

import { Sparkles, AlertCircle } from 'lucide-react'
import { useRecomendacoes } from '@/hooks/useRecomendacoes'
import { PriorityBadge } from '@/components/ui/PriorityBadge'
import { truncate } from '@/lib/formatters'

export function AiInsightsSidebar() {
  const { recs, loading } = useRecomendacoes()

  const pendentes = recs.filter((r) => r.status === 'PENDENTE').slice(0, 5)

  return (
    <div className="bg-surface-card border border-surface-border rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-brand-accent" />
        <h3 className="text-sm font-semibold text-neutral-300">Insights IA</h3>
        {pendentes.length > 0 && (
          <span className="ml-auto text-[10px] font-semibold text-brand-accent bg-brand-accent/10 px-1.5 py-0.5 rounded">
            {pendentes.length} pendentes
          </span>
        )}
      </div>

      {loading && (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-surface-elevated animate-pulse rounded-lg" />
          ))}
        </div>
      )}

      {!loading && pendentes.length === 0 && (
        <div className="flex items-center gap-2 text-neutral-600 text-xs py-4">
          <AlertCircle className="size-4 shrink-0" />
          Nenhuma recomendação pendente
        </div>
      )}

      <div className="space-y-3">
        {pendentes.map((rec) => (
          <div
            key={rec.id}
            className="p-3 bg-surface-elevated rounded-lg border border-surface-border hover:border-neutral-500 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-xs font-medium text-neutral-200 leading-snug">
                {truncate(rec.titulo, 60)}
              </p>
              <PriorityBadge prioridade={rec.prioridade} />
            </div>
            {rec.descricao && (
              <p className="text-[11px] text-neutral-500 leading-snug">
                {truncate(rec.descricao, 80)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
