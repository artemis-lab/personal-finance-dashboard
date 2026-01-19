// Common response types

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
