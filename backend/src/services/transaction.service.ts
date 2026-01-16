import { NotFoundError } from "../errors/errors";
import type { ILogger } from "../logger";
import { Logger } from "../logger";
import type { ITransactionRepository } from "../repositories";
import type {
  BatchUpdateTransactionCategoryData,
  Transaction,
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

  async updateTransactionCategory(
    id: string,
    category: string,
  ): Promise<Transaction> {
    const traceId = generateTraceId();
    this.logger.info("Updating transaction category", {
      traceId,
      id,
      category,
    });

    const transaction = await this.transactionRepository.updateCategory(
      id,
      category,
    );

    if (!transaction) {
      this.logger.warn("Transaction not found", { traceId, id });
      throw new NotFoundError(`Transaction with id ${id} not found`);
    }

    this.logger.info("Transaction category updated", {
      traceId,
      id,
      category: transaction.category,
    });

    return transaction;
  }

  async batchUpdateTransactionCategory(
    ids: string[],
    category: string,
  ): Promise<BatchUpdateTransactionCategoryData> {
    const traceId = generateTraceId();
    this.logger.info("Batch updating transaction categories", {
      traceId,
      count: ids.length,
      category,
    });

    const transactions = await this.transactionRepository.batchUpdateCategory(
      ids,
      category,
    );

    if (transactions.length === 0) {
      this.logger.warn("No transactions found for batch update", {
        traceId,
        ids,
      });
      throw new NotFoundError("No transactions found for the provided IDs");
    }

    this.logger.info("Batch transaction categories updated", {
      traceId,
      requestedCount: ids.length,
      updatedCount: transactions.length,
    });

    return { transactions };
  }
}
