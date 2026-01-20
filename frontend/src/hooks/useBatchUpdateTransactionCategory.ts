import { useMutation, useQueryClient } from "@tanstack/react-query";

import { batchUpdateTransactionCategory } from "../api";
import type { TransactionListData } from "../types";
import { TRANSACTIONS_QUERY_KEY } from "./constants";

interface BatchUpdateCategoryVariables {
  ids: string[];
  category: string;
}

/**
 * Hook for updating multiple transactions' categories in a single operation.
 * Supports optimistic updates with automatic rollback on error.
 * @returns TanStack Query mutation with mutate function and status
 */
export const useBatchUpdateTransactionCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ids, category }: BatchUpdateCategoryVariables) =>
      batchUpdateTransactionCategory({ ids, category }),
    onMutate: async ({ ids, category }) => {
      await queryClient.cancelQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });

      const previousQueries = queryClient.getQueriesData<{
        pages: TransactionListData[];
        pageParams: number[];
      }>({ queryKey: [TRANSACTIONS_QUERY_KEY] });

      const idsSet = new Set(ids);

      queryClient.setQueriesData<{
        pages: TransactionListData[];
        pageParams: number[];
      }>({ queryKey: [TRANSACTIONS_QUERY_KEY] }, (old) => {
        if (!old) {
          return old;
        }
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            transactions: page.transactions.map((t) =>
              idsSet.has(t.id)
                ? { ...t, category, categorySource: "user" as const }
                : t,
            ),
          })),
        };
      });

      return { previousQueries };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousQueries) {
        for (const [queryKey, data] of context.previousQueries) {
          queryClient.setQueryData(queryKey, data);
        }
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });
    },
  });
};
