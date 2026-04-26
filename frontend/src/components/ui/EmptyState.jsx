import React from 'react';
import { cn } from '@/lib/cn';

/**
 * EmptyState component for displaying placeholder content
 */
export const EmptyState = React.forwardRef(({ title, description, icon, action, className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center rounded-3xl border-2 border-dashed border-secondary-200 dark:border-secondary-800 bg-secondary-50/30 dark:bg-secondary-900/10',
        className
      )}
      {...rest}
    >
      {icon && <div className="text-5xl mb-4 opacity-50">{icon}</div>}
      <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">{title}</h3>
      {description && <p className="text-secondary-600 dark:text-secondary-400 mb-6 max-w-sm">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';
