import cors from "cors";
import express, { type Express, json, Response } from "express";
import helmet from "helmet";
import type { Server } from "http";

import { closePool, pool } from "./config/database";
import {
  API_V1_PATH,
  CORS_ORIGIN,
  HEALTH_PATH,
  PORT,
  REQUEST_BODY_LIMIT,
} from "./constants";
import { ReportController, TransactionController } from "./controllers";
import { Logger } from "./logger";
import { ErrorHandler } from "./middleware/error.middleware";
import { globalRateLimiter } from "./middleware/rate-limit.middleware";
import { ReportRepository, TransactionRepository } from "./repositories";
import { ReportRoutes, TransactionRoutes } from "./routes";
import { ReportService, TransactionService } from "./services";
import { HealthCheckResponse } from "./types";

const logger = new Logger();

// Create and configure Express app
export const app: Express = express();

app.use(helmet());
app.use(cors({ origin: CORS_ORIGIN }));
app.use(json({ limit: REQUEST_BODY_LIMIT }));
app.use(globalRateLimiter);

// Log configuration
logger.info("Application configured", {
  corsOrigin: CORS_ORIGIN,
  nodeEnv: process.env.NODE_ENV,
  port: PORT,
});

// Health check
app.get(HEALTH_PATH, (_req, res: Response<HealthCheckResponse>) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Initialize dependencies
const transactionRepository = new TransactionRepository(pool);
const transactionService = new TransactionService(
  transactionRepository,
  logger,
);
const transactionController = new TransactionController(transactionService);
const transactionRoutes = new TransactionRoutes(transactionController);

const reportRepository = new ReportRepository(pool);
const reportService = new ReportService(reportRepository, logger);
const reportController = new ReportController(reportService);
const reportRoutes = new ReportRoutes(reportController);

app.use(API_V1_PATH, transactionRoutes.router);
app.use(API_V1_PATH, reportRoutes.router);

// Error handling
const errorHandler = new ErrorHandler(logger);
app.use(errorHandler.handle);

/**
 * Start the Express server with error handling and graceful shutdown.
 * @param port - Optional port number (defaults to PORT from environment/constants)
 */
export const startServer = (port: number = PORT): Server => {
  const server = app
    .listen(port, () => {
      logger.info(`Server listening on port ${port}`);
    })
    .on("error", (error: NodeJS.ErrnoException) => {
      if (error.code === "EADDRINUSE") {
        logger.error(`Port ${port} is already in use`);
      } else {
        logger.error("Failed to start server", { error: error.message });
      }
      process.exit(1);
    });

  // Graceful shutdown handler
  const shutdown = async (signal: string) => {
    logger.info(`${signal} received, shutting down gracefully`);

    server.close(async () => {
      await closePool();
      logger.info("Server and database pool closed, exiting process");
      process.exit(0);
    });

    // Force shutdown after timeout (10s in production, 5s otherwise)
    const timeout = process.env.NODE_ENV === "production" ? 10000 : 5000;
    setTimeout(() => {
      logger.error("Forced shutdown due to timeout");
      process.exit(1);
    }, timeout).unref();
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  return server;
};

// Only start server if this is the main module
if (require.main === module) {
  startServer();
}
