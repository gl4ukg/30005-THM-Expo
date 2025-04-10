export const formatDate = (date: Date | undefined): string => {
  if (!date || isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  return `${date?.getDay()}-${date?.getMonth() + 1}-${date.getFullYear()}`;
};

export const convertToISOFormat = (dateString: string): string => {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};

export const stringToDate = (dateString: string) => {
  try {
    const parts = dateString.split('/');
    return new Date(Number(parts[2]), Number(parts[0]) - 1, Number(parts[1]));
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};
