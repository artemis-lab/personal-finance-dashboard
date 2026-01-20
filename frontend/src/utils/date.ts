/**
 * Extracts the year and month from a date string.
 * @param dateString - Date in "YYYY-MM-DD" format, or null
 * @returns Year-month string in "YYYY-MM" format, or undefined if input is null
 */
export const toYearMonth = (dateString: string | null): string | undefined => {
  if (!dateString) {
    return undefined;
  }
  return dateString.slice(0, 7);
};
