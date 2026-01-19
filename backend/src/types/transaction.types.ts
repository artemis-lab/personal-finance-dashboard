// Transaction types

import type { SuccessResponse } from "./common.types";

export type CategorySource = "ai" | "user";

export type TransactionType = "credit" | "debit"; // credit = income, debit = expense

export interface Transaction {
  // Core fields
  amount: number; // always positive
  date: string; // ISO format: "2026-01-15"
  description: string;
  id: string; // UUID, backend-generated
  merchant: string;
  transactionType: TransactionType;

  // AI-based categorization
  category: string;
  categorySource: CategorySource;

  // Optional metadata from CSV
  account?: string;
  balance?: number;
  reference?: string; // External reference from CSV (e.g., transaction ID)
  transactionMethod?: string; // e.g., "Purchase", "ATM", "ACH"
}

export interface TransactionListData {
  transactions: Transaction[];
  hasMore: boolean;
  total: number;
}

export type TransactionListResponse = SuccessResponse<TransactionListData>;

// Query parameters for transaction list
export interface TransactionListQuery {
  limit: number; // Default: 30, max: 100
  offset: number; // Default: 0
  sortBy: "date" | "amount"; // Default: "date"
  sortOrder: "asc" | "desc"; // Default: "desc"
  yearMonth?: string; // e.g., "2026-01"
}

// Update transaction category
export interface UpdateTransactionCategoryData {
  transaction: Transaction;
}

export interface UpdateTransactionCategoryRequest {
  category: string;
}

export type UpdateTransactionCategoryResponse =
  SuccessResponse<UpdateTransactionCategoryData>;

// Batch update transaction category
export interface BatchUpdateTransactionCategoryData {
  transactions: Transaction[];
  failedIds: string[];
  requestedCount: number;
  updatedCount: number;
}

export interface BatchUpdateTransactionCategoryRequest {
  ids: string[];
  category: string;
}

export type BatchUpdateTransactionCategoryResponse =
  SuccessResponse<BatchUpdateTransactionCategoryData>;
