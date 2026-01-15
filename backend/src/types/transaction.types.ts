// Transaction type
export interface Transaction {
  // Core fields
  amount: number; // always positive
  date: string; // ISO format: "2026-01-15"
  description: string;
  id: string; // UUID, backend-generated
  merchant: string;
  transactionType: "credit" | "debit"; // credit = income, debit = expense

  // AI-based categorization
  category: string;
  categorySource: "ai" | "user";

  // Optional metadata from CSV
  account?: string;
  balance?: number;
  reference?: string; // External reference from CSV (transaction ID, etc.)
  transactionMethod?: string; // e.g., "Purchase", "ATM", "ACH"
}

// Request/Response types
export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

export interface HealthCheckResponse {
  status: "ok";
  timestamp: string;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface TransactionListData {
  transactions: Transaction[];
  hasMore: boolean;
  total: number;
}

export type TransactionListResponse = SuccessResponse<TransactionListData>;

// Query parameters for transaction list
export interface TransactionListQuery {
  limit: number; // Default: 30, max: 100
  offset: number; // Default: 0
  sortBy: "date" | "amount"; // Default: "date"
  sortOrder: "asc" | "desc"; // Default: "desc"
  yearMonth?: string; // e.g., "2026-01"
}
