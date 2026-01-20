import type { MonthlySpendingReportData } from "../types";
import { apiClient } from "./client";

const REPORTS_PATH = "/reports";

export async function fetchMonthlySpendingReport(
  yearMonth: string,
): Promise<MonthlySpendingReportData> {
  return apiClient<MonthlySpendingReportData>(
    `${REPORTS_PATH}/monthly/${yearMonth}`,
  );
}
