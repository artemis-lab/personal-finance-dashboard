import type { NextFunction, Request, Response } from "express";

import type { ITransactionService } from "../services";
import type {
  BatchUpdateTransactionCategoryResponse,
  TransactionListResponse,
  UpdateTransactionCategoryResponse,
} from "../types";
import {
  batchUpdateTransactionCategorySchema,
  transactionIdParamSchema,
  transactionListQuerySchema,
  updateTransactionCategorySchema,
} from "../validators";

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

  /**
   * Updates a transaction's category.
   *
   * @param request - Express request with query parameter and request body:
   *   - `id` - The transaction ID (UUID)
   *   - `category` -  The new category name
   * @param response - Express response containing the updated transaction
   * @param next - Express next function for error handling
   */
  updateTransactionCategory = async (
    request: Request,
    response: Response<UpdateTransactionCategoryResponse>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = transactionIdParamSchema.parse(request.params);
      const { category } = updateTransactionCategorySchema.parse(request.body);

      const transaction =
        await this.transactionService.updateTransactionCategory(id, category);

      response.status(200).json({ success: true, data: { transaction } });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Updates multiple transactions' categories in a single operation.
   *
   * @param request - Express request with request body:
   *   - `ids` - Array of transaction IDs (UUIDs)
   *   - `category` -  The new category name
   * @param response - Express response containing the updated transaction list
   * @param next - Express next function for error handling
   */
  batchUpdateTransactionCategory = async (
    request: Request,
    response: Response<BatchUpdateTransactionCategoryResponse>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { ids, category } = batchUpdateTransactionCategorySchema.parse(
        request.body,
      );

      const result =
        await this.transactionService.batchUpdateTransactionCategory(
          ids,
          category,
        );

      response.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };
}
