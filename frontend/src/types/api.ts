/** API error response structure */
export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

/** API success response wrapper */
export interface SuccessResponse<T> {
  success: true;
  data: T;
}

/** Union type for all API responses */
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
