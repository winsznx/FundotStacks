import { cn } from '@/lib/cn'

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
}

function initialsFrom(name) {
  if (!name) return '??'
  return name.slice(0, 2).toUpperCase()
}

export function Avatar({ name, src, alt, size = 'md', className }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'avatar'}
        className={cn('rounded-full object-cover', sizeMap[size], className)}
      />
    )
  }
  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-bold',
        sizeMap[size],
        className,
      )}
      aria-label={alt || name || 'avatar'}
    >
      {initialsFrom(name)}
    </div>
  )
}
