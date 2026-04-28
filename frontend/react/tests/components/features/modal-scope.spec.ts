import { test, expect } from '@playwright/test'

test('Modal Scope Screenshot', async ({ page }) => {
  await page.goto(
    'http://localhost:6006/iframe.html?id=features-modalscopestyle--default',
  )

  await expect(page).toHaveScreenshot('modalscopestyle--default.png')
})
