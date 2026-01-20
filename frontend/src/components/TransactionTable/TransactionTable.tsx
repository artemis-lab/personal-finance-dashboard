import { ActionIcon, Box, Button, Checkbox, Table, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ArrowDown, ArrowUp, Loader2, Pencil } from "lucide-react";
import { type JSX, useCallback, useRef, useState } from "react";

import {
  useBatchUpdateTransactionCategory,
  useUpdateTransactionCategory,
} from "../../hooks";
import type { Transaction, TransactionListQuery } from "../../types";
import { formatAmount, formatDate } from "../../utils";
import CategoryEditModal from "./CategoryEditModal";

const OVERSCAN = 10;
const ROW_HEIGHT = 52;

/** Props for TransactionTable component */
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

/** Virtualized transaction table with sorting, selection, and category editing */
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
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBatchEditOpen, setIsBatchEditOpen] = useState(false);
  const [pendingUpdateIds, setPendingUpdateIds] = useState<Set<string>>(
    new Set(),
  );

  const { mutate: updateCategory } = useUpdateTransactionCategory();
  const { mutate: batchUpdateCategory } = useBatchUpdateTransactionCategory();

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

  const handleEditCategory = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleCloseModal = () => {
    setEditingTransaction(null);
  };

  const handleCloseBatchModal = () => {
    setIsBatchEditOpen(false);
  };

  const handleSubmitCategory = (category: string) => {
    if (!editingTransaction) {
      return;
    }
    const transactionId = editingTransaction.id;
    setEditingTransaction(null); // close modal immediately
    setPendingUpdateIds((prev) => new Set(prev).add(transactionId));
    updateCategory(
      { id: transactionId, category },
      {
        onError: (error) => {
          notifications.show({
            color: "red",
            position: "top-right",
            message:
              error instanceof Error ? error.message : "An error occurred",
            title: "Error updating category",
          });
        },
        onSettled: () => {
          setPendingUpdateIds((prev) => {
            const next = new Set(prev);
            next.delete(transactionId);
            return next;
          });
        },
      },
    );
  };

  const handleBatchSubmitCategory = (category: string) => {
    const ids = Array.from(selectedIds);
    setIsBatchEditOpen(false); // close modal immediately
    setSelectedIds(new Set());
    setPendingUpdateIds((prev) => new Set([...prev, ...ids]));
    batchUpdateCategory(
      { ids, category },
      {
        onError: (error) => {
          notifications.show({
            color: "red",
            position: "top-right",
            message:
              error instanceof Error ? error.message : "An error occurred",
            title: "Error updating categories",
          });
        },
        onSettled: () => {
          setPendingUpdateIds((prev) => {
            const next = new Set(prev);
            for (const id of ids) {
              next.delete(id);
            }
            return next;
          });
        },
      },
    );
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.size === transactions.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(transactions.map((t) => t.id)));
    }
  };

  const isAllSelected =
    transactions.length > 0 && selectedIds.size === transactions.length;
  const isIndeterminate =
    selectedIds.size > 0 && selectedIds.size < transactions.length;

  return (
    <Box className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <Table>
        <Table.Thead className="bg-gray-50">
          <Table.Tr>
            <Table.Th className="w-10">
              <Checkbox
                checked={isAllSelected}
                indeterminate={isIndeterminate}
                onChange={handleToggleSelectAll}
              />
            </Table.Th>
            <Table.Th
              className="w-28 cursor-pointer"
              onClick={() => handleHeaderClick("date")}
            >
              <span className="inline-flex items-center">
                Date
                <SortIcon column="date" />
              </span>
            </Table.Th>
            <Table.Th className="w-48">Description</Table.Th>
            <Table.Th className="w-32">Category</Table.Th>
            <Table.Th className="w-36">Merchant</Table.Th>
            <Table.Th
              className="w-28 cursor-pointer"
              onClick={() => handleHeaderClick("amount")}
            >
              <span className="inline-flex items-center">
                Amount
                <SortIcon column="amount" />
              </span>
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
                const isPending = pendingUpdateIds.has(transaction.id);
                return (
                  <Table.Tr
                    key={transaction.id}
                    className="absolute top-0 left-0 table w-full table-fixed"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <Table.Td className="w-10">
                      <Checkbox
                        checked={selectedIds.has(transaction.id)}
                        onChange={() => handleToggleSelect(transaction.id)}
                      />
                    </Table.Td>
                    <Table.Td className="w-28">
                      <Text size="sm">{formatDate(transaction.date)}</Text>
                    </Table.Td>
                    <Table.Td className="w-48">
                      <Text lineClamp={1} size="sm">
                        {transaction.description}
                      </Text>
                    </Table.Td>
                    <Table.Td className="w-32">
                      <div className="flex items-center gap-1">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            transaction.categorySource === "user"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {transaction.category}
                        </span>
                        {isPending ? (
                          <Loader2 className="h-3 w-3 animate-spin text-gray-500" />
                        ) : (
                          <ActionIcon
                            color="gray"
                            size="xs"
                            variant="subtle"
                            onClick={() => handleEditCategory(transaction)}
                          >
                            <Pencil className="h-3 w-3" />
                          </ActionIcon>
                        )}
                      </div>
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
                            ? "green.7"
                            : "red.7"
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
        <div className="flex flex-1 items-center gap-2">
          {selectedIds.size > 0 && (
            <>
              <Button size="xs" onClick={() => setIsBatchEditOpen(true)}>
                Update category
              </Button>
              <Text c="gray" size="sm">
                {selectedIds.size} selected
              </Text>
            </>
          )}
        </div>
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
          <Text c="gray" size="sm">
            Loaded {transactions.length} of {total}{" "}
            {total === 1 ? "transaction" : "transactions"}
          </Text>
        </div>
      </div>

      {editingTransaction && (
        <CategoryEditModal
          category={editingTransaction.category}
          opened={editingTransaction !== null}
          onClose={handleCloseModal}
          onSubmit={handleSubmitCategory}
        />
      )}

      {isBatchEditOpen && (
        <CategoryEditModal
          opened={isBatchEditOpen}
          onClose={handleCloseBatchModal}
          onSubmit={handleBatchSubmitCategory}
        />
      )}
    </Box>
  );
};

export default TransactionTable;
