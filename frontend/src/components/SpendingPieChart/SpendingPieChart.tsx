import { PieChart } from "@mantine/charts";
import { Box, Text } from "@mantine/core";

import type { CategorySpending } from "../../types";
import { formatCurrency } from "../../utils";

interface SpendingPieChartProps {
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

/** Pie chart showing spending distribution by category */
const SpendingPieChart = ({ categories }: SpendingPieChartProps) => {
  const data = categories.map((category, index) => ({
    name: category.category,
    value: category.amount,
    color: COLORS[index % COLORS.length] ?? "blue.7",
  }));

  const chartDescription = categories
    .map((c) => `${c.category}: ${formatCurrency(c.amount)}`)
    .join(", ");

  return (
    <Box
      aria-label="Spending distribution chart"
      className="flex min-w-0 flex-1 flex-col rounded-lg border border-gray-200 bg-white p-4"
      role="figure"
    >
      <Text fw={600} id="spending-pie-title" mb="md" size="sm">
        Spending Distribution
      </Text>
      <div
        aria-describedby="spending-pie-desc"
        aria-labelledby="spending-pie-title"
        className="flex flex-1 items-center justify-center"
        role="img"
      >
        <PieChart
          withLabelsLine
          withTooltip
          data={data}
          labelsPosition="outside"
          labelsType="percent"
          size={250}
          tooltipDataSource="segment"
          valueFormatter={(value) => formatCurrency(value)}
        />
      </div>
      <span className="sr-only" id="spending-pie-desc">
        {chartDescription}
      </span>
    </Box>
  );
};

export default SpendingPieChart;
