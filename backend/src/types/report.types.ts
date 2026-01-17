// Report types

import type { SuccessResponse } from "./common.types";

// Category spending type
export interface CategorySpending {
  amount: number;
  category: string; // AI-based categorization
  percentage: number; // percentage of total spending
  transactionCount: number;
}

// Monthly spending report type
export interface MonthlySpendingReport {
  categories: CategorySpending[]; // sorted by amount (descending)
  totalSpending: number;
  totalTransactionCount: number;
  yearMonth: string; // ISO format: "2026-01"
}

export interface MonthlySpendingReportData {
  report: MonthlySpendingReport;
}

export type MonthlySpendingReportResponse =
  SuccessResponse<MonthlySpendingReportData>;
