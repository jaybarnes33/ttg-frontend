export const TIDE_TIMES = [
  { label: 'None', start: null, end: null }, // Or 0, 0 if you want numbers only
  { label: '6–9 AM', start: 6, end: 9 },
  { label: '9–12 PM', start: 9, end: 12 },
  { label: '12–3 PM', start: 12, end: 15 },
  { label: '3–9 PM', start: 15, end: 21 },
];

export const TIDE_TYPES = [
  { value: 0, label: 'N/A', code: null },
  { value: 1, label: 'LOW', code: 'L' },
  { value: 2, label: 'MED', code: 'M' }, // If you use "M"
  { value: 3, label: 'HIGH', code: 'H' },
];

// Converts tide code to slider value (number)
export const tideCodeToValue = (code: string | null | undefined): number => {
  if (code === 'L') return 1;
  if (code === 'M') return 2;
  if (code === 'H') return 3;
  return 0; // N/A or unknown code
};

// Converts slider value (number) to tide code (string or null)
export const getTideCode = (value: number): string | null => {
  if (value === 1) return 'L';
  if (value === 2) return 'M';
  if (value === 3) return 'H';
  return ''; // N/A
};

// Converts tide code OR slider value to display label
export const getTideLabel = (input: string | number | null | undefined): string => {
  if (typeof input === 'number') {
    // Numeric index (slider value)
    const match = TIDE_TYPES.find((t) => t.value === input);
    return match?.label || 'N/A';
  }
  // Code (string)
  if (input === 'L') return 'LOW';
  if (input === 'M') return 'MED';
  if (input === 'H') return 'HIGH';
  return 'N/A';
};
