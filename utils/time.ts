/**
 * Converts a 24-hour format hour to 12-hour format with AM/PM
 * @param hour - The hour in 24-hour format (0-23)
 * @returns A string in 12-hour format with AM/PM (e.g., "1:00 PM")
 */
export const getTime = (hour: number): string => {
  if (hour < 0 || hour > 23) {
    throw new Error('Hour must be between 0 and 23');
  }

  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12; // Convert 0 to 12 for 12 AM
  return `${hour12}:00 ${period}`;
};
