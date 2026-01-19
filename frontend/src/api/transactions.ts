import type { TransactionListData, TransactionListQuery } from "../types";
import { apiClient } from "./client";

const TRANSACTIONS_PATH = "/transactions";

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
