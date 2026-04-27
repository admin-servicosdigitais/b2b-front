import { cn } from '@/lib/utils'

interface EmptyStateProps {
  title: string
  description?: string
  className?: string
}

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 text-center',
        className,
      )}
    >
      <div className="size-12 rounded-full bg-surface-elevated flex items-center justify-center mb-3">
        <span className="text-2xl text-neutral-600">—</span>
      </div>
      <p className="text-sm font-medium text-neutral-400">{title}</p>
      {description && <p className="text-xs text-neutral-600 mt-1 max-w-xs">{description}</p>}
    </div>
  )
}
