import type { NextFunction, Request, Response } from "express";

import type { ITransactionService } from "../services";
import type { TransactionListResponse } from "../types/transaction.types";
import { transactionListQuerySchema } from "../validators/transaction.validator";

/**
 * Controller for handling transaction-related HTTP requests.
 */
export class TransactionController {
  private transactionService: ITransactionService;

  constructor(transactionService: ITransactionService) {
    this.transactionService = transactionService;
  }

  /**
   * Retrieves a paginated list of transactions.
   *
   * @param request - Express request with optional query parameters:
   *   - `limit` - Number of transactions to return (default: 30, max: 100)
   *   - `offset` - Number of transactions to skip (default: 0)
   *   - `sortBy` - Sort field: "date" or "amount" (default: "date")
   *   - `sortOrder` - Sort direction: "asc" or "desc" (default: "desc")
   *   - `yearMonth` - Filter by month in "YYYY-MM" format
   * @param response - Express response containing the transaction list
   * @param next - Express next function for error handling
   */
  getTransactions = async (
    request: Request,
    response: Response<TransactionListResponse>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const query = transactionListQuerySchema.parse(request.query);
      const result = await this.transactionService.getTransactions(query);

      response.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };
}
