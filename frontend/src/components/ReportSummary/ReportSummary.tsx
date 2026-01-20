import { Box, Text } from "@mantine/core";

import type { MonthlySpendingReport } from "../../types";
import { formatCurrency } from "../../utils";

interface ReportSummaryProps {
  report: MonthlySpendingReport;
}

/** Displays summary metrics for a monthly spending report */
const ReportSummary = ({ report }: ReportSummaryProps) => {
  return (
    <Box className="flex gap-10 rounded-lg border border-gray-200 bg-white p-4">
      <div>
        <Text c="gray" size="sm">
          Categories
        </Text>
        <Text fw={600} size="xl">
          {report.categories.length}
        </Text>
      </div>
      <div>
        <Text c="gray" size="sm">
          Total Spending
        </Text>
        <Text c="red.7" fw={600} size="xl">
          {formatCurrency(report.totalSpending)}
        </Text>
      </div>
      <div>
        <Text c="gray" size="sm">
          Transactions
        </Text>
        <Text fw={600} size="xl">
          {report.totalTransactionCount}
        </Text>
      </div>
    </Box>
  );
};

export default ReportSummary;
