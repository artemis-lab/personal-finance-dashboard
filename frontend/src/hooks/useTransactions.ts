import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchTransactions } from "../api";
import type { TransactionListQuery } from "../types";
import { DEFAULT_LIMIT, TRANSACTIONS_QUERY_KEY } from "./constants";

export type UseTransactionsOptions = Omit<TransactionListQuery, "offset">;

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
    staleTime: 30_000,
  });
};
