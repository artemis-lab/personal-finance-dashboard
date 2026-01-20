/** Source of the transaction category assignment */
export type CategorySource = "ai" | "user";

/** Type of financial transaction */
export type TransactionType = "credit" | "debit";

/** Represents a single financial transaction */
export interface Transaction {
  amount: number;
  date: string;
  description: string;
  id: string;
  merchant: string;
  transactionType: TransactionType;
  category: string;
  categorySource: CategorySource;
  account?: string;
  balance?: number;
  reference?: string;
  transactionMethod?: string;
}

/** Response data for paginated transaction list */
export interface TransactionListData {
  transactions: Transaction[];
  hasMore: boolean;
  total: number;
}

/** Query parameters for fetching transaction list */
export interface TransactionListQuery {
  limit?: number;
  offset?: number;
  sortBy?: "date" | "amount";
  sortOrder?: "asc" | "desc";
  yearMonth?: string;
}

/** Response data for single transaction category update */
export interface UpdateTransactionCategoryData {
  transaction: Transaction;
}

/** Request body for updating transaction category */
export interface UpdateTransactionCategoryRequest {
  category: string;
}

/** Response data for batch transaction category update */
export interface BatchUpdateTransactionCategoryData {
  transactions: Transaction[];
  failedIds: string[];
  requestedCount: number;
  updatedCount: number;
}

/** Request body for batch updating transaction categories */
export interface BatchUpdateTransactionCategoryRequest {
  ids: string[];
  category: string;
}
