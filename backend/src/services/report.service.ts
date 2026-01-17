import type { ILogger } from "../logger";
import { Logger } from "../logger";
import type { IReportRepository } from "../repositories";
import type { MonthlySpendingReport } from "../types";
import { generateTraceId } from "../utils/helpers";
import type { IReportService } from "./report-service.interface";

export class ReportService implements IReportService {
  private logger: ILogger;
  private reportRepository: IReportRepository;

  constructor(
    reportRepository: IReportRepository,
    logger: ILogger = new Logger(),
  ) {
    this.reportRepository = reportRepository;
    this.logger = logger;
  }

  async getMonthlySpendingReport(
    yearMonth: string,
  ): Promise<MonthlySpendingReport> {
    const traceId = generateTraceId();
    this.logger.info("Fetching monthly spending report", {
      traceId,
      yearMonth,
    });

    const report =
      await this.reportRepository.fetchMonthlySpendingReport(yearMonth);

    this.logger.info("Monthly spending report fetched", {
      traceId,
      yearMonth,
      totalSpending: report.totalSpending,
      categoryCount: report.categories.length,
    });

    return report;
  }
}
