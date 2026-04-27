export const FunilStatusCodigo = {
  LEAD: 'LEAD',
  QUALIFICADO: 'QUALIFICADO',
  PROPOSTA: 'PROPOSTA',
  NEGOCIACAO: 'NEGOCIACAO',
  FECHADO: 'FECHADO',
  PERDIDO: 'PERDIDO',
} as const
export type FunilStatusCodigo = (typeof FunilStatusCodigo)[keyof typeof FunilStatusCodigo]

export const StatusRecomendacao = {
  PENDENTE: 'PENDENTE',
  RESOLVIDA: 'RESOLVIDA',
  IGNORADA: 'IGNORADA',
  CONCLUIDA: 'CONCLUIDA',
} as const
export type StatusRecomendacao = (typeof StatusRecomendacao)[keyof typeof StatusRecomendacao]

export const TipoRecomendacao = {
  RECOMENDACAO_ABORDAGEM: 'RECOMENDACAO_ABORDAGEM',
  PROXIMA_ACAO: 'PROXIMA_ACAO',
  SUGESTAO_PROPOSTA: 'SUGESTAO_PROPOSTA',
  FOLLOWUP: 'FOLLOWUP',
  ALERTA_FUNIL: 'ALERTA_FUNIL',
  RISCO_PERDA: 'RISCO_PERDA',
  OPORTUNIDADE_CROSS_SELL: 'OPORTUNIDADE_CROSS_SELL',
} as const
export type TipoRecomendacao = (typeof TipoRecomendacao)[keyof typeof TipoRecomendacao]

export const TipoDorOportunidade = {
  DOR: 'DOR',
  OPORTUNIDADE: 'OPORTUNIDADE',
} as const
export type TipoDorOportunidade = (typeof TipoDorOportunidade)[keyof typeof TipoDorOportunidade]

export type Prioridade = 'ALTA' | 'MEDIA' | 'BAIXA'
