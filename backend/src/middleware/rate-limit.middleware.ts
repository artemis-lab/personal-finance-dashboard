import rateLimit from "express-rate-limit";

import {
  BATCH_UPDATE_TRANSACTION_CATEGORY_RATE_LIMIT_MAX_REQUESTS,
  BATCH_UPDATE_TRANSACTION_CATEGORY_RATE_LIMIT_WINDOW_MS,
  GLOBAL_RATE_LIMIT_MAX_REQUESTS,
  GLOBAL_RATE_LIMIT_WINDOW_MS,
  MONTHLY_SPENDING_REPORT_RATE_LIMIT_MAX_REQUESTS,
  MONTHLY_SPENDING_REPORT_RATE_LIMIT_WINDOW_MS,
  TRANSACTIONS_RATE_LIMIT_MAX_REQUESTS,
  TRANSACTIONS_RATE_LIMIT_WINDOW_MS,
  UPDATE_TRANSACTION_CATEGORY_RATE_LIMIT_MAX_REQUESTS,
  UPDATE_TRANSACTION_CATEGORY_RATE_LIMIT_WINDOW_MS,
} from "../constants/index.js";

/**
 * Global rate limiter for all endpoints (per IP).
 * 100 requests per 15 minutes.
 */
export const globalRateLimiter = rateLimit({
  windowMs: GLOBAL_RATE_LIMIT_WINDOW_MS,
  limit: GLOBAL_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "TooManyRequestsError",
    message: "Too many requests, please try again later",
  },
});

/**
 * Rate limiter for transactions endpoint.
 * 100 requests per minute.
 */
export const transactionsRateLimiter = rateLimit({
  windowMs: TRANSACTIONS_RATE_LIMIT_WINDOW_MS,
  limit: TRANSACTIONS_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "TooManyRequestsError",
    message:
      "Too many requests to transactions endpoint, please try again later",
  },
});

/**
 * Rate limiter for single update transaction category endpoint.
 * 60 requests per minute.
 */
export const updateTransactionCategoryRateLimiter = rateLimit({
  windowMs: UPDATE_TRANSACTION_CATEGORY_RATE_LIMIT_WINDOW_MS,
  limit: UPDATE_TRANSACTION_CATEGORY_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "TooManyRequestsError",
    message:
      "Too many update transaction category requests, please try again later",
  },
});

/**
 * Rate limiter for batch update transaction category endpoint.
 * 20 requests per minute.
 */
export const batchUpdateTransactionCategoryRateLimiter = rateLimit({
  windowMs: BATCH_UPDATE_TRANSACTION_CATEGORY_RATE_LIMIT_WINDOW_MS,
  limit: BATCH_UPDATE_TRANSACTION_CATEGORY_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "TooManyRequestsError",
    message:
      "Too many batch update transaction category requests, please try again later",
  },
});

/**
 * Rate limiter for monthly spending report endpoint.
 * 30 requests per minute.
 */
export const monthlySpendingReportRateLimiter = rateLimit({
  windowMs: MONTHLY_SPENDING_REPORT_RATE_LIMIT_WINDOW_MS,
  limit: MONTHLY_SPENDING_REPORT_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "TooManyRequestsError",
    message:
      "Too many monthly spending report requests, please try again later",
  },
});
