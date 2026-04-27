import type { RecomendacaoOut } from '@/types/api'
import type { StatusRecomendacao } from '@/types/enums'
import { apiGet, apiPatch } from './api-client'

export const getAllRecomendacoes = (): Promise<RecomendacaoOut[]> =>
  apiGet<RecomendacaoOut[]>('/recomendacoes')

export const getRecomendacoesByCliente = (clienteId: number): Promise<RecomendacaoOut[]> =>
  apiGet<RecomendacaoOut[]>(`/recomendacoes/${clienteId}`)

export const updateRecomendacaoStatus = (
  id: number,
  status: StatusRecomendacao,
): Promise<RecomendacaoOut> =>
  apiPatch<RecomendacaoOut>(`/recomendacoes/${id}/status`, { status })
