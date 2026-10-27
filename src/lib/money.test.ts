import { describe, expect, it } from 'vitest'
import { formatINR, formatINRShort } from './money'

describe('money formatting', () => {
  it('uses Indian digit grouping', () => {
    expect(formatINR(1250000)).toBe('₹12,50,000')
  })
  it('uses lakh/crore shorthand', () => {
    expect(formatINRShort(1250000)).toBe('₹12.5L')
    expect(formatINRShort(12000000)).toBe('₹1.2Cr')
    expect(formatINRShort(9500)).toBe('₹9,500')
  })
})
