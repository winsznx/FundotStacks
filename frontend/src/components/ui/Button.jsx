import React from 'react';
import { cn } from '@/lib/cn';

const sizeMap = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-5 py-3 text-base rounded-2xl',
  xl: 'px-6 py-3.5 text-lg rounded-2xl',
};

const variantMap = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-400 shadow-sm shadow-primary-500/20',
  secondary: 'bg-secondary-200 text-secondary-900 hover:bg-secondary-300 dark:bg-secondary-800 dark:text-white dark:hover:bg-secondary-700 focus-visible:ring-secondary-400',
  outline: 'border border-secondary-300 dark:border-secondary-700 text-secondary-900 dark:text-white hover:bg-secondary-100 dark:hover:bg-secondary-800 focus-visible:ring-secondary-400',
  ghost: 'text-secondary-900 dark:text-white hover:bg-secondary-100 dark:hover:bg-secondary-800 focus-visible:ring-secondary-400',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-400 shadow-sm shadow-red-500/20',
};

/**
 * Button component with support for loading states and custom tags
 */
export const Button = React.forwardRef(({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  loading = false,
  children,
  ...rest
}, ref) => {
  const isButton = Tag === 'button';
  
  return (
    <Tag
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-secondary-950',
        sizeMap[size],
        variantMap[variant],
        className,
      )}
      disabled={isButton ? disabled || loading : undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && (
        <span
          className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </Tag>
  );
});

Button.displayName = 'Button';
