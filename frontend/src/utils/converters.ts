export const toYearMonth = (dateString: string | null): string | undefined => {
  if (!dateString) {
    return undefined;
  }
  // dateString is in format "YYYY-MM-DD", extract "YYYY-MM"
  return dateString.slice(0, 7);
};
