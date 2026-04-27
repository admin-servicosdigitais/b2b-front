import { Sparkles, AlertCircle, TrendingUp, Zap } from 'lucide-react'
import type { ProximaAcaoResponse, ResumoClienteResponse } from '@/types/api'
import { PriorityBadge } from '@/components/ui/PriorityBadge'

interface AiSummaryTabProps {
  resumo: ResumoClienteResponse
  proximaAcao: ProximaAcaoResponse | null
  loadingAcao: boolean
}

export function AiSummaryTab({ resumo, proximaAcao, loadingAcao }: AiSummaryTabProps) {
  return (
    <div className="space-y-5">
      <div className="bg-surface-elevated rounded-xl p-5 border border-surface-border">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="size-4 text-brand-accent" />
          <h3 className="text-sm font-semibold text-neutral-300">Resumo Comercial IA</h3>
        </div>
        <p className="text-sm text-neutral-300 leading-relaxed">{resumo.resumo_comercial}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resumo.dores.length > 0 && (
          <div className="bg-surface-elevated rounded-xl p-4 border border-surface-border">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="size-4 text-brand-danger" />
              <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider">Dores</h4>
            </div>
            <ul className="space-y-2">
              {resumo.dores.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-brand-danger mt-1.5 shrink-0" />
                  <span className="text-xs text-neutral-300">{d.descricao}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {resumo.oportunidades.length > 0 && (
          <div className="bg-surface-elevated rounded-xl p-4 border border-surface-border">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="size-4 text-brand-success" />
              <h4 className="text-xs font-semibold text-green-400 uppercase tracking-wider">Oportunidades</h4>
            </div>
            <ul className="space-y-2">
              {resumo.oportunidades.map((o, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-brand-success mt-1.5 shrink-0" />
                  <span className="text-xs text-neutral-300">{o.descricao}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="size-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-blue-400">Próxima Ação Recomendada</h3>
        </div>
        {loadingAcao && (
          <div className="h-12 bg-surface-elevated animate-pulse rounded-lg" />
        )}
        {proximaAcao && (
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-neutral-200">{proximaAcao.acao}</p>
              <PriorityBadge prioridade={proximaAcao.prioridade} />
            </div>
            <p className="text-xs text-neutral-500">{proximaAcao.justificativa}</p>
          </div>
        )}
      </div>
    </div>
  )
}
