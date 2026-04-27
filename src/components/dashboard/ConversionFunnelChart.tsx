'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { DashboardResponse } from '@/types/api'
import { FUNIL_ORDER, FUNIL_LABELS } from '@/lib/constants'
import type { FunilStatusCodigo } from '@/types/enums'

interface ConversionFunnelChartProps {
  data: DashboardResponse
}

const FUNNEL_COLORS = ['#1e40af', '#2563eb', '#3b82f6', '#f97316', '#22c55e']

export function ConversionFunnelChart({ data }: ConversionFunnelChartProps) {
  const chartData = FUNIL_ORDER.filter((k) => k in data.clientes_por_status).map((key, i) => ({
    name: FUNIL_LABELS[key as FunilStatusCodigo],
    value: data.clientes_por_status[key] ?? 0,
    color: FUNNEL_COLORS[i] ?? '#3b82f6',
  }))

  return (
    <div className="bg-surface-card border border-surface-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-neutral-300 mb-4">Funil de Conversão</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} layout="vertical" barSize={16}>
          <CartesianGrid strokeDasharray="3 3" stroke="#404040" horizontal={false} />
          <XAxis type="number" tick={{ fill: '#737373', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#a3a3a3', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={80}
          />
          <Tooltip
            contentStyle={{ background: '#171717', border: '1px solid #404040', borderRadius: 8 }}
            labelStyle={{ color: '#e5e5e5', fontSize: 12 }}
            itemStyle={{ color: '#60a5fa', fontSize: 12 }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
