const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  timeZone: 'UTC',
};

export const useShortDate = (date?: string): string | null => {
  if (!date) {
    return null;
  }

  return Intl.DateTimeFormat('en-US', options).format(new Date(date));
};
