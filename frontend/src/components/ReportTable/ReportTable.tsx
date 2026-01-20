import { Box, Table, Text } from "@mantine/core";

import type { CategorySpending } from "../../types";
import { formatCurrency, formatPercentage } from "../../utils";

interface ReportTableProps {
  categories: CategorySpending[];
}

/** Table displaying spending breakdown by category */
const ReportTable = ({ categories }: ReportTableProps) => {
  return (
    <Box className="rounded-lg border border-gray-200 bg-white">
      <Table highlightOnHover stickyHeader>
        <Table.Thead>
          <Table.Tr>
            <Table.Th
              className="w-48"
              style={{
                backgroundColor: "var(--color-gray-50)",
                borderTopLeftRadius: "var(--mantine-radius-md)",
              }}
            >
              Category
            </Table.Th>
            <Table.Th
              className="w-48"
              style={{
                backgroundColor: "var(--color-gray-50)",
              }}
            >
              Amount
            </Table.Th>
            <Table.Th
              className="w-48"
              style={{
                backgroundColor: "var(--color-gray-50)",
              }}
            >
              Percentage
            </Table.Th>
            <Table.Th
              className="w-48"
              style={{
                backgroundColor: "var(--color-gray-50)",
                borderTopRightRadius: "var(--mantine-radius-md)",
              }}
            >
              Transactions
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {categories.map((category) => (
            <Table.Tr key={category.category}>
              <Table.Td className="w-48">
                <Text size="sm">{category.category}</Text>
              </Table.Td>
              <Table.Td className="w-48">
                <Text c="red.7" fw={500} size="sm">
                  {formatCurrency(category.amount)}
                </Text>
              </Table.Td>
              <Table.Td className="w-48">
                <Text size="sm">{formatPercentage(category.percentage)}</Text>
              </Table.Td>
              <Table.Td className="w-48">
                <Text size="sm">{category.transactionCount}</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default ReportTable;
