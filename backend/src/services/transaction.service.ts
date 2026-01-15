import type { ILogger } from "../logger";
import { Logger } from "../logger";
import type { ITransactionRepository } from "../repositories";
import type {
  TransactionListData,
  TransactionListQuery,
} from "../types/transaction.types";
import { generateTraceId } from "../utils/helpers";
import type { ITransactionService } from "./transaction-service.interface";

export class TransactionService implements ITransactionService {
  private logger: ILogger;
  private transactionRepository: ITransactionRepository;

  constructor(
    transactionRepository: ITransactionRepository,
    logger: ILogger = new Logger(),
  ) {
    this.transactionRepository = transactionRepository;
    this.logger = logger;
  }

  async getTransactions(
    query: TransactionListQuery,
  ): Promise<TransactionListData> {
    const traceId = generateTraceId();
    this.logger.info("Fetching transactions", { traceId, query });

    const { limit, offset } = query;

    const { transactions, total } =
      await this.transactionRepository.findAll(query);
    const hasMore = offset + limit < total;

    this.logger.info("Transactions fetched", {
      traceId,
      count: transactions.length,
      total,
      hasMore,
    });

    return {
      transactions,
      hasMore,
      total,
    };
  }
}
