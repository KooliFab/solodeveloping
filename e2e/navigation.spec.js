import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home page loads and shows hero content', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/SoloDeveloping/i);
    await expect(page.locator('nav')).toBeVisible();
  });

  test('skip to main content link is accessible', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await expect(skipLink).toBeFocused();
  });

  test('navbar links navigate correctly', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /about/i }).first().click();
    await expect(page).toHaveURL('/about');
  });

  test('articles page loads', async ({ page }) => {
    await page.goto('/articles');
    await expect(page.locator('main')).toBeVisible();
  });

  test('404 page shows for unknown routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    // NotFound page shows "Lost in Space?" as its title
    await expect(page.getByText(/Lost in Space|Back to Base/i).first()).toBeVisible();
  });
});
