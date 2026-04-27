import { Building2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { ResumoClienteResponse } from '@/types/api'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import { formatBRL } from '@/lib/formatters'

interface ClienteHeaderProps {
  resumo: ResumoClienteResponse
  ticket: number | null
  score: number | null
}

export function ClienteHeader({ resumo, ticket, score }: ClienteHeaderProps) {
  return (
    <div className="bg-surface-card border border-surface-border rounded-xl p-6">
      <Link
        href="/kanban"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 mb-4 transition-colors"
      >
        <ArrowLeft className="size-3" /> Voltar ao Kanban
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
            <Building2 className="size-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-100">{resumo.nome_empresa}</h1>
            {resumo.status_atual && (
              <div className="mt-1">
                <StatusBadge status={resumo.status_atual} />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {ticket !== null && (
            <div className="text-right">
              <p className="text-[10px] text-neutral-600 uppercase tracking-wider">Ticket</p>
              <p className="text-base font-bold text-brand-success">{formatBRL(ticket)}</p>
            </div>
          )}
          <div className="text-right">
            <p className="text-[10px] text-neutral-600 uppercase tracking-wider mb-1">Score IA</p>
            <ScoreBadge score={score} />
          </div>
        </div>
      </div>
    </div>
  )
}
