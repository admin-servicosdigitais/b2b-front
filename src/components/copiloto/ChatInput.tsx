'use client'

import { useRef, type KeyboardEvent } from 'react'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSend: (text: string) => void
  disabled: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    const text = ref.current?.value.trim()
    if (!text || disabled) return
    onSend(text)
    if (ref.current) ref.current.value = ''
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-surface-border bg-surface-card px-4 py-3">
      <div className="flex gap-3 items-end">
        <textarea
          ref={ref}
          rows={1}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          placeholder="Pergunte ao Copiloto IA... (Enter para enviar)"
          className={cn(
            'flex-1 resize-none bg-surface-elevated border border-surface-border rounded-xl px-4 py-2.5',
            'text-sm text-neutral-200 placeholder:text-neutral-600',
            'outline-none focus:border-brand-primary transition-colors',
            'min-h-[42px] max-h-32 scrollbar-thin',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
          style={{ fieldSizing: 'content' } as React.CSSProperties}
        />
        <button
          onClick={handleSend}
          disabled={disabled}
          className={cn(
            'size-10 shrink-0 rounded-xl flex items-center justify-center transition-all',
            disabled
              ? 'bg-surface-elevated text-neutral-600 cursor-not-allowed'
              : 'bg-brand-primary hover:bg-blue-700 text-white',
          )}
          aria-label="Enviar mensagem"
        >
          <Send className="size-4" />
        </button>
      </div>
    </div>
  )
}
