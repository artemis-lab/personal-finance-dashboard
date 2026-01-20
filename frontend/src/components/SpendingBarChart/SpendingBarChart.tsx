import { BarChart } from "@mantine/charts";
import { Box, Text } from "@mantine/core";

import type { CategorySpending } from "../../types";
import { formatCurrency } from "../../utils";

interface SpendingBarChartProps {
  categories: CategorySpending[];
}

const SpendingBarChart = ({ categories }: SpendingBarChartProps) => {
  const data = categories.map((category) => ({
    category: category.category,
    amount: category.amount,
  }));

  return (
    <Box className="flex min-w-0 flex-1 flex-col rounded-lg border border-gray-200 bg-white p-4">
      <Text fw={600} mb="md" size="sm">
        Spending by Category
      </Text>
      <BarChart
        className="pl-4"
        data={data}
        dataKey="category"
        h={250}
        series={[{ name: "amount", color: "blue.7" }]}
        tickLine="y"
        valueFormatter={(value) => formatCurrency(value)}
      />
    </Box>
  );
};

export default SpendingBarChart;
