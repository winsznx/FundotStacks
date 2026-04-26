import React from 'react';
import { cn } from '@/lib/cn';

/**
 * Divider component for visual separation
 */
export const Divider = React.forwardRef(({ className, orientation = 'horizontal', ...rest }, ref) => {
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'bg-secondary-200 dark:bg-secondary-800 shrink-0',
        orientation === 'horizontal' ? 'h-[1px] w-full my-4' : 'w-[1px] h-full mx-4',
        className
      )}
      {...rest}
    />
  );
});

Divider.displayName = 'Divider';
