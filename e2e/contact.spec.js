import { test, expect } from '@playwright/test';

test.describe('Contact', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact');
  });

  test('offers a mailto call to action instead of a form', async ({ page }) => {
    const contact = page.locator('section#contact');
    await expect(contact).toBeVisible();
    await expect(contact.locator('form')).toHaveCount(0);

    const cta = contact.getByRole('link', { name: /email me/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /^mailto:hello@solodeveloping\.com\?subject=/);
  });

  test('never calls a Slack webhook from the browser', async ({ page }) => {
    const slackRequests = [];
    page.on('request', (request) => {
      if (request.url().includes('hooks.slack.com')) slackRequests.push(request.url());
    });

    await page.goto('/');
    await page.goto('/fullstack');
    await page.goto('/#contact');

    expect(slackRequests).toHaveLength(0);
  });
});
