import {
  DateFormatter,
  getMonthAbbrevationByIndex,
  getMonthIndexByAbbrevation,
} from '@/lib/util/date';

describe('DateFormatter', () => {
  describe('fromDate', () => {
    it('should create DateFormatter from valid Date object', () => {
      const date = new Date('2023-01-15T10:30:00Z');
      const formatter = DateFormatter.fromDate(date);
      expect(formatter).not.toBeNull();
    });

    it('should return null for invalid Date object', () => {
      const invalidDate = new Date('invalid');
      const formatter = DateFormatter.fromDate(invalidDate);
      expect(formatter).toBeNull();
    });

    it('should return null for non-Date object', () => {
      const formatter = DateFormatter.fromDate('2023-01-15' as any);
      expect(formatter).toBeNull();
    });
  });

  describe('fromString', () => {
    it('should create DateFormatter from valid date string', () => {
      const formatter = DateFormatter.fromString('2023-01-15');
      expect(formatter).not.toBeNull();
    });

    it('should create DateFormatter from SQL date format', () => {
      const formatter = DateFormatter.fromString('15-JAN-2023');
      expect(formatter).not.toBeNull();
    });

    it('should return null for empty string', () => {
      const formatter = DateFormatter.fromString('');
      expect(formatter).toBeNull();
    });

    it('should return null for whitespace string', () => {
      const formatter = DateFormatter.fromString('   ');
      expect(formatter).toBeNull();
    });

    it('should return null for non-string input', () => {
      const formatter = DateFormatter.fromString(null as any);
      expect(formatter).toBeNull();
    });

    it('should return null for invalid SQL date format', () => {
      const formatter = DateFormatter.fromString('32-XYZ-2023');
      expect(formatter).toBeNull();
    });
  });

  describe('iso format', () => {
    it('should return ISO 8601 format', () => {
      const date = new Date('2023-01-15T10:30:45.123Z');
      const formatter = DateFormatter.fromDate(date);
      expect(formatter?.iso).toBe('2023-01-15T10:30:45.123Z');
    });
  });

  describe('isoZeroTime format', () => {
    it('should return ISO format with zero time', () => {
      const date = new Date('2023-01-15T10:30:45Z');
      const formatter = DateFormatter.fromDate(date);
      expect(formatter?.isoZeroTime).toBe('2023-01-15T00:00:00Z');
    });
  });

  describe('sql format', () => {
    it('should return SQL date format', () => {
      const date = new Date('2023-01-15');
      const formatter = DateFormatter.fromDate(date);
      expect(formatter?.sql).toBe('15-JAN-2023');
    });

    it('should pad single digit days', () => {
      const date = new Date('2023-01-05');
      const formatter = DateFormatter.fromDate(date);
      expect(formatter?.sql).toBe('05-JAN-2023');
    });
  });

  describe('short format', () => {
    it('should return short date format', () => {
      const date = new Date('2023-01-15');
      const formatter = DateFormatter.fromDate(date);
      expect(formatter?.short).toBe('150123');
    });

    it('should pad single digit days and months', () => {
      const date = new Date('2023-01-05');
      const formatter = DateFormatter.fromDate(date);
      expect(formatter?.short).toBe('050123');
    });
  });
});

describe('getMonthAbbrevationByIndex', () => {
  it('should return correct abbreviation for valid indices', () => {
    expect(getMonthAbbrevationByIndex(0)).toBe('JAN');
    expect(getMonthAbbrevationByIndex(5)).toBe('JUN');
    expect(getMonthAbbrevationByIndex(11)).toBe('DEC');
  });

  it('should return null for invalid indices', () => {
    expect(getMonthAbbrevationByIndex(-1)).toBeNull();
    expect(getMonthAbbrevationByIndex(12)).toBeNull();
    expect(getMonthAbbrevationByIndex(100)).toBeNull();
  });
});

describe('getMonthIndexByAbbrevation', () => {
  it('should return correct index for valid abbreviations', () => {
    expect(getMonthIndexByAbbrevation('JAN')).toBe(0);
    expect(getMonthIndexByAbbrevation('jun')).toBe(5);
    expect(getMonthIndexByAbbrevation('DEC')).toBe(11);
  });

  it('should handle partial matches', () => {
    expect(getMonthIndexByAbbrevation('January')).toBe(0);
    expect(getMonthIndexByAbbrevation('Feb')).toBe(1);
  });

  it('should return NaN for invalid abbreviations', () => {
    expect(getMonthIndexByAbbrevation('XYZ')).toBeNaN();
    expect(getMonthIndexByAbbrevation('')).toBeNaN();
    expect(getMonthIndexByAbbrevation('13')).toBeNaN();
  });
});
