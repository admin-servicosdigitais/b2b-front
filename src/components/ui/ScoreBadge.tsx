import { cn } from '@/lib/utils'

interface ScoreBadgeProps {
  score: number | null
  className?: string
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  if (score === null) return <span className="text-neutral-600 text-xs">—</span>

  const color =
    score >= 80
      ? 'bg-brand-success/10 text-green-400 border-brand-success/20'
      : score >= 50
        ? 'bg-brand-warning/10 text-yellow-400 border-brand-warning/20'
        : 'bg-brand-danger/10 text-red-400 border-brand-danger/20'

  return (
    <span
      className={cn(
        'inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold border',
        color,
        className,
      )}
    >
      {score}%
    </span>
  )
}
