import { SUGGESTED_QUESTIONS } from '@/lib/constants'

interface SuggestedQuestionsProps {
  onSelect: (q: string) => void
  disabled: boolean
}

export function SuggestedQuestions({ onSelect, disabled }: SuggestedQuestionsProps) {
  return (
    <div className="px-4 pb-3 flex flex-wrap gap-2">
      {SUGGESTED_QUESTIONS.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          disabled={disabled}
          className="text-xs px-3 py-1.5 rounded-full bg-surface-elevated border border-surface-border
                     text-neutral-400 hover:text-neutral-200 hover:border-neutral-500 hover:bg-surface-border
                     transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {q}
        </button>
      ))}
    </div>
  )
}
