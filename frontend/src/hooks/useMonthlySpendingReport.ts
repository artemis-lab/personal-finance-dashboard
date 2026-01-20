import { useQuery } from "@tanstack/react-query";

import { fetchMonthlySpendingReport } from "../api";
import { STALE_TIME_MS } from "./constants";

const MONTHLY_REPORT_QUERY_KEY = "monthly-report";

export const useMonthlySpendingReport = (yearMonth: string) => {
  return useQuery({
    queryKey: [MONTHLY_REPORT_QUERY_KEY, yearMonth],
    queryFn: () => fetchMonthlySpendingReport(yearMonth),
    enabled: false,
    staleTime: STALE_TIME_MS,
  });
};
