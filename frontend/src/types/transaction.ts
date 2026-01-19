export type CategorySource = "ai" | "user";

export type TransactionType = "credit" | "debit";

export interface Transaction {
  amount: number;
  date: string;
  description: string;
  id: string;
  merchant: string;
  transactionType: TransactionType;
  category: string;
  categorySource: CategorySource;
  account?: string;
  balance?: number;
  reference?: string;
  transactionMethod?: string;
}

export interface TransactionListData {
  transactions: Transaction[];
  hasMore: boolean;
  total: number;
}

export interface TransactionListQuery {
  limit?: number;
  offset?: number;
  sortBy?: "date" | "amount";
  sortOrder?: "asc" | "desc";
  yearMonth?: string;
}
