import { PieChart } from "@mantine/charts";
import { Box, Text } from "@mantine/core";

import type { CategorySpending } from "../../types";

interface TransactionsPieChartProps {
  categories: CategorySpending[];
}

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

const TransactionsPieChart = ({ categories }: TransactionsPieChartProps) => {
  const data = categories.map((category, index) => ({
    name: category.category,
    value: category.transactionCount,
    color: COLORS[index % COLORS.length] ?? "blue.7",
  }));

  return (
    <Box className="flex min-w-0 flex-1 flex-col rounded-lg border border-gray-200 bg-white p-4">
      <Text fw={600} mb="md" size="sm">
        Transaction Distribution
      </Text>
      <div className="flex flex-1 items-center justify-center">
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
    </Box>
  );
};

export default TransactionsPieChart;
