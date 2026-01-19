import { Box, Table, Text } from "@mantine/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ArrowDown, ArrowUp } from "lucide-react";
import { type JSX, useCallback, useRef } from "react";

import type { Transaction, TransactionListQuery } from "../../types";
import { formatAmount, formatDate } from "../../utils";

const OVERSCAN = 10;
const ROW_HEIGHT = 52;

interface TransactionTableProps {
  hasMore?: boolean;
  isLoading?: boolean;
  sortBy: TransactionListQuery["sortBy"];
  sortOrder: TransactionListQuery["sortOrder"];
  total: number;
  transactions: Transaction[];
  onLoadMore?: () => Promise<void>;
  onSort: (sortBy: "date" | "amount") => void;
}

const TransactionTable = ({
  hasMore,
  isLoading,
  sortBy,
  sortOrder,
  total,
  transactions,
  onLoadMore,
  onSort,
}: TransactionTableProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: transactions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN,
  });

  const SortIcon = ({
    column,
  }: {
    column: "date" | "amount";
  }): JSX.Element | null => {
    if (sortBy !== column) {
      return null;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="mb-0.5 ml-1 inline h-4 w-4" />
    ) : (
      <ArrowDown className="mb-0.5 ml-1 inline h-4 w-4" />
    );
  };

  const handleHeaderClick = (column: "date" | "amount") => {
    onSort(column);
  };

  const handleLoadMore = useCallback(async () => {
    if (!onLoadMore) {
      return;
    }
    const lastIndex = transactions.length - 1;
    await onLoadMore();
    // Keep the last loaded item visible at the top, new items appear below
    virtualizer.scrollToIndex(lastIndex, { align: "start" });
  }, [transactions.length, onLoadMore, virtualizer]);

  return (
    <Box className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <Table>
        <Table.Thead className="bg-gray-50">
          <Table.Tr>
            <Table.Th
              className="w-28 cursor-pointer"
              onClick={() => handleHeaderClick("date")}
            >
              Date
              <SortIcon column="date" />
            </Table.Th>
            <Table.Th className="w-48">Description</Table.Th>
            <Table.Th className="w-32">Category</Table.Th>
            <Table.Th className="w-36">Merchant</Table.Th>
            <Table.Th
              className="w-28 cursor-pointer"
              onClick={() => handleHeaderClick("amount")}
            >
              Amount
              <SortIcon column="amount" />
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
      </Table>

      <div ref={parentRef} className="min-h-0 flex-1 overflow-auto">
        <div
          className="relative w-full"
          style={{ height: `${virtualizer.getTotalSize()}px` }}
        >
          <Table highlightOnHover>
            <Table.Tbody>
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const transaction = transactions[virtualRow.index];
                if (!transaction) {
                  return null;
                }
                return (
                  <Table.Tr
                    key={transaction.id}
                    className="absolute top-0 left-0 table w-full table-fixed"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <Table.Td className="w-28">
                      <Text size="sm">{formatDate(transaction.date)}</Text>
                    </Table.Td>
                    <Table.Td className="w-48">
                      <Text lineClamp={1} size="sm">
                        {transaction.description}
                      </Text>
                    </Table.Td>
                    <Table.Td className="w-32">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          transaction.categorySource === "user"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {transaction.category}
                      </span>
                    </Table.Td>
                    <Table.Td className="w-36">
                      <Text lineClamp={1} size="sm">
                        {transaction.merchant}
                      </Text>
                    </Table.Td>
                    <Table.Td className="w-28">
                      <Text
                        fw={500}
                        size="sm"
                        c={
                          transaction.transactionType === "credit"
                            ? "green.9"
                            : "red.9"
                        }
                      >
                        {formatAmount(
                          transaction.amount,
                          transaction.transactionType,
                        )}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </div>
      </div>

      <div className="flex h-12 items-center border-t border-gray-200 px-4">
        <div className="flex-1" />
        <div className="flex-1 text-center">
          {isLoading && (
            <Text c="gray" size="sm">
              Loading...
            </Text>
          )}
          {hasMore && !isLoading && (
            <Text
              c="indigo.8"
              className="cursor-pointer hover:opacity-80"
              component="button"
              size="sm"
              type="button"
              onClick={handleLoadMore}
            >
              Load more...
            </Text>
          )}
        </div>
        <div className="flex flex-1 justify-end">
          <Text c="gray.6" size="sm">
            Loaded {transactions.length} of {total}{" "}
            {total === 1 ? "transaction" : "transactions"}
          </Text>
        </div>
      </div>
    </Box>
  );
};

export default TransactionTable;
