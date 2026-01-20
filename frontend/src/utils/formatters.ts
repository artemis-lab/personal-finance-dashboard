import type { TransactionType } from "../types";

/**
 * Formats a transaction amount with currency symbol and sign based on type.
 * @param amount - The numeric amount to format
 * @param type - The transaction type ("credit" or "debit")
 * @returns Formatted string with sign prefix (e.g., "+$100.00" or "-$50.00")
 */
export const formatAmount = (amount: number, type: TransactionType): string => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
  return type === "credit" ? `+${formatted}` : `-${formatted}`;
};

/**
 * Formats a number as USD currency.
 * @param amount - The numeric amount to format
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

/**
 * Formats an ISO date string to a human-readable format.
 * @param dateString - Date in "YYYY-MM-DD" format
 * @returns Formatted date string (e.g., "Jan 15, 2026")
 */
export const formatDate = (dateString: string): string => {
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

/**
 * Formats a decimal number as a percentage string.
 * @param percentage - The percentage value (e.g., 25.5)
 * @returns Formatted percentage string (e.g., "25.5%")
 */
export const formatPercentage = (percentage: number): string => {
  return `${percentage.toFixed(1)}%`;
};
