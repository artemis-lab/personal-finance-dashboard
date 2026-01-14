import { z } from "zod";

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
