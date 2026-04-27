import type { InteracaoResumo } from '@/types/api'
import { formatDate } from '@/lib/formatters'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/utils'

const TIPO_LABELS: Record<string, string> = {
  IA_ANALISE: 'Análise IA',
  REUNIAO: 'Reunião',
  IA_PROPOSTA: 'Proposta IA',
  FOLLOWUP: 'Follow-up',
}

const SENTIMENTO_STYLES: Record<string, string> = {
  positivo: 'text-green-400 bg-green-900/20 border-green-800/30',
  negativo: 'text-red-400 bg-red-900/20 border-red-800/30',
  neutro: 'text-neutral-400 bg-neutral-800 border-neutral-700',
}

interface TimelineTabProps {
  historico: InteracaoResumo[]
}

export function TimelineTab({ historico }: TimelineTabProps) {
  if (historico.length === 0) {
    return <EmptyState title="Nenhuma interação registrada" />
  }

  const sorted = [...historico].sort(
    (a, b) => new Date(b.realizada_em).getTime() - new Date(a.realizada_em).getTime(),
  )

  return (
    <div className="space-y-3">
      {sorted.map((item, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="size-2 rounded-full bg-brand-primary mt-1.5 shrink-0" />
            {i < sorted.length - 1 && <div className="w-px flex-1 bg-surface-border mt-1" />}
          </div>
          <div className="pb-4 min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-neutral-300">
                {TIPO_LABELS[item.tipo] ?? item.tipo}
              </span>
              <span className="text-[10px] text-neutral-600">{formatDate(item.realizada_em)}</span>
              {item.sentimento && (
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded border',
                    SENTIMENTO_STYLES[item.sentimento.toLowerCase()] ?? SENTIMENTO_STYLES.neutro,
                  )}
                >
                  {item.sentimento}
                </span>
              )}
            </div>
            {item.resumo && (
              <p className="text-xs text-neutral-400 leading-relaxed">{item.resumo}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
