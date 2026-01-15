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
}
