/**
 * Date utility functions for formatting dates in Arabic locale
 */

/**
 * Formats a date with weekday, day, and month in Arabic
 * @param date - The date to format (defaults to current date)
 * @returns Formatted date string in Arabic (e.g., "الأحد، ٢٩ ديسمبر")
 */
export const formatDateWithWeekday = (date: Date = new Date()): string => {
  return new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
};

/**
 * Formats a date with full details including year
 * @param date - The date to format (defaults to current date)
 * @returns Formatted date string in Arabic (e.g., "الأحد، ٢٩ ديسمبر ٢٠٢٥")
 */
export const formatDateFull = (date: Date = new Date()): string => {
  return new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

/**
 * Formats a date with short format
 * @param date - The date to format (defaults to current date)
 * @returns Formatted date string in Arabic (e.g., "٢٩/١٢/٢٠٢٥")
 */
export const formatDateShort = (date: Date = new Date()): string => {
  return new Intl.DateTimeFormat("ar-EG").format(date);
};

/**
 * Gets the current day of the week (0 = Sunday, 6 = Saturday)
 * @returns Day of the week as a number
 */
export const getCurrentDayOfWeek = (): number => {
  return new Date().getDay();
};

/**
 * Checks if a given day is a weekend (Friday or Saturday in Egypt)
 * @param dayOfWeek - Day of the week (0 = Sunday, 6 = Saturday)
 * @returns True if the day is Friday or Saturday
 */
export const isWeekend = (
  dayOfWeek: number = getCurrentDayOfWeek()
): boolean => {
  return dayOfWeek === 5 || dayOfWeek === 6; // Friday or Saturday
};
