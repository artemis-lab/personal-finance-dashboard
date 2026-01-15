import { Pool } from "pg";

import type {
  Transaction,
  TransactionListQuery,
} from "../types/transaction.types";
import type { ITransactionRepository } from "./transaction-repository.interface";

interface TransactionRow {
  amount: string;
  date: Date;
  description: string;
  id: string;
  merchant: string;
  transaction_type: "credit" | "debit";
  category: string;
  category_source: "ai" | "user";
  account: string | null;
  balance: string | null;
  reference: string | null;
  transaction_method: string | null;
}

const rowToTransaction = (row: TransactionRow): Transaction => {
  return {
    amount: parseFloat(row.amount),
    date: row.date.toISOString().slice(0, 10),
    description: row.description,
    id: row.id,
    merchant: row.merchant,
    transactionType: row.transaction_type,
    category: row.category,
    categorySource: row.category_source,
    account: row.account ?? undefined,
    balance: row.balance ? parseFloat(row.balance) : undefined,
    reference: row.reference ?? undefined,
    transactionMethod: row.transaction_method ?? undefined,
  };
};

export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly pool: Pool) {}

  async findAll(
    query: TransactionListQuery,
  ): Promise<{ transactions: Transaction[]; total: number }> {
    const { limit, offset, sortBy, sortOrder, yearMonth } = query;

    const conditions: string[] = [];
    const params: (string | number)[] = [];

    let paramIndex = 1;

    if (yearMonth) {
      conditions.push(
        `date >= $${paramIndex} AND date < ($${paramIndex}::date + interval '1 month')`,
      );
      params.push(`${yearMonth}-01`);
      paramIndex++;
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const sortColumn = sortBy === "amount" ? "amount" : "date";
    const sortDirection = sortOrder === "asc" ? "ASC" : "DESC";

    const countQuery = `SELECT COUNT(*) as total FROM transactions ${whereClause}`;
    const dataQuery = `
      SELECT amount, date, description, id, merchant, transaction_type,
             category, category_source, account, balance, reference, transaction_method
      FROM transactions
      ${whereClause}
      ORDER BY ${sortColumn} ${sortDirection}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    const countParams = [...params];
    params.push(limit, offset);

    const [countResult, dataResult] = await Promise.all([
      this.pool.query(countQuery, countParams),
      this.pool.query<TransactionRow>(dataQuery, params),
    ]);

    return {
      transactions: dataResult.rows.map(rowToTransaction),
      total: parseInt(countResult.rows[0].total, 10),
    };
  }
}
