import React from 'react';
import { cn } from '@/lib/cn';

/**
 * FieldError component for displaying form validation errors
 */
export const FieldError = React.forwardRef(({ error, className, ...rest }, ref) => {
  if (!error) return null;

  return (
    <p
      ref={ref}
      className={cn('mt-1.5 text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1', className)}
      {...rest}
    >
      {typeof error === 'string' ? error : error.message}
    </p>
  );
});

FieldError.displayName = 'FieldError';
