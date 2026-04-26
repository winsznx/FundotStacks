import React from 'react';
import { cn } from '@/lib/cn';

/**
 * Avatar component for user profile images or initials
 */
export const Avatar = React.forwardRef(({ src, alt, fallback, className, ...rest }, ref) => {
  const [error, setError] = React.useState(false);

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-secondary-100 dark:bg-secondary-800',
        className
      )}
      {...rest}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm font-medium text-secondary-600 dark:text-secondary-400">
          {fallback || alt?.charAt(0).toUpperCase() || '?'}
        </div>
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';
