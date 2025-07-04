export const formatDate = (date: Date | undefined): string => {
  if (!date || isNaN(date.getTime())) {
    return '';
  }
  return `${date?.getDate()}-${(date?.getMonth() + 1)?.toString().padStart(2, '0')}-${date.getFullYear()}`;
};

export const convertToISOFormat = (dateString: string): string => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    const parts = dateString.split(/[-/]/);
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const isoDate = new Date(year, month - 1, day);
        if (!isNaN(isoDate.getTime())) {
          return isoDate.toISOString().split('T')[0];
        }
      }
    }
    return '';
  }

  return date.toISOString().split('T')[0];
};

export const stringToDate = (dateString: string) => {
  try {
    const parts = dateString.split('/');
    return new Date(Number(parts[2]), Number(parts[0]) - 1, Number(parts[1]));
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};
