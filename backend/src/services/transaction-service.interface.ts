import type {
  BatchUpdateTransactionCategoryData,
  Transaction,
  TransactionListData,
  TransactionListQuery,
} from "../types/transaction.types";

/**
 * Service interface for transaction operations.
 */
export interface ITransactionService {
  /**
   * Retrieves a paginated list of transactions based on query parameters.
   *
   * @param query - Query parameters for filtering and pagination
   * @returns Promise resolving to transaction list data with pagination info
   */
  getTransactions(query: TransactionListQuery): Promise<TransactionListData>;

  /**
   * Updates a transaction's category.
   *
   * @param id - The transaction ID (UUID)
   * @param category - The new category name
   * @returns Promise resolving to the updated transaction
   * @throws NotFoundError if transaction doesn't exist
   */
  updateTransactionCategory(id: string, category: string): Promise<Transaction>;

  /**
   * Updates multiple transactions' categories in a single operation.
   *
   * @param ids - Array of transaction IDs (UUIDs)
   * @param category - The new category name
   * @returns Promise resolving to updated count and transactions
   * @throws NotFoundError if no transactions were found for any of the IDs
   */
  batchUpdateTransactionCategory(
    ids: string[],
    category: string,
  ): Promise<BatchUpdateTransactionCategoryData>;
}
