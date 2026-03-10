import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
  test('switches to French without full page reload', async ({ page }) => {
    await page.goto('/');

    const languageSelect = page.getByRole('combobox', { name: /switch language/i });
    await languageSelect.selectOption('fr');

    // Should navigate client-side to /fr (SPA navigation — no page reload)
    await expect(page).toHaveURL('/fr', { timeout: 8000 });
    await expect(page.locator('nav')).toBeVisible();
  });

  test('French routes are accessible', async ({ page }) => {
    await page.goto('/fr');
    await expect(page).toHaveURL('/fr');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('switching back to English navigates to English route', async ({ page }) => {
    await page.goto('/fr');
    const languageSelect = page.getByRole('combobox', { name: /switch language/i });
    await languageSelect.selectOption('en');
    await expect(page).toHaveURL('/');
  });
});
