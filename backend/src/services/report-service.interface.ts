import type { MonthlySpendingReport } from "../types";

/**
 * Service interface for report operations.
 */
export interface IReportService {
  /**
   * Retrieves a monthly spending report for a specific year and month.
   *
   * @param yearMonth - Year and month in ISO format (e.g., "2026-01")
   * @returns Promise resolving to the monthly spending report object
   */
  getMonthlySpendingReport(yearMonth: string): Promise<MonthlySpendingReport>;
}
