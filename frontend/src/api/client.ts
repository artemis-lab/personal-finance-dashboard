import type { ApiResponse } from "../types";
import { ApiError } from "./errors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Generic API client for making HTTP requests to the backend.
 * Handles JSON serialization, error parsing, and response unwrapping.
 * @param endpoint - API endpoint path (e.g., "/transactions")
 * @param options - Optional fetch configuration (method, body, headers)
 * @returns Promise resolving to the typed response data
 * @throws {ApiError} When the API returns an error response
 */
export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data: ApiResponse<T> = await response.json();

  if (!data.success) {
    throw new ApiError(response.status, data.error, data.message, data.details);
  }

  return data.data;
}
