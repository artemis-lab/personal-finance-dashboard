import { Pool } from "pg";

import type { CategorySpending, MonthlySpendingReport } from "../types";
import type { IReportRepository } from "./report-repository.interface";

interface CategorySpendingRow {
  amount: string;
  category: string;
  transaction_count: string;
}

const rowToCategorySpending = (
  row: CategorySpendingRow,
  totalSpending: number,
): CategorySpending => {
  return {
    amount: parseFloat(row.amount),
    category: row.category,
    percentage:
      totalSpending > 0 ? (parseFloat(row.amount) * 100) / totalSpending : 0,
    transactionCount: parseInt(row.transaction_count, 10),
  };
};

export class ReportRepository implements IReportRepository {
  constructor(private readonly pool: Pool) {}

  async fetchMonthlySpendingReport(
    yearMonth: string,
  ): Promise<MonthlySpendingReport> {
    const query = `
      SELECT
        SUM(amount) as amount,
        category,
        COUNT(*) as transaction_count
      FROM transactions
      WHERE transaction_type = 'debit'
        AND date >= $1::date
        AND date < ($1::date + interval '1 month')
      GROUP BY category
      ORDER BY amount DESC
    `;

    const result = await this.pool.query<CategorySpendingRow>(query, [
      `${yearMonth}-01`,
    ]);

    const totalSpending = result.rows.reduce(
      (sum, row) => sum + parseFloat(row.amount),
      0,
    );
    const totalTransactionCount = result.rows.reduce(
      (sum, row) => sum + parseInt(row.transaction_count, 10),
      0,
    );
    const categories: CategorySpending[] = result.rows.map((row) =>
      rowToCategorySpending(row, totalSpending),
    );

    return {
      categories,
      totalSpending,
      totalTransactionCount,
      yearMonth,
    };
  }
}
