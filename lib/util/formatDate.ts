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

// we have three possible formats: DD-MMM-YYYY (e.g., 01-JAN-2023), MM/DD/YYYY (e.g., 01/01/2023) and YYYY-MM-DD
// it can have additional time value: DD-MMM-YYYY HH:mm:SS (e.g., 01-JAN-2023 12:00:00), MM/DD/YYYY HH:mm:SS (e.g., 01/21/2023 12:00:00) and YYYY-MM-DDTHH:mm:SS (e.g., 2023-01-21T12:00:00)
// we need to convert all of them to DDMMYY and DD-MMM-YYYY and ISO format
//
interface DateFormats {
  ISO: string;
  SHOW: string;
  DDMMMYYYY: string;
}

// Month mapping for conversion
const monthMap: { [key: string]: number } = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

const monthNames = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];
export const stringToDate = (input: string): DateFormats => {
  // Try to parse the date using different formats
  let date: Date | null = null;

  // Format 1: DD-MMM-YYYY (with optional time)
  const format1 =
    /^(\d{2})-([A-Za-z]{3})-(\d{4})(?:\s+(\d{2}):(\d{2}):(\d{2}))?$/i;
  // Format 2: MM/DD/YYYY (with optional time)
  const format2 =
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{2}):(\d{2}):(\d{2}))?$/;
  // Format 3: YYYY-MM-DD (with optional time)
  const format3 = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:T(\d{2}):(\d{2}):(\d{2}))?$/;

  let match;
  if ((match = input.match(format1))) {
    const [, day, month, year, hours, minutes, seconds] = match;
    const monthIndex = monthMap[month.toUpperCase()];
    if (monthIndex === undefined) {
      throw new Error(`Invalid month abbreviation: ${month}`);
    }

    date = new Date(
      parseInt(year),
      monthIndex,
      parseInt(day),
      hours ? parseInt(hours) : 0,
      minutes ? parseInt(minutes) : 0,
      seconds ? parseInt(seconds) : 0,
    );
  } else if ((match = input.match(format2))) {
    const [, month, day, year, hours, minutes, seconds] = match;
    date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      hours ? parseInt(hours) : 0,
      minutes ? parseInt(minutes) : 0,
      seconds ? parseInt(seconds) : 0,
    );
  } else if ((match = input.match(format3))) {
    const [, year, month, day, hours, minutes, seconds] = match;
    date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      hours ? parseInt(hours) : 0,
      minutes ? parseInt(minutes) : 0,
      seconds ? parseInt(seconds) : 0,
    );
  }

  // Check if date is valid
  if (!date || isNaN(date.getTime())) {
    console.error('Invalid date format:', input);
    return {
      ISO: 'N/A',
      SHOW: 'N/A',
      DDMMMYYYY: 'N/A',
    };
  }

  // Format the date parts
  const day = String(date.getDate()).padStart(2, '0');
  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex];
  const monthNum = String(monthIndex + 1).padStart(2, '0');
  const yearFull = date.getFullYear();
  const yearShort = String(yearFull).slice(-2);
  const time = date.getHours() + date.getMinutes() + date.getSeconds();

  // Create the required formats
  return {
    ISO: `${yearFull}-${monthNum}-${day}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.000Z`,
    SHOW: `${day}${monthNum}${yearShort}`,
    DDMMMYYYY: `${day}-${monthName}-${yearFull}${time ? ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` : ''}`,
  };
};
