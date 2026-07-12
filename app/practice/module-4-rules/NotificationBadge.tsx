interface NotificationBadgeProps {
  count: number
  maxCount?: number
}

export const NotificationBadge = ({ count, maxCount = 99 }: NotificationBadgeProps) => {
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString()
  const label = `${count} notification${count === 1 ? '' : 's'}`

  return (
    <span
      aria-label={label}
      className="inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white shadow-sm"
    >
      {displayCount}
    </span>
  )
}
