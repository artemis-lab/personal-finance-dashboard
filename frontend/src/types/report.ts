/** Spending breakdown for a single category */
export interface CategorySpending {
  amount: number;
  category: string;
  percentage: number;
  transactionCount: number;
}

/** Monthly spending report with category breakdown */
export interface MonthlySpendingReport {
  categories: CategorySpending[];
  totalSpending: number;
  totalTransactionCount: number;
  yearMonth: string;
}

/** Response data for monthly spending report */
export interface MonthlySpendingReportData {
  report: MonthlySpendingReport;
}
