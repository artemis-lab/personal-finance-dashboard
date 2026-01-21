import { PieChart } from "@mantine/charts";
import { Box, Text } from "@mantine/core";

import type { CategorySpending } from "../../types";

interface TransactionsPieChartProps {
  categories: CategorySpending[];
}

/** Mantine color tokens for pie chart segments */
const COLORS = [
  "blue.7",
  "red.7",
  "green.7",
  "yellow.7",
  "grape.7",
  "orange.7",
  "cyan.7",
  "teal.7",
  "pink.7",
  "indigo.7",
  "lime.7",
  "violet.7",
  "gray.7",
];

/** Pie chart showing transaction count distribution by category */
const TransactionsPieChart = ({ categories }: TransactionsPieChartProps) => {
  const data = categories.map((category, index) => ({
    name: category.category,
    value: category.transactionCount,
    color: COLORS[index % COLORS.length] ?? "blue.7",
  }));

  const chartDescription = categories
    .map((c) => `${c.category}: ${c.transactionCount} transactions`)
    .join(", ");

  return (
    <Box
      aria-label="Transaction distribution chart"
      className="flex min-w-0 flex-1 flex-col rounded-lg border border-gray-200 bg-white p-4"
      role="figure"
    >
      <Text fw={600} id="transaction-pie-title" mb="md" size="sm">
        Transaction Distribution
      </Text>
      <div
        aria-describedby="transaction-pie-desc"
        aria-labelledby="transaction-pie-title"
        className="flex flex-1 items-center justify-center"
        role="img"
      >
        <PieChart
          withLabelsLine
          withTooltip
          data={data}
          labelsPosition="outside"
          labelsType="value"
          size={250}
          tooltipDataSource="segment"
        />
      </div>
      <span className="sr-only" id="transaction-pie-desc">
        {chartDescription}
      </span>
    </Box>
  );
};

export default TransactionsPieChart;
