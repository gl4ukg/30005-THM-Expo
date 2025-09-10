/**
 * Mapping of month indices to their three-letter abbreviations.
 */
const monthAbbrIndexMap = [
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
] as const;

/**
 * Gets the abbreviated month name for a given month index.
 * @param index - The zero-based month index (0 = January, 1 = February, ..., 11 = December).
 * @returns The abbreviated upper case month name (e.g., "JAN", "FEB") or null if the index is out of range.
 */
export function getMonthAbbrevationByIndex(index: number): string | null {
  return index >= 0 && index <= 11 ? monthAbbrIndexMap[index] : null;
}

/**
 * Gets the zero-based month index for a given month abbreviation.
 * @param abbr - The month abbreviation (e.g., "Jan", "Feb", "Mar"). Case-insensitive and only the first 3 characters are used.
 * @returns The zero-based month index (0-11) if found, or NaN if the abbreviation is invalid.
 */
export function getMonthIndexByAbbrevation(abbr: string): number | typeof NaN {
  const index = monthAbbrIndexMap.indexOf(
    abbr.slice(0, 3).toUpperCase() as (typeof monthAbbrIndexMap)[number],
  );
  return index !== -1 ? index : NaN;
}

/**
 * A utility class for formatting dates into various string representations.
 * Provides cached formatting methods for common date formats including ISO 8601,
 * SQL date format, and short date format. All formatting is performed lazily
 * and results are cached for performance.
 */
export class DateFormatter {
  private _date: Date;

  private _dayPadded?: string;
  private _monthPadded?: string;
  private _yearShort?: string;

  private _iso?: string;
  /**
   * ISO 8601 UTC format (`YYYY-MM-DDTHH:mm:ssZ`).
   */
  get iso() {
    return (this._iso ??= this._date.toISOString());
  }

  private _isoZeroTime?: string;
  /**
   * ISO 8601 UTC format with zero time (`YYYY-MM-DDT00:00:00Z`).
   */
  get isoZeroTime() {
    return (this._isoZeroTime ??= this.iso.split('T')[0] + 'T00:00:00Z');
  }

  private _sql?: string;

  /**
   * SQL date format (`DD-MON-YYYY`).
   */
  get sql() {
    return (this._sql ??= `${this._dayPadded}-${getMonthAbbrevationByIndex(this._date.getMonth())}-${this._date.getFullYear()}`);
  }

  private _short?: string;
  /**
   * Short date format (`DDMMYY`).
   */
  get short() {
    return (this._short ??= `${this._dayPadded}${this._monthPadded}${this._yearShort}`);
  }

  /**
   * Creates a DateFormatter instance from a Date object.
   * @param date - The Date object to create a DateFormatter from.
   * @returns A new DateFormatter instance if the date is valid, null otherwise.
   */
  static fromDate(date: Date): DateFormatter | null {
    if (!(date instanceof Date)) {
      console.debug(
        'Failed to create DateFormatter: Value is not a Date object.',
      );
      return null;
    }

    if (isNaN(date.getTime())) {
      console.debug('Failed to create DateFormatter: Invalid date.');
      return null;
    }

    return new DateFormatter(date);
  }

  /**
   * Creates a DateFormatter instance from a string representation of a date.
   * @param value - The string representation of the date to parse
   * @returns A new DateFormatter instance if the string is valid, null otherwise
   */
  static fromString(value: string): DateFormatter | null {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      return null;
    }

    // console.debug(`Parsing date string: ${value}`);

    // Current version of Date can not parse Oracle SQL date format (DD-MON-YYYY).
    // Convert it to a format that can be parsed (YYYY-MM-DD).
    // Otherwise, rely on the Date constructor to parse the string.
    if (/^\d{1,2}-\w{3,4}-\d{1,4}$/.test(value)) {
      const parts = value.split('-');
      const day = parseInt(parts[0]);
      const month = getMonthIndexByAbbrevation(parts[1]);
      const year = parseInt(parts[2]);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return DateFormatter.fromDate(new Date(year, month, day));
      } else {
        console.debug(
          `Failed to parse date string: ${value}`,
        );
        return null;
      }
    } else {
      return DateFormatter.fromDate(new Date(value));
    }
  }

  private constructor(date: Date) {
    this._date = date;
    this._dayPadded = this._date.getDate().toString().padStart(2, '0');
    this._monthPadded = (this._date.getMonth() + 1).toString().padStart(2, '0');
    this._yearShort = this._date.getFullYear().toString().slice(-2);
  }
}
