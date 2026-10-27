import { describe, expect, it } from 'vitest'
import priors from '../../data/allocation-priors.json'

describe('allocation priors', () => {
  it.each(Object.entries(priors.tiers))('%s tier sums to exactly 100%%', (_tier, cats) => {
    const total = Object.values(cats).reduce((a, b) => a + b, 0)
    expect(total).toBe(10000)
  })

  it('keeps contingency at 7-8% in every tier', () => {
    for (const cats of Object.values(priors.tiers)) {
      expect(cats.contingency).toBeGreaterThanOrEqual(700)
      expect(cats.contingency).toBeLessThanOrEqual(800)
    }
  })
})
