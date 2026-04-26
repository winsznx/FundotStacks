import React from 'react';
import { cn } from '@/lib/cn';

/**
 * InlineCode component for displaying code snippets
 */
export const InlineCode = React.forwardRef(({ className, children, ...rest }, ref) => {
  return (
    <code
      ref={ref}
      className={cn(
        'relative rounded bg-secondary-100 dark:bg-secondary-800 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-secondary-900 dark:text-secondary-100',
        className
      )}
      {...rest}
    >
      {children}
    </code>
  );
});

InlineCode.displayName = 'InlineCode';
