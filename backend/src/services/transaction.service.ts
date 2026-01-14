import type { ILogger } from "../logger";
import { Logger } from "../logger";
import type {
  Transaction,
  TransactionListData,
  TransactionListQuery,
} from "../types/transaction.types";
import { generateTraceId } from "../utils/helpers";
import { MOCK_TRANSACTIONS } from "./mock-transactions";
import type { ITransactionService } from "./transaction-service.interface";

export class TransactionService implements ITransactionService {
  private logger: ILogger;
  private transactions: Transaction[] = MOCK_TRANSACTIONS;

  constructor(logger: ILogger = new Logger()) {
    this.logger = logger;
  }

  async getTransactions(
    query: TransactionListQuery,
  ): Promise<TransactionListData> {
    const traceId = generateTraceId();
    this.logger.info("Fetching transactions", { traceId, query });

    const { limit, offset, sortBy, sortOrder, yearMonth } = query;

    let filtered = [...this.transactions];

    // Filter by yearMonth if provided
    if (yearMonth) {
      filtered = filtered.filter((t) => t.date.startsWith(yearMonth));
    }

    // Sort transactions
    filtered.sort((a, b) => {
      const aValue = sortBy === "date" ? a.date : a.amount;
      const bValue = sortBy === "date" ? b.date : b.amount;

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    });

    const total = filtered.length;
    const paginated = filtered.slice(offset, offset + limit);
    const hasMore = offset + limit < total;

    this.logger.info("Transactions fetched", {
      traceId,
      count: paginated.length,
      total,
      hasMore,
    });

    return {
      transactions: paginated,
      hasMore,
      total,
    };
  }
}
