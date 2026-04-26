import React from 'react';
import { Button } from './Button';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { cn } from '@/lib/cn';

/**
 * CopyButton component for copying text to clipboard with feedback
 */
export const CopyButton = React.forwardRef(({ text, className, children, ...rest }, ref) => {
  const { isCopied, copy } = useCopyToClipboard();

  return (
    <Button
      ref={ref}
      variant="outline"
      size="sm"
      onClick={() => copy(text)}
      className={cn('min-w-[80px]', className)}
      {...rest}
    >
      {isCopied ? 'Copied!' : children || 'Copy'}
    </Button>
  );
});

CopyButton.displayName = 'CopyButton';
