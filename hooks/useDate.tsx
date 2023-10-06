const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  timeZone: 'UTC',
};

export const useShortDate = (date: string): string => {
  return Intl.DateTimeFormat('en-US', options).format(new Date(date));
};
