/**
 * Custom error class for API errors with status code and validation details.
 */
export class ApiError extends Error {
  /** HTTP status code */
  status: number;
  /** Error type identifier */
  error: string;
  /** Field-level validation errors */
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
