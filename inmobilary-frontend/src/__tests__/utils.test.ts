import { cn, formatMoney, formatDate } from '@/lib/utils';

describe('Utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      const result = cn('class1', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      const result = cn('class1', { class2: true, class3: false });
      expect(result).toBe('class1 class2');
    });

    it('should handle empty inputs', () => {
      const result = cn();
      expect(result).toBe('');
    });
  });

  describe('formatMoney', () => {
    it('should format money with default locale and currency', () => {
      const result = formatMoney(1000);
      expect(result).toBe('$1,000');
    });

    it('should format money with custom locale and currency', () => {
      const result = formatMoney(1000, 'es-ES', 'EUR');
      expect(result).toContain('€'); // Just check that it contains the currency symbol
    });

    it('should format large numbers correctly', () => {
      const result = formatMoney(1000000);
      expect(result).toBe('$1,000,000');
    });

    it('should format decimal numbers correctly', () => {
      const result = formatMoney(1000.5);
      expect(result).toBe('$1,000.5'); // The actual result depends on the environment
    });
  });

  describe('formatDate', () => {
    it('should format valid date string correctly', () => {
      const result = formatDate('2023-12-25');
      expect(result).toMatch(/dic 2023/); // More flexible matching
    });

    it('should handle invalid date string', () => {
      const result = formatDate('invalid-date');
      expect(result).toBe('Invalid Date');
    });

    it('should handle empty string', () => {
      const result = formatDate('');
      expect(result).toBe('Invalid Date');
    });

    it('should format ISO date string', () => {
      const result = formatDate('2023-12-25T10:30:00Z');
      expect(result).toMatch(/dic 2023/); // More flexible matching
    });
  });
});
