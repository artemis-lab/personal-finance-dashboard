import type { MonthlySpendingReportData } from "../types";
import { apiClient } from "./client";

const REPORTS_PATH = "/reports";

/**
 * Fetches the monthly spending report for a specific year and month.
 * @param yearMonth - Year and month in "YYYY-MM" format
 * @returns Promise resolving to monthly spending report with category breakdown
 */
export async function fetchMonthlySpendingReport(
  yearMonth: string,
): Promise<MonthlySpendingReportData> {
  return apiClient<MonthlySpendingReportData>(
    `${REPORTS_PATH}/monthly/${yearMonth}`,
  );
}
