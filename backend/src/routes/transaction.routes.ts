import { Router } from "express";

import { TRANSACTIONS_PATH } from "../constants";
import { TransactionController } from "../controllers/transaction.controller";
import {
  batchUpdateTransactionCategoryRateLimiter,
  transactionsRateLimiter,
  updateTransactionCategoryRateLimiter,
} from "../middleware/rate-limit.middleware";

/**
 * Configures routes for transaction-related endpoints.
 */
export class TransactionRoutes {
  router = Router();
  private transactionController: TransactionController;

  constructor(transactionController: TransactionController) {
    this.transactionController = transactionController;
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(
      TRANSACTIONS_PATH,
      transactionsRateLimiter,
      this.transactionController.getTransactions,
    );

    this.router.patch(
      `${TRANSACTIONS_PATH}/category/batch`,
      batchUpdateTransactionCategoryRateLimiter,
      this.transactionController.batchUpdateTransactionCategory,
    );

    this.router.patch(
      `${TRANSACTIONS_PATH}/:id/category`,
      updateTransactionCategoryRateLimiter,
      this.transactionController.updateTransactionCategory,
    );
  }
}
