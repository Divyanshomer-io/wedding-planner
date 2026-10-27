// All money is integer INR rupees. Never use floats for stored amounts.
export const formatINR = (rupees: number): string =>
  '₹' + new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(rupees))

// Compact lakh/crore shorthand for tight spaces: ₹12.5L, ₹1.2Cr
export const formatINRShort = (rupees: number): string => {
  const abs = Math.abs(rupees)
  const sign = rupees < 0 ? '-' : ''
  const trim = (n: number) => String(Math.round(n * 10) / 10)
  if (abs >= 10_000_000) return `${sign}₹${trim(abs / 10_000_000)}Cr`
  if (abs >= 100_000) return `${sign}₹${trim(abs / 100_000)}L`
  return formatINR(rupees)
}
