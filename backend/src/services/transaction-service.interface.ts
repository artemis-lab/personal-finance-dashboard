import type {
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
}
