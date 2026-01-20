// Report types

// Category spending type
export interface CategorySpending {
  amount: number;
  category: string;
  percentage: number;
  transactionCount: number;
}

// Monthly spending report type
export interface MonthlySpendingReport {
  categories: CategorySpending[];
  totalSpending: number;
  totalTransactionCount: number;
  yearMonth: string;
}

export interface MonthlySpendingReportData {
  report: MonthlySpendingReport;
}
