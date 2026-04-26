import React from 'react';
import { cn } from '@/lib/cn';

/**
 * Drawer component for side panels
 */
export const Drawer = React.forwardRef(({ isOpen, onClose, title, children, side = 'right', className, ...rest }, ref) => {
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

  const sideClasses = {
    right: 'inset-y-0 right-0 h-full w-full max-w-sm border-l slide-in-from-right',
    left: 'inset-y-0 left-0 h-full w-full max-w-sm border-r slide-in-from-left',
    bottom: 'inset-x-0 bottom-0 w-full h-[40vh] border-t slide-in-from-bottom',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-secondary-950/40 backdrop-blur-sm animate-in fade-in" 
        onClick={onClose} 
      />
      <div
        ref={ref}
        className={cn(
          'fixed bg-white dark:bg-secondary-900 p-6 shadow-2xl animate-in duration-300 border-secondary-200 dark:border-secondary-800',
          sideClasses[side],
          className
        )}
        {...rest}
      >
        <div className="flex items-center justify-between mb-6">
          {title && <h2 className="text-xl font-bold">{title}</h2>}
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
});

Drawer.displayName = 'Drawer';
