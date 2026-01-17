import { z } from "zod";

/**
 * Schema for validating transaction ID path parameter.
 *
 * @property id - Expects a valid UUID string
 */
export const transactionIdParamSchema = z.object({
  id: z.uuid("Invalid transaction ID format"),
});

/**
 * Schema for validating transaction list query parameters.
 *
 * @property limit - Number of transactions to return (1-100, default: 30)
 * @property offset - Number of transactions to skip (default: 0)
 * @property sortBy - Field to sort by: "date" or "amount" (default: "date")
 * @property sortOrder - Sort direction: "asc" or "desc" (default: "desc")
 * @property yearMonth - Optional filter by month in ISO format ("YYYY-MM")
 */
export const transactionListQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 30))
    .pipe(z.number().min(1).max(100)),
  offset: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 0))
    .pipe(z.number().min(0)),
  sortBy: z.enum(["date", "amount"]).default("date"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  yearMonth: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "yearMonth must be in format YYYY-MM")
    .optional(),
});

/**
 * Schema for validating update transaction category request body.
 *
 * @property category - The new category name (1-100 characters)
 */
export const updateTransactionCategorySchema = z.object({
  category: z.string().min(1, "category is required").max(100),
});

/**
 * Schema for validating batch update transaction category request body.
 *
 * @property ids - Array of transaction IDs (UUIDs), 1-100 items
 * @property category - The new category name (1-100 characters)
 */
export const batchUpdateTransactionCategorySchema = z.object({
  ids: z
    .array(z.uuid("Invalid transaction ID format"))
    .min(1, "At least one transaction ID is required")
    .max(100, "Maximum 100 transactions per batch"),
  category: z.string().min(1, "category is required").max(100),
});
