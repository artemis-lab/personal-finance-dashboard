import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTransactionCategory } from "../api";
import type { TransactionListData } from "../types";
import { TRANSACTIONS_QUERY_KEY } from "./constants";

interface UpdateCategoryVariables {
  id: string;
  category: string;
}

/**
 * Hook for updating a single transaction's category with optimistic updates.
 * Supports optimistic updates with automatic rollback on error.
 * @returns TanStack Query mutation with mutate function and status
 */
export const useUpdateTransactionCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, category }: UpdateCategoryVariables) =>
      updateTransactionCategory(id, { category }),
    onMutate: async ({ id, category }) => {
      await queryClient.cancelQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });

      const previousQueries = queryClient.getQueriesData<{
        pages: TransactionListData[];
        pageParams: number[];
      }>({ queryKey: [TRANSACTIONS_QUERY_KEY] });

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
              t.id === id
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
