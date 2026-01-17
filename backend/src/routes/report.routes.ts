import { Router } from "express";

import { REPORTS_PATH } from "../constants";
import { ReportController } from "../controllers/report.controller";
import { monthlySpendingReportRateLimiter } from "../middleware/rate-limit.middleware";

/**
 * Configures routes for report-related endpoints.
 */
export class ReportRoutes {
  router = Router();
  private reportController: ReportController;

  constructor(reportController: ReportController) {
    this.reportController = reportController;
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(
      `${REPORTS_PATH}/monthly/:yearMonth`,
      monthlySpendingReportRateLimiter,
      this.reportController.getMonthlySpendingReport,
    );
  }
}
