import type { ChatResponse } from '@/types/api'
import { apiPost } from './api-client'

export const sendChat = (pergunta: string): Promise<ChatResponse> =>
  apiPost<ChatResponse>('/copiloto/chat', { pergunta })
