import type {
  Transaction,
  TransactionListQuery,
} from "../types/transaction.types";

/**
 * Repository interface for transaction data access.
 * Provides abstraction over the underlying data storage mechanism.
 */
export interface ITransactionRepository {
  /**
   * Retrieves a paginated list of transactions based on query parameters.
   *
   * @param query - Query parameters for filtering, sorting, and pagination
   * @param query.limit - Maximum number of transactions to return
   * @param query.offset - Number of transactions to skip
   * @param query.sortBy - Field to sort by ("date" or "amount")
   * @param query.sortOrder - Sort direction ("asc" or "desc")
   * @param query.yearMonth - Optional filter by year-month (format: "YYYY-MM")
   * @returns Promise containing array of transactions and total count
   */
  findAll(
    query: TransactionListQuery,
  ): Promise<{ transactions: Transaction[]; total: number }>;

  /**
   * Updates a transaction's category.
   *
   * @param id - The transaction ID (UUID)
   * @param category - The new category name
   * @returns Promise containing the updated transaction or null if not found
   */
  updateCategory(id: string, category: string): Promise<Transaction | null>;

  /**
   * Updates multiple transactions' categories in a single operation.
   *
   * @param ids - Array of transaction IDs (UUIDs)
   * @param category - The new category name
   * @returns Promise containing array of updated transactions
   */
  batchUpdateCategory(ids: string[], category: string): Promise<Transaction[]>;
}
