'use client'

import { useEffect, useState } from 'react'
import { Sparkles, User } from 'lucide-react'
import type { ChatMessage as ChatMessageType } from '@/types/ui'

interface ChatMessageProps {
  message: ChatMessageType
  animate?: boolean
}

function renderContent(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-neutral-100">{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

export function ChatMessage({ message, animate = false }: ChatMessageProps) {
  const [displayed, setDisplayed] = useState(animate ? '' : message.content)

  useEffect(() => {
    if (!animate || message.role !== 'assistant') return
    let i = 0
    const id = setInterval(() => {
      i += 2
      setDisplayed(message.content.slice(0, i))
      if (i >= message.content.length) clearInterval(id)
    }, 12)
    return () => clearInterval(id)
  }, [message.content, animate, message.role])

  if (message.role === 'user') {
    return (
      <div className="flex justify-end gap-2">
        <div className="max-w-lg bg-brand-primary rounded-xl rounded-br-sm px-4 py-2.5">
          <p className="text-sm text-white leading-relaxed">{message.content}</p>
        </div>
        <div className="size-7 rounded-full bg-surface-elevated flex items-center justify-center shrink-0 mt-0.5">
          <User className="size-3.5 text-neutral-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <div className="size-7 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles className="size-3.5 text-brand-accent" />
      </div>
      <div className="max-w-2xl bg-surface-card border border-surface-border rounded-xl rounded-bl-sm px-4 py-3">
        <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
          {renderContent(displayed)}
          {animate && displayed.length < message.content.length && (
            <span className="inline-block size-1.5 rounded-full bg-brand-accent ml-1 animate-pulse" />
          )}
        </p>
      </div>
    </div>
  )
}
