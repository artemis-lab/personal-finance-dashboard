import { Router } from "express";

import { TRANSACTIONS_PATH } from "../constants";
import { TransactionController } from "../controllers/transaction.controller";
import type { ILogger } from "../logger";
import { transactionsRateLimiter } from "../middleware/rate-limit.middleware";

/**
 * Configures routes for transaction-related endpoints.
 */
export class TransactionRoutes {
  router = Router();
  private controller: TransactionController;

  constructor(controller?: TransactionController, logger?: ILogger) {
    this.controller =
      controller || new TransactionController(undefined, logger);
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(
      TRANSACTIONS_PATH,
      transactionsRateLimiter,
      this.controller.getTransactions,
    );
  }
}
