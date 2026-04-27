'use client'

import { useEffect, useRef } from 'react'
import type { ChatMessage as ChatMessageType } from '@/types/ui'
import { ChatMessage } from './ChatMessage'

interface ChatWindowProps {
  messages: ChatMessageType[]
  pending: boolean
}

export function ChatWindow({ messages, pending }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, pending])

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 space-y-4">
      {messages.map((msg, i) => (
        <ChatMessage
          key={msg.id}
          message={msg}
          animate={msg.role === 'assistant' && i === messages.length - 1}
        />
      ))}

      {pending && (
        <div className="flex gap-2">
          <div className="size-7 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0">
            <span className="size-3.5 text-brand-accent text-xs">✦</span>
          </div>
          <div className="bg-surface-card border border-surface-border rounded-xl rounded-bl-sm px-4 py-3">
            <div className="flex gap-1 items-center h-4">
              <span className="size-1.5 rounded-full bg-neutral-600 animate-bounce [animation-delay:0ms]" />
              <span className="size-1.5 rounded-full bg-neutral-600 animate-bounce [animation-delay:150ms]" />
              <span className="size-1.5 rounded-full bg-neutral-600 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
