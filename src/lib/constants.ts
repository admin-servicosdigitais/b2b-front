import type { FunilStatusCodigo } from '@/types/enums'

export const FUNIL_LABELS: Record<FunilStatusCodigo, string> = {
  LEAD: 'Leads',
  QUALIFICADO: 'Qualificados',
  PROPOSTA: 'Proposta',
  NEGOCIACAO: 'Negociação',
  FECHADO: 'Fechado',
  PERDIDO: 'Perdido',
}

export const FUNIL_ORDER: FunilStatusCodigo[] = [
  'LEAD',
  'QUALIFICADO',
  'PROPOSTA',
  'NEGOCIACAO',
  'FECHADO',
]

export const PRIORITY_COLORS = {
  ALTA: 'text-brand-danger bg-brand-danger/10 border-brand-danger/20',
  MEDIA: 'text-brand-warning bg-brand-warning/10 border-brand-warning/20',
  BAIXA: 'text-brand-success bg-brand-success/10 border-brand-success/20',
} as const

export const SUGGESTED_QUESTIONS = [
  'Quais clientes têm maior risco de perda?',
  'Que ações devo priorizar hoje?',
  'Qual o ticket médio por segmento?',
  'Mostre as principais oportunidades desta semana',
]
