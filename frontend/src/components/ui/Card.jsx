import React from 'react';
import { cn } from '@/lib/cn';

/**
 * Card component for grouping content
 */
export const Card = React.forwardRef(({ as: Tag = 'div', className, hoverable = false, children, ...rest }, ref) => {
  return (
    <Tag
      ref={ref}
      className={cn(
        'rounded-3xl bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 shadow-sm overflow-hidden',
        hoverable && 'transition-all hover:shadow-md hover:border-secondary-300 dark:hover:border-secondary-700',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
});

Card.displayName = 'Card';

export const CardHeader = React.forwardRef(({ className, children, ...rest }, ref) => (
  <div ref={ref} className={cn('p-6 border-b border-secondary-200 dark:border-secondary-800 bg-secondary-50/50 dark:bg-secondary-800/20', className)} {...rest}>
    {children}
  </div>
));
CardHeader.displayName = 'CardHeader';

export const CardBody = React.forwardRef(({ className, children, ...rest }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...rest}>
    {children}
  </div>
));
CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef(({ className, children, ...rest }, ref) => (
  <div ref={ref} className={cn('p-6 border-t border-secondary-200 dark:border-secondary-800 bg-secondary-50/50 dark:bg-secondary-800/20', className)} {...rest}>
    {children}
  </div>
));
CardFooter.displayName = 'CardFooter';
