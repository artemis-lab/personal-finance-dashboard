import rateLimit from "express-rate-limit";

import {
  GLOBAL_RATE_LIMIT_MAX_REQUESTS,
  GLOBAL_RATE_LIMIT_WINDOW_MS,
  TRANSACTIONS_RATE_LIMIT_MAX_REQUESTS,
  TRANSACTIONS_RATE_LIMIT_WINDOW_MS,
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
