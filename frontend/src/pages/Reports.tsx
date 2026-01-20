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
    <div className="flex h-full flex-col gap-6">
      <Title order={2}>Monthly Spending Report</Title>

      <div className="flex flex-wrap items-end gap-4">
        <MonthPickerInput
          className="w-48"
          label="Select month"
          placeholder="Select a month"
          value={yearMonth ?? null}
          onChange={handleMonthChange}
        />
        <Button disabled={!yearMonth} onClick={handleGenerateReport}>
          Generate Report
        </Button>
      </div>

      <div className="min-h-0 flex-1">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <Alert
            color="red"
            icon={<AlertCircle className="h-5 w-5" />}
            title="Error loading report"
          >
            {error instanceof ApiError ? error.message : "An error occurred"}
          </Alert>
        ) : !data ? (
          <div className="flex h-full items-center justify-center rounded-lg border border-gray-200 bg-white">
            <Text c="gray">
              Select a month and click "Generate Report" to view the spending
              report
            </Text>
          </div>
        ) : !report || report.categories.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg border border-gray-200 bg-white">
            <Text c="gray">No spending data for this month</Text>
          </div>
        ) : (
          <div className="flex h-full flex-col gap-4">
            <ReportSummary report={report} />
            <div className="overflow-auto">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <SpendingBarChart categories={report.categories} />
                  <div className="flex flex-1 flex-row gap-4">
                    <SpendingPieChart categories={report.categories} />
                    <TransactionsPieChart categories={report.categories} />
                  </div>
                </div>
                <ReportTable categories={report.categories} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
