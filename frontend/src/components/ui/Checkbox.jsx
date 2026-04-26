import React from 'react';
import { cn } from '@/lib/cn';

/**
 * Custom Checkbox component
 */
export const Checkbox = React.forwardRef(({ className, label, id, ...rest }, ref) => {
  const generatedId = React.useId();
  const checkboxId = id || generatedId;

  return (
    <div className="flex items-center gap-2">
      <input
        ref={ref}
        id={checkboxId}
        type="checkbox"
        className={cn(
          'h-4 w-4 rounded border-secondary-300 dark:border-secondary-700 text-primary-500 focus:ring-primary-400 transition-colors bg-white dark:bg-secondary-900',
          className,
        )}
        {...rest}
      />
      {label && (
        <label htmlFor={checkboxId} className="text-sm font-medium text-secondary-700 dark:text-secondary-300 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
