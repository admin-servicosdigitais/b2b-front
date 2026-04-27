'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ResumoClienteResponse, ProximaAcaoResponse } from '@/types/api'
import { AiSummaryTab } from './AiSummaryTab'
import { TimelineTab } from './TimelineTab'
import { RecommendationsTab } from './RecommendationsTab'

interface ClienteTabsProps {
  resumo: ResumoClienteResponse
  proximaAcao: ProximaAcaoResponse | null
  loadingAcao: boolean
}

export function ClienteTabs({ resumo, proximaAcao, loadingAcao }: ClienteTabsProps) {
  return (
    <Tabs defaultValue="resumo">
      <TabsList className="bg-surface-card border border-surface-border rounded-xl p-1 w-full gap-1">
        <TabsTrigger value="resumo" className="flex-1 text-xs rounded-lg data-[state=active]:bg-brand-primary data-[state=active]:text-white">
          Resumo IA
        </TabsTrigger>
        <TabsTrigger value="timeline" className="flex-1 text-xs rounded-lg data-[state=active]:bg-brand-primary data-[state=active]:text-white">
          Timeline
        </TabsTrigger>
        <TabsTrigger value="recomendacoes" className="flex-1 text-xs rounded-lg data-[state=active]:bg-brand-primary data-[state=active]:text-white">
          Recomendações
        </TabsTrigger>
      </TabsList>

      <TabsContent value="resumo" className="mt-4">
        <AiSummaryTab resumo={resumo} proximaAcao={proximaAcao} loadingAcao={loadingAcao} />
      </TabsContent>

      <TabsContent value="timeline" className="mt-4">
        <TimelineTab historico={resumo.historico} />
      </TabsContent>

      <TabsContent value="recomendacoes" className="mt-4">
        <RecommendationsTab clienteId={resumo.cliente_id} />
      </TabsContent>
    </Tabs>
  )
}
