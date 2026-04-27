'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { DashboardResponse } from '@/types/api'
import { FUNIL_LABELS } from '@/lib/constants'
import type { FunilStatusCodigo } from '@/types/enums'

interface SegmentChartProps {
  data: DashboardResponse
}

export function SegmentChart({ data }: SegmentChartProps) {
  const chartData = Object.entries(data.clientes_por_status).map(([key, value]) => ({
    name: FUNIL_LABELS[key as FunilStatusCodigo] ?? key,
    clientes: value,
  }))

  return (
    <div className="bg-surface-card border border-surface-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-neutral-300 mb-4">Clientes por Estágio</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="#404040" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#737373', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#737373', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={30}
          />
          <Tooltip
            contentStyle={{ background: '#171717', border: '1px solid #404040', borderRadius: 8 }}
            labelStyle={{ color: '#e5e5e5', fontSize: 12 }}
            itemStyle={{ color: '#60a5fa', fontSize: 12 }}
          />
          <Bar dataKey="clientes" fill="#1e40af" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
