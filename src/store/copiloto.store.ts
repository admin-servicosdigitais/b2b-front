import { create } from 'zustand'
import type { ChatMessage } from '@/types/ui'
import { sendChat } from '@/services/copiloto.service'
import { ApiError } from '@/services/api-client'

interface CopilotoState {
  messages: ChatMessage[]
  pending: boolean
  error: string | null
  send: (pergunta: string) => Promise<void>
  clearHistory: () => void
}

function makeId() {
  return Math.random().toString(36).slice(2)
}

export const useCopilotoStore = create<CopilotoState>((set, get) => ({
  messages: [],
  pending: false,
  error: null,
  send: async (pergunta) => {
    if (get().pending) return

    const userMessage: ChatMessage = {
      id: makeId(),
      role: 'user',
      content: pergunta,
      timestamp: new Date(),
    }

    set((s) => ({ messages: [...s.messages, userMessage], pending: true, error: null }))

    try {
      const response = await sendChat(pergunta)
      const assistantMessage: ChatMessage = {
        id: makeId(),
        role: 'assistant',
        content: response.resposta,
        timestamp: new Date(),
      }
      set((s) => ({ messages: [...s.messages, assistantMessage], pending: false }))
    } catch (err) {
      const detail = err instanceof ApiError ? err.detail : 'Erro ao consultar copiloto'
      const errorMessage: ChatMessage = {
        id: makeId(),
        role: 'assistant',
        content: `Erro: ${detail}`,
        timestamp: new Date(),
      }
      set((s) => ({ messages: [...s.messages, errorMessage], pending: false, error: detail }))
    }
  },
  clearHistory: () => set({ messages: [], error: null }),
}))
