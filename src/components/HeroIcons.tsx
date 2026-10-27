type Props = { className?: string }

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function ArrowIcon({ className = 'h-4 w-4' }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5" />
    </svg>
  )
}

export function ArrowUpRight({ className = 'h-4 w-4' }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  )
}

export function SparkArrow({ className = 'h-4 w-4' }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M12 3v18M3 12h18" />
    </svg>
  )
}
