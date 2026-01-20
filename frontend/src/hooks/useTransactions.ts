import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchTransactions } from "../api";
import type { TransactionListQuery } from "../types";
import {
  DEFAULT_LIMIT,
  STALE_TIME_MS,
  TRANSACTIONS_QUERY_KEY,
} from "./constants";

/** Options for the useTransactions hook (excludes offset which is managed internally) */
export type UseTransactionsOptions = Omit<TransactionListQuery, "offset">;

/**
 * Hook for fetching paginated transactions with infinite scroll support.
 * Provides automatic pagination, caching, and refetching capabilities.
 * @param options - Query options for filtering and sorting transactions
 * @returns TanStack Query infinite query result with transactions data
 */
export const useTransactions = (options: UseTransactionsOptions = {}) => {
  const { limit = DEFAULT_LIMIT, sortBy, sortOrder, yearMonth } = options;

  return useInfiniteQuery({
    queryKey: [TRANSACTIONS_QUERY_KEY, { limit, sortBy, sortOrder, yearMonth }],
    queryFn: ({ pageParam = 0 }) =>
      fetchTransactions({
        limit,
        offset: pageParam,
        sortBy,
        sortOrder,
        yearMonth,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) {
        return undefined;
      }
      return allPages.length * limit;
    },
    staleTime: STALE_TIME_MS,
  });
};
