import type { NextFunction, Request, Response } from "express";

import type { IReportService } from "../services";
import type { MonthlySpendingReportResponse } from "../types";
import { yearMonthParamSchema } from "../validators";

/**
 * Controller for handling report-related HTTP requests.
 */
export class ReportController {
  private reportService: IReportService;

  constructor(reportService: IReportService) {
    this.reportService = reportService;
  }

  /**
   * Retrieves a monthly spending report for a specific year and month.
   *
   * @param request - Express request with path parameter:
   *   - `yearMonth` - Year and month in ISO format (e.g., "2026-01")
   * @param response - Express response containing the monthly spending report
   * @param next - Express next function for error handling
   */
  getMonthlySpendingReport = async (
    request: Request,
    response: Response<MonthlySpendingReportResponse>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { yearMonth } = yearMonthParamSchema.parse(request.params);
      const report =
        await this.reportService.getMonthlySpendingReport(yearMonth);

      response.status(200).json({ success: true, data: { report } });
    } catch (error) {
      next(error);
    }
  };
}
