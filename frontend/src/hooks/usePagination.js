/**
 * Custom Hook - Pagination Logic
 */

import { useState, useCallback, useMemo } from 'react';

export function usePagination(totalItems, initialPageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = useMemo(() => 
    Math.ceil(totalItems / pageSize), 
  [totalItems, pageSize]);

  const goToPage = useCallback((page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  }, [totalPages]);

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  const offset = (currentPage - 1) * pageSize;

  return {
    currentPage,
    pageSize,
    totalPages,
    offset,
    goToPage,
    nextPage,
    prevPage,
    setPageSize,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}
