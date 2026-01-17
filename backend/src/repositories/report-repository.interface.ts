import type { MonthlySpendingReport } from "../types";

/**
 * Repository interface for report data access.
 * Provides abstraction over the underlying data storage mechanism.
 */
export interface IReportRepository {
  /**
   * Retrieves a monthly spending report for a specific year and month.
   *
   * @param yearMonth - Year and month for report retrieval in ISO format (e.g., "2026-01")
   * @returns Promise resolving to the monthly spending report object
   */
  fetchMonthlySpendingReport(yearMonth: string): Promise<MonthlySpendingReport>;
}
