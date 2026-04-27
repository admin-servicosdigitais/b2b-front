'use client'

import { MessageSquare, Trash2 } from 'lucide-react'
import { useCopiloto } from '@/hooks/useCopiloto'
import { ChatWindow } from '@/components/copiloto/ChatWindow'
import { ChatInput } from '@/components/copiloto/ChatInput'
import { SuggestedQuestions } from '@/components/copiloto/SuggestedQuestions'

function EmptyChat() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
      <div className="size-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-4">
        <MessageSquare className="size-7 text-brand-accent" />
      </div>
      <h2 className="text-lg font-semibold text-neutral-200 mb-2">Copiloto de Vendas B2B</h2>
      <p className="text-sm text-neutral-500 max-w-sm">
        Faça perguntas sobre sua carteira, identifique riscos e descubra oportunidades com IA.
      </p>
    </div>
  )
}

export default function CopilotoPage() {
  const { messages, pending, send, clearHistory } = useCopiloto()

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="flex items-center justify-between px-0 pb-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="size-4 text-brand-accent" />
            <h1 className="text-xl font-bold text-neutral-100">Copiloto IA</h1>
          </div>
          <p className="text-sm text-neutral-500 ml-6">Inteligência comercial sob demanda</p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            <Trash2 className="size-3.5" />
            Limpar histórico
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col bg-surface-card border border-surface-border rounded-xl overflow-hidden">
        {messages.length === 0 ? (
          <EmptyChat />
        ) : (
          <ChatWindow messages={messages} pending={pending} />
        )}
        <SuggestedQuestions onSelect={send} disabled={pending} />
        <ChatInput onSend={send} disabled={pending} />
      </div>
    </div>
  )
}
