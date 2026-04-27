'use client'

import {
  DollarSign,
  TrendingUp,
  Clock,
  Target,
  AlertTriangle,
} from 'lucide-react'
import type { DashboardResponse } from '@/types/api'
import { KpiCard } from './KpiCard'
import { formatBRL, formatPercent } from '@/lib/formatters'

interface KpiGridProps {
  data: DashboardResponse
}

export function KpiGrid({ data }: KpiGridProps) {
  const kpis = [
    {
      label: 'Receita Potencial',
      value: data.ticket_total,
      format: formatBRL,
      icon: DollarSign,
    },
    {
      label: 'Receita Fechada',
      value: data.valor_fechado,
      format: formatBRL,
      icon: TrendingUp,
    },
    {
      label: 'Em Negociação',
      value: data.valor_em_negociacao,
      format: formatBRL,
      icon: Clock,
    },
    {
      label: 'Conversão do Funil',
      value: data.taxa_conversao,
      format: formatPercent,
      icon: Target,
    },
    {
      label: 'Ticket Médio',
      value: data.ticket_medio,
      format: formatBRL,
      icon: DollarSign,
    },
    {
      label: 'Clientes Sem Contato',
      value: data.clientes_sem_interacao,
      icon: AlertTriangle,
      trend: 'últimos 30 dias',
    },
  ] as const

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.label} {...kpi} />
      ))}
    </div>
  )
}
