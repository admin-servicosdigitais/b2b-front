'use client'

import { useCopilotoStore } from '@/store/copiloto.store'

export function useCopiloto() {
  const { messages, pending, error, send, clearHistory } = useCopilotoStore()
  return { messages, pending, error, send, clearHistory }
}
