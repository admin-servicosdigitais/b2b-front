'use client'

import { Sparkles } from 'lucide-react'
import { useDashboard } from '@/hooks/useDashboard'
import { KpiGrid } from '@/components/dashboard/KpiGrid'
import { SegmentChart } from '@/components/dashboard/SegmentChart'
import { ConversionFunnelChart } from '@/components/dashboard/ConversionFunnelChart'
import { AiInsightsSidebar } from '@/components/dashboard/AiInsightsSidebar'

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 bg-surface-card border border-surface-border rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-56 bg-surface-card border border-surface-border rounded-xl animate-pulse" />
        <div className="h-56 bg-surface-card border border-surface-border rounded-xl animate-pulse" />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { data, loading, error } = useDashboard()

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="size-4 text-brand-accent" />
          <h1 className="text-xl font-bold text-neutral-100">Dashboard Executivo</h1>
        </div>
        <p className="text-sm text-neutral-500 ml-6">
          Visão estratégica da sua operação comercial B2B
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-800/30 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading && !data && <DashboardSkeleton />}

      {data && (
        <div className="space-y-6">
          <KpiGrid data={data} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <SegmentChart data={data} />
              <ConversionFunnelChart data={data} />
            </div>
            <AiInsightsSidebar />
          </div>
        </div>
      )}
    </div>
  )
}
