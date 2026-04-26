import React from 'react';
import { cn } from '@/lib/cn';

/**
 * Basic Dialog component for modals
 */
export const Dialog = React.forwardRef(({ isOpen, onClose, title, children, className, ...rest }, ref) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-secondary-950/40 backdrop-blur-sm animate-in fade-in" 
        onClick={onClose} 
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className={cn(
          'relative w-full max-w-lg rounded-3xl bg-white dark:bg-secondary-900 p-6 shadow-2xl animate-in zoom-in-95 duration-200 border border-secondary-200 dark:border-secondary-800',
          className
        )}
        {...rest}
      >
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h2 id="dialog-title" className="text-xl font-bold text-secondary-900 dark:text-white">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
            aria-label="Close dialog"
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
});

Dialog.displayName = 'Dialog';
