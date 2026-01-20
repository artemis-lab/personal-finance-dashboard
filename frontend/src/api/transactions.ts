import type {
  BatchUpdateTransactionCategoryData,
  BatchUpdateTransactionCategoryRequest,
  TransactionListData,
  TransactionListQuery,
  UpdateTransactionCategoryData,
  UpdateTransactionCategoryRequest,
} from "../types";
import { apiClient } from "./client";

const TRANSACTIONS_PATH = "/transactions";

/**
 * Fetches a paginated list of transactions with optional filtering and sorting.
 * @param query - Query parameters for pagination, sorting, and filtering
 * @returns Promise resolving to transaction list with pagination metadata
 */
export async function fetchTransactions(
  query: TransactionListQuery,
): Promise<TransactionListData> {
  const params = new URLSearchParams();

  if (query.limit !== undefined) {
    params.set("limit", String(query.limit));
  }
  if (query.offset !== undefined) {
    params.set("offset", String(query.offset));
  }
  if (query.sortBy) {
    params.set("sortBy", query.sortBy);
  }
  if (query.sortOrder) {
    params.set("sortOrder", query.sortOrder);
  }
  if (query.yearMonth) {
    params.set("yearMonth", query.yearMonth);
  }

  const queryString = params.toString();
  const endpoint = `${TRANSACTIONS_PATH}${queryString ? `?${queryString}` : ""}`;

  return apiClient<TransactionListData>(endpoint);
}

/**
 * Updates the category of a single transaction.
 * @param id - Transaction ID to update
 * @param request - Request body containing the new category
 * @returns Promise resolving to the updated transaction
 */
export async function updateTransactionCategory(
  id: string,
  request: UpdateTransactionCategoryRequest,
): Promise<UpdateTransactionCategoryData> {
  return apiClient<UpdateTransactionCategoryData>(
    `${TRANSACTIONS_PATH}/${id}/category`,
    {
      method: "PATCH",
      body: JSON.stringify(request),
    },
  );
}

/**
 * Updates the category of multiple transactions in a single request.
 * @param request - Request body containing transaction IDs and new category
 * @returns Promise resolving to batch update result with success/failure counts
 */
export async function batchUpdateTransactionCategory(
  request: BatchUpdateTransactionCategoryRequest,
): Promise<BatchUpdateTransactionCategoryData> {
  return apiClient<BatchUpdateTransactionCategoryData>(
    `${TRANSACTIONS_PATH}/category/batch`,
    {
      method: "PATCH",
      body: JSON.stringify(request),
    },
  );
}
