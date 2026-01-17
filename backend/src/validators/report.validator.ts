import { z } from "zod";

/**
 * Schema for validating yearMonth path parameter.
 *
 * @property yearMonth - Expects a string in ISO format ("YYYY-MM")
 */
export const yearMonthParamSchema = z.object({
  yearMonth: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "yearMonth must be in format YYYY-MM"),
});
