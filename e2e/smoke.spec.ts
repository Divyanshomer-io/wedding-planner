import { expect, test } from '@playwright/test'

test('shell loads at 360px and navigates', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Shaadi Planner' })).toBeVisible()
  await page.getByRole('link', { name: 'Budget' }).click()
  await expect(page.getByRole('heading', { name: 'Budget' })).toBeVisible()
})
