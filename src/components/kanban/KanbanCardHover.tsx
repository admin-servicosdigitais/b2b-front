'use client'

import { useCliente } from '@/hooks/useCliente'
import { truncate } from '@/lib/formatters'

interface KanbanCardHoverProps {
  clienteId: number
}

export function KanbanCardHoverContent({ clienteId }: KanbanCardHoverProps) {
  const { resumo, loading } = useCliente(clienteId)

  if (loading) {
    return (
      <div className="space-y-2 p-1">
        <div className="h-3 w-32 bg-neutral-700 animate-pulse rounded" />
        <div className="h-3 w-24 bg-neutral-700 animate-pulse rounded" />
      </div>
    )
  }

  if (!resumo) return null

  return (
    <div className="space-y-3 max-w-[260px]">
      {resumo.dores.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-1">Dores</p>
          <div className="flex flex-wrap gap-1">
            {resumo.dores.slice(0, 3).map((d, i) => (
              <span key={i} className="text-[11px] bg-red-900/20 text-red-300 px-1.5 py-0.5 rounded border border-red-800/30">
                {truncate(d.descricao, 40)}
              </span>
            ))}
          </div>
        </div>
      )}

      {resumo.oportunidades.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-green-400 uppercase tracking-wider mb-1">Oportunidades</p>
          <div className="flex flex-wrap gap-1">
            {resumo.oportunidades.slice(0, 3).map((o, i) => (
              <span key={i} className="text-[11px] bg-green-900/20 text-green-300 px-1.5 py-0.5 rounded border border-green-800/30">
                {truncate(o.descricao, 40)}
              </span>
            ))}
          </div>
        </div>
      )}

      {resumo.recomendacao_principal && (
        <div>
          <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider mb-1">Próxima Ação IA</p>
          <p className="text-[11px] text-neutral-300">{truncate(resumo.recomendacao_principal, 80)}</p>
        </div>
      )}
    </div>
  )
}
