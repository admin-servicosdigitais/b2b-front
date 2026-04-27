'use client'

import { Columns2 } from 'lucide-react'
import { KanbanBoard } from '@/components/kanban/KanbanBoard'

export default function KanbanPage() {
  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Columns2 className="size-4 text-blue-400" />
          <h1 className="text-xl font-bold text-neutral-100">Kanban Comercial</h1>
        </div>
        <p className="text-sm text-neutral-500 ml-6">
          Gerencie e visualize o pipeline de vendas em tempo real
        </p>
      </div>
      <KanbanBoard />
    </div>
  )
}
