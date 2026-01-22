import { Alert, Button, Loader, Text, Title } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { AlertCircle } from "lucide-react";
import { useCallback, useState } from "react";

import { ApiError } from "../api";
import { ReportSummary } from "../components/ReportSummary";
import { ReportTable } from "../components/ReportTable";
import { SpendingBarChart } from "../components/SpendingBarChart";
import { SpendingPieChart } from "../components/SpendingPieChart";
import { TransactionsPieChart } from "../components/TransactionsPieChart";
import { useMonthlySpendingReport } from "../hooks";
import { toYearMonth } from "../utils";

const Reports = () => {
  const [yearMonth, setYearMonth] = useState<string | undefined>(undefined);

  const { data, isLoading, error, refetch } = useMonthlySpendingReport(
    yearMonth ?? "",
  );

  const handleMonthChange = useCallback((value: string | null) => {
    setYearMonth(toYearMonth(value));
  }, []);

  const handleGenerateReport = useCallback(() => {
    refetch();
  }, [refetch]);

  const report = data?.report;

  return (
    <div
      aria-labelledby="reports-title"
      className="flex h-full flex-col gap-4 sm:gap-6"
    >
      <Title id="reports-title" order={3}>
        Monthly Spending Report
      </Title>

      <div
        aria-label="Report filters"
        className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:gap-4"
        role="search"
      >
        <MonthPickerInput
          className="w-full sm:w-48"
          label="Select month"
          placeholder="Select a month"
          value={yearMonth ?? null}
          onChange={handleMonthChange}
        />
        <Button
          aria-disabled={!yearMonth}
          disabled={!yearMonth}
          onClick={handleGenerateReport}
        >
          Generate Report
        </Button>
      </div>

      <div aria-live="polite" className="min-h-0 flex-1">
        {isLoading ? (
          <div
            aria-label="Loading report"
            className="flex h-full items-center justify-center"
            role="status"
          >
            <Loader aria-hidden="true" size="lg" />
          </div>
        ) : error ? (
          <Alert
            color="red"
            icon={<AlertCircle aria-hidden="true" className="h-5 w-5" />}
            title="Error loading report"
          >
            {error instanceof ApiError ? error.message : "An error occurred"}
          </Alert>
        ) : !data ? (
          <div className="flex h-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 text-center">
            <Text c="gray">
              Select a month and click "Generate Report" to view the spending
              report
            </Text>
          </div>
        ) : !report || report.categories.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 text-center">
            <Text c="gray">No spending data for this month</Text>
          </div>
        ) : (
          <div className="flex h-full flex-col gap-4">
            <ReportSummary report={report} />
            <div className="flex flex-col gap-4 overflow-auto">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <SpendingBarChart categories={report.categories} />
                  <div className="flex flex-1 flex-col gap-4 sm:flex-row">
                    <SpendingPieChart categories={report.categories} />
                    <TransactionsPieChart categories={report.categories} />
                  </div>
                </div>
              </div>
              <ReportTable categories={report.categories} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
