// Server configuration
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
export const PORT = Number(process.env.PORT) || 3000;
export const REQUEST_BODY_LIMIT = "50mb";

// Paths
export const API_V1_PATH = "/api/v1";
export const HEALTH_PATH = "/health";
export const TRANSACTIONS_PATH = "/transactions";

// Global rate limiting (per IP, all endpoints)
export const GLOBAL_RATE_LIMIT_MAX_REQUESTS = 100;
export const GLOBAL_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15min

// Transactions endpoint rate limiting
export const TRANSACTIONS_RATE_LIMIT_MAX_REQUESTS = 100;
export const TRANSACTIONS_RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1min
