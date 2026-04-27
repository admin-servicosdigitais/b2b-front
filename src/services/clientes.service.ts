import type { ProximaAcaoResponse, ResumoClienteResponse } from '@/types/api'
import { apiGet } from './api-client'

export const getResumoCliente = (id: number): Promise<ResumoClienteResponse> =>
  apiGet<ResumoClienteResponse>(`/clientes/${id}/resumo`)

export const getProximaAcao = (id: number): Promise<ProximaAcaoResponse> =>
  apiGet<ProximaAcaoResponse>(`/clientes/${id}/proxima-acao`)
