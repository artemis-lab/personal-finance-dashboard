export class ApiError extends Error {
  status: number;
  error: string;
  details?: Array<{ field: string; message: string }>;

  constructor(
    status: number,
    error: string,
    message: string,
    details?: Array<{ field: string; message: string }>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.error = error;
    this.details = details;
  }
}
