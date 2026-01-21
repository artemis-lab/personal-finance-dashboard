import { Box, Text } from "@mantine/core";

import type { MonthlySpendingReport } from "../../types";
import { formatCurrency } from "../../utils";

interface ReportSummaryProps {
  report: MonthlySpendingReport;
}

/** Displays summary metrics for a monthly spending report */
const ReportSummary = ({ report }: ReportSummaryProps) => {
  return (
    <Box
      aria-label="Monthly spending summary"
      className="flex gap-10 rounded-lg border border-gray-200 bg-white p-4"
      role="region"
    >
      <div aria-label={`Categories: ${report.categories.length}`} role="group">
        <Text c="gray" id="categories-label" size="sm">
          Categories
        </Text>
        <Text aria-labelledby="categories-label" fw={600} size="xl">
          {report.categories.length}
        </Text>
      </div>
      <div
        aria-label={`Total Spending: ${formatCurrency(report.totalSpending)}`}
        role="group"
      >
        <Text c="gray" id="spending-label" size="sm">
          Total Spending
        </Text>
        <Text aria-labelledby="spending-label" c="red.7" fw={600} size="xl">
          {formatCurrency(report.totalSpending)}
        </Text>
      </div>
      <div
        aria-label={`Transactions: ${report.totalTransactionCount}`}
        role="group"
      >
        <Text c="gray" id="transactions-label" size="sm">
          Transactions
        </Text>
        <Text aria-labelledby="transactions-label" fw={600} size="xl">
          {report.totalTransactionCount}
        </Text>
      </div>
    </Box>
  );
};

export default ReportSummary;
