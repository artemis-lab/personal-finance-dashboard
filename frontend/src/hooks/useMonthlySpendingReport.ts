import { useQuery } from "@tanstack/react-query";

import { fetchMonthlySpendingReport } from "../api";
import { STALE_TIME_MS } from "./constants";

const MONTHLY_SPENDING_REPORT_QUERY_KEY = "monthly-spending-report";

/**
 * Hook for fetching monthly spending report data.
 * Query is disabled by default and must be triggered manually via refetch().
 * @param yearMonth - Year and month in "YYYY-MM" format
 * @returns TanStack Query result with monthly spending report data
 */
export const useMonthlySpendingReport = (yearMonth: string) => {
  return useQuery({
    queryKey: [MONTHLY_SPENDING_REPORT_QUERY_KEY, yearMonth],
    queryFn: () => fetchMonthlySpendingReport(yearMonth),
    enabled: false,
    staleTime: STALE_TIME_MS,
  });
};
