import type { FunilStatusCodigo, StatusRecomendacao, TipoDorOportunidade, TipoRecomendacao } from './enums'

export interface FunilStatusOut {
  id: number
  codigo: FunilStatusCodigo
  nome: string
  ordem: number
}

export interface RecomendacaoOut {
  id: number
  cliente_id: number
  tipo: TipoRecomendacao
  titulo: string
  descricao: string | null
  justificativa: string | null
  prioridade: string | null
  status: StatusRecomendacao
  score_confianca: number | null
  criada_em: string
}

export interface ClienteKanbanCard {
  id: number
  nome_empresa: string
  segmento: string | null
  ticket_estimado: number | null
  score_conversao: number | null
  recomendacao_principal: string | null
}

export interface KanbanColuna {
  status: FunilStatusOut
  clientes: ClienteKanbanCard[]
}

export interface KanbanResponse {
  colunas: KanbanColuna[]
}

export interface DashboardResponse {
  total_clientes: number
  clientes_por_status: Record<string, number>
  ticket_total: number
  ticket_medio: number
  valor_em_negociacao: number
  valor_fechado: number
  taxa_conversao: number
  clientes_sem_interacao: number
  recomendacoes_pendentes: number
}

export interface DorOportunidadeOut {
  tipo: TipoDorOportunidade
  descricao: string
  impacto: string | null
  prioridade: string | null
}

export interface InteracaoResumo {
  tipo: string
  resumo: string | null
  sentimento: string | null
  realizada_em: string
}

export interface ResumoClienteResponse {
  cliente_id: number
  nome_empresa: string
  status_atual: string | null
  resumo_comercial: string
  historico: InteracaoResumo[]
  dores: DorOportunidadeOut[]
  oportunidades: DorOportunidadeOut[]
  recomendacao_principal: string | null
}

export interface ProximaAcaoResponse {
  acao: string
  justificativa: string
  prioridade: string
}

export interface ChatRequest {
  pergunta: string
}

export interface ChatResponse {
  pergunta: string
  resposta: string
}

export interface RecomendacaoStatusUpdate {
  status: StatusRecomendacao
}
