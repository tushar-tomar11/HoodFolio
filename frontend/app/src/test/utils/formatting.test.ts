import { describe, expect, it } from 'vitest';
import { formatPercent, formatPremium, formatTokenAmount, formatUSD, timeAgo, truncateAddress } from '@/utils/formatting';

describe('formatting utilities', () => {
  describe('formatUSD', () => {
    it('formats standard numbers correctly', () => {
      expect(formatUSD(84210.47)).toBe('$84,210.47');
      expect(formatUSD(0)).toBe('$0.00');
      expect(formatUSD(1.5)).toBe('$1.50');
    });
    it('handles negative numbers', () => {
      expect(formatUSD(-1342.18)).toBe('-$1,342.18');
    });
    it('respects decimal parameter', () => {
      expect(formatUSD(142.1234, 4)).toBe('$142.1234');
    });
  });

  describe('formatTokenAmount', () => {
    it('correctly converts 18-decimal bigint to human amount', () => {
      const rawBalance = BigInt('1000000000000000000');
      expect(formatTokenAmount(rawBalance, 18)).toBe('1.0000');
    });
    it('correctly converts 6-decimal USDG bigint', () => {
      const rawBalance = BigInt('1000000000');
      expect(formatTokenAmount(rawBalance, 6)).toBe('1,000.00');
    });
    it('cRITICAL: USDG 6 vs 18 decimals gives vastly different results', () => {
      const rawBalance = BigInt('1000000000');
      const wrong = Number(rawBalance) / 10 ** 18;
      const correct = Number(rawBalance) / 10 ** 6;
      expect(correct).toBe(1000);
      expect(wrong).toBeLessThan(0.001);
    });
  });

  describe('formatPercent', () => {
    it('shows + sign for positive', () => {
      expect(formatPercent(1.62)).toBe('+1.62%');
    });
    it('shows - sign for negative', () => {
      expect(formatPercent(-0.43)).toBe('-0.43%');
    });
    it('hides sign when showSign=false', () => {
      expect(formatPercent(1.62, false)).toBe('1.62%');
    });
    it('handles zero', () => {
      expect(formatPercent(0)).toBe('+0.00%');
    });
  });

  describe('formatPremium', () => {
    it('labels positive premium correctly', () => {
      const result = formatPremium(0.36);
      expect(result.type).toBe('premium');
      expect(result.text).toContain('PREMIUM');
      expect(result.text).toContain('0.36');
    });
    it('labels negative premium as discount', () => {
      const result = formatPremium(-0.21);
      expect(result.type).toBe('discount');
      expect(result.text).toContain('DISCOUNT');
    });
    it('returns AT PAR for small differences (< 0.1%)', () => {
      expect(formatPremium(0.05).type).toBe('par');
      expect(formatPremium(-0.08).type).toBe('par');
    });
  });

  describe('truncateAddress', () => {
    it('truncates long addresses correctly', () => {
      const addr = '0x4A5E1f89A8B2C9D7E3F4A5B6C7D8E9F0A1B2C3D4';
      expect(truncateAddress(addr)).toBe('0x4A5E...C3D4');
    });
    it('returns short strings unchanged', () => {
      expect(truncateAddress('0x1234')).toBe('0x1234');
    });
    it('respects custom chars parameter', () => {
      const addr = '0x4A5E1f89A8B2C9D7E3F4A5B6C7D8E9F0A1B2C3D4';
      expect(truncateAddress(addr, 6)).toBe('0x4A5E1f...B2C3D4');
    });
  });

  describe('timeAgo', () => {
    it('returns "just now" for timestamps < 60s ago', () => {
      const now = Math.floor(Date.now() / 1000) - 30;
      expect(timeAgo(now)).toBe('just now');
    });
    it('returns minutes for 1-59 minutes ago', () => {
      const t = Math.floor(Date.now() / 1000) - 120;
      expect(timeAgo(t)).toBe('2m ago');
    });
    it('returns hours for 1-23 hours ago', () => {
      const t = Math.floor(Date.now() / 1000) - 7200;
      expect(timeAgo(t)).toBe('2h ago');
    });
    it('returns days for 24+ hours ago', () => {
      const t = Math.floor(Date.now() / 1000) - 86400 * 3;
      expect(timeAgo(t)).toBe('3d ago');
    });
  });
});
