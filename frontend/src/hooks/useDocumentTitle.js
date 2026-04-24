/**
 * Custom Hook - Document Title Management
 */

import { useEffect, useRef } from 'react';

export function useDocumentTitle(title, retainOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title ? `${title} | FundotStacks` : 'FundotStacks';
  }, [title]);

  useEffect(() => {
    return () => {
      if (!retainOnUnmount) {
        document.title = defaultTitle.current;
      }
    };
  }, [retainOnUnmount]);
}
