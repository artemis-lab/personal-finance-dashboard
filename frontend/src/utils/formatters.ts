import type { TransactionType } from "../types";

export const formatAmount = (amount: number, type: TransactionType): string => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
  return type === "credit" ? `+${formatted}` : `-${formatted}`;
};

export const formatDate = (dateString: string): string => {
  // Parse YYYY-MM-DD manually to avoid timezone issues
  const parts = dateString.split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
