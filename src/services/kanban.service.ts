import type { KanbanResponse } from '@/types/api'
import { apiGet } from './api-client'

export const getKanban = (): Promise<KanbanResponse> =>
  apiGet<KanbanResponse>('/kanban')
