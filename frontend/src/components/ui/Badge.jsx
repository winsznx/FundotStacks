import React from 'react';
import { cn } from '@/lib/cn';

const variantMap = {
  neutral: 'bg-secondary-200 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-100',
  success: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200',
  danger: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
};

/**
 * Badge component for small status indicators
 */
export const Badge = React.forwardRef(({ variant = 'neutral', className, children, ...rest }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors',
        variantMap[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
