import formatCurrency from '../lib/formatCurrency';
import { describe, it, expect } from 'vitest';

describe('formatCurrency', () => {
  it('should return a formatted currency string', () => {
    expect(formatCurrency(100)).toEqual('$100.00');
    expect(formatCurrency(0.5)).toEqual('$0.50');
    expect(formatCurrency(0.01)).toEqual('$0.01');
    expect(formatCurrency(-5)).toEqual('-$5.00');
    expect(formatCurrency(0)).toEqual('$0.00');
    expect(formatCurrency(-0.01)).toEqual('-$0.01');
    expect(formatCurrency(-0.5)).toEqual('-$0.50');
    expect(formatCurrency(-100)).toEqual('-$100.00');
  });
});
