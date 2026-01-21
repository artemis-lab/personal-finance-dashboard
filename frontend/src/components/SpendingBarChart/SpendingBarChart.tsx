import { BarChart } from "@mantine/charts";
import { Box, Text } from "@mantine/core";

import type { CategorySpending } from "../../types";
import { formatCurrency } from "../../utils";

interface SpendingBarChartProps {
  categories: CategorySpending[];
}

/** Bar chart showing spending amounts by category */
const SpendingBarChart = ({ categories }: SpendingBarChartProps) => {
  const data = categories.map((category) => ({
    category: category.category,
    amount: category.amount,
  }));

  const chartDescription = categories
    .map((c) => `${c.category}: ${formatCurrency(c.amount)}`)
    .join(", ");

  return (
    <Box
      aria-label="Spending by category chart"
      className="flex min-w-0 flex-1 flex-col rounded-lg border border-gray-200 bg-white p-4"
      role="figure"
    >
      <Text fw={600} id="spending-bar-title" mb="md" size="sm">
        Spending by Category
      </Text>
      <div
        aria-describedby="spending-bar-desc"
        aria-labelledby="spending-bar-title"
        role="img"
      >
        <BarChart
          className="pl-4"
          data={data}
          dataKey="category"
          h={250}
          series={[{ name: "amount", color: "blue.7" }]}
          tickLine="y"
          valueFormatter={(value) => formatCurrency(value)}
        />
      </div>
      <span className="sr-only" id="spending-bar-desc">
        {chartDescription}
      </span>
    </Box>
  );
};

export default SpendingBarChart;
