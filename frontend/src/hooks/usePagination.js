import { useMemo, useState } from 'react'
import { clamp } from '@/lib/number'

export function usePagination({ total, pageSize = 10, initialPage = 1 } = {}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const [page, setPage] = useState(() => clamp(initialPage, 1, pageCount))

  const safePage = clamp(page, 1, pageCount)

  const indices = useMemo(() => {
    const start = (safePage - 1) * pageSize
    const end = Math.min(start + pageSize, total)
    return { start, end }
  }, [safePage, pageSize, total])

  return {
    page: safePage,
    pageCount,
    pageSize,
    setPage: (next) => setPage(clamp(next, 1, pageCount)),
    next: () => setPage((p) => clamp(p + 1, 1, pageCount)),
    prev: () => setPage((p) => clamp(p - 1, 1, pageCount)),
    start: indices.start,
    end: indices.end,
  }
}
