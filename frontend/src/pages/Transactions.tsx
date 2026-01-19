import { Alert, Loader, Select, Text, Title } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { AlertCircle } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { ApiError } from "../api";
import { TransactionTable } from "../components/TransactionTable";
import { useTransactions, type UseTransactionsOptions } from "../hooks";
import { toYearMonth } from "../utils";

const Transactions = () => {
  const [options, setOptions] = useState<UseTransactionsOptions>({
    sortBy: "date",
    sortOrder: "desc",
  });

  const {
    data,
    isLoading,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
  } = useTransactions(options);

  const transactions = useMemo(() => {
    return data?.pages.flatMap((page) => page.transactions) ?? [];
  }, [data]);

  const total = data?.pages[0]?.total ?? 0;

  const handleMonthChange = useCallback((value: string | null) => {
    setOptions((prev) => ({
      ...prev,
      yearMonth: toYearMonth(value),
    }));
  }, []);

  const handleSortByChange = useCallback((value: string | null) => {
    if (value === "date" || value === "amount") {
      setOptions((prev) => ({
        ...prev,
        sortBy: value,
      }));
    }
  }, []);

  const handleSortOrderChange = useCallback((value: string | null) => {
    if (value === "asc" || value === "desc") {
      setOptions((prev) => ({
        ...prev,
        sortOrder: value,
      }));
    }
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSort = useCallback((sortBy: "date" | "amount") => {
    setOptions((prev) => ({
      ...prev,
      sortBy,
      sortOrder:
        prev.sortBy === sortBy && prev.sortOrder === "desc" ? "asc" : "desc",
    }));
  }, []);

  return (
    <div className="flex h-full flex-col gap-6">
      <Title order={2}>Transactions</Title>

      <div className="flex flex-wrap items-center gap-4">
        <MonthPickerInput
          clearable
          className="w-48"
          label="Filter by month"
          placeholder="All time"
          value={options.yearMonth ?? null}
          onChange={handleMonthChange}
        />
        <Select
          className="w-48"
          label="Sort by"
          value={options.sortBy}
          data={[
            { value: "date", label: "Date" },
            { value: "amount", label: "Amount" },
          ]}
          onChange={handleSortByChange}
        />
        <Select
          className="w-48"
          label="Order"
          value={options.sortOrder}
          data={[
            { value: "desc", label: "Descending" },
            { value: "asc", label: "Ascending" },
          ]}
          onChange={handleSortOrderChange}
        />
      </div>
      <div className="min-h-0 flex-1">
        {error ? (
          <Alert
            color="red"
            icon={<AlertCircle className="h-5 w-5" />}
            title="Error loading transactions"
          >
            {error instanceof ApiError ? error.message : "An error occurred"}
          </Alert>
        ) : isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader size="lg" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg border border-gray-200 bg-white">
            <Text c="gray">No transactions found</Text>
          </div>
        ) : (
          <TransactionTable
            key={`${options.sortBy}-${options.sortOrder}-${options.yearMonth}`}
            hasMore={hasNextPage}
            isLoading={isFetchingNextPage}
            sortBy={options.sortBy}
            sortOrder={options.sortOrder}
            total={total}
            transactions={transactions}
            onLoadMore={handleLoadMore}
            onSort={handleSort}
          />
        )}
      </div>
    </div>
  );
};

export default Transactions;
