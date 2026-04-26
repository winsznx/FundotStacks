import React from 'react';
import { cn } from '@/lib/cn';

const variantMap = {
  info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
  success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
  warning: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100',
  danger: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100',
};

/**
 * Alert component for displaying feedback or information
 */
export const Alert = React.forwardRef(({ variant = 'info', title, className, children, onDismiss, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'rounded-2xl border p-4 flex items-start gap-3 transition-all animate-in fade-in slide-in-from-top-2',
        variantMap[variant],
        className,
      )}
      {...rest}
    >
      <div className="flex-1 space-y-1">
        {title && <p className="font-semibold leading-none tracking-tight">{title}</p>}
        {children && <div className="text-sm opacity-90">{children}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-lg leading-none opacity-60 hover:opacity-100 transition-opacity focus:outline-none"
          aria-label="Dismiss alert"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  );
});

Alert.displayName = 'Alert';
