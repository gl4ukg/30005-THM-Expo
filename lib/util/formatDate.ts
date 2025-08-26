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
  let date = new Date(dateString);
  if (isNaN(date.getTime())) {
    const parts = dateString.split(/[-/]/);
    if (parts.length === 3) {
      const [day, month, year] = parts.map((p) => parseInt(p, 10));
      if (![day, month, year].some(isNaN) && year > 1000) {
        date = new Date(Date.UTC(year, month - 1, day));
      }
    }
  }

  return date.toISOString().split('T')[0];
};
export const dateStringToDDMMYY = (inputDate: string): string => {
  const dateRegex = /^(\d{2})-(\w{3})-(\d{4})$/;
  const match = inputDate.match(dateRegex);

  if (!match) {
    return 'Invalid date format';
  }

  const [day, monthName, year] = match.slice(1);
  const months: Record<string, string> = {
    JAN: '01',
    FEB: '02',
    MAR: '03',
    APR: '04',
    MAY: '05',
    JUN: '06',
    JUL: '07',
    AUG: '08',
    SEP: '09',
    OCT: '10',
    NOV: '11',
    DEC: '12',
  };

  const month = months[monthName.toUpperCase()];
  return `${day}${month}${year.slice(-2)}`;
};
