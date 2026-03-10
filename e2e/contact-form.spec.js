import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact');
  });

  test('contact form fields are present', async ({ page }) => {
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
  });

  test('submit button is visible and enabled', async ({ page }) => {
    // Button text is "TRANSMIT" and is enabled by default (uses native HTML required validation)
    const submitButton = page.getByRole('button', { name: /transmit/i });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });

  test('form uses native required validation on fields', async ({ page }) => {
    // All required fields should have the required attribute
    await expect(page.getByLabel(/name/i)).toHaveAttribute('required');
    await expect(page.getByLabel(/email/i)).toHaveAttribute('required');
    await expect(page.getByLabel(/message/i)).toHaveAttribute('required');
  });
});
