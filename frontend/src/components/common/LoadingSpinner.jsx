import { cn } from '@/lib/cn'

const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
}

export function LoadingSpinner({ size = 'md', text = null, className }) {
    const label = text || 'Loading...'

    return (
        <div className={cn('flex flex-col items-center justify-center gap-3', className)} aria-live="polite">
            <div
                className={cn(sizeClasses[size], 'relative')}
                role="status"
                aria-label={label}
            >
                <div className="absolute inset-0 rounded-full border-4 border-primary-200 dark:border-primary-900"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent motion-safe:animate-spin"></div>
                <span className="sr-only">{label}</span>
            </div>
            {text && (
                <p className="text-sm text-secondary-600 dark:text-secondary-400 font-medium">
                    {text}
                </p>
            )}
        </div>
    )
}
