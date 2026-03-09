import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendContactNotification } from '../contactNotifier';

describe('contactNotifier', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = vi.fn();
    // Reset environment variables
    vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', '');
    vi.stubEnv('VITE_SLACK_WEBHOOK_URL', '');
  });

  const mockFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    project: 'web',
    message: 'Test message',
  };

  describe('sendToEndpoint', () => {
    it('sends data to configured endpoint successfully', async () => {
      vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', 'https://api.example.com/contact');
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      const result = await sendContactNotification(mockFormData);

      expect(result.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/contact',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    it('handles endpoint errors', async () => {
      vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', 'https://api.example.com/contact');
      
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const result = await sendContactNotification(mockFormData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('HTTP 500');
    });

    it('includes form data in request payload', async () => {
      vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', 'https://api.example.com/contact');
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      await sendContactNotification(mockFormData);

      const callArgs = global.fetch.mock.calls[0];
      const payload = JSON.parse(callArgs[1].body);

      expect(payload.name).toBe('John Doe');
      expect(payload.email).toBe('john@example.com');
      expect(payload.project).toBe('web');
      expect(payload.message).toBe('Test message');
      expect(payload.source).toBeDefined();
    });
  });

  describe('sendToLegacySlackWebhook', () => {
    it('sends data to Slack webhook when endpoint not configured', async () => {
      vi.stubEnv('VITE_SLACK_WEBHOOK_URL', 'https://hooks.slack.com/test');
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      const result = await sendContactNotification(mockFormData);

      expect(result.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://hooks.slack.com/test',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
      );
    });

    it('formats Slack payload correctly', async () => {
      vi.stubEnv('VITE_SLACK_WEBHOOK_URL', 'https://hooks.slack.com/test');
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      await sendContactNotification(mockFormData);

      const callArgs = global.fetch.mock.calls[0];
      const body = callArgs[1].body;
      
      expect(body).toContain('payload=');
      expect(body).toContain('John%20Doe');
      expect(body).toContain('john%40example.com');
    });
  });

  describe('error handling', () => {
    it('returns error when no endpoint configured', async () => {
      const result = await sendContactNotification(mockFormData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Contact endpoint not configured');
    });

    it('handles network errors', async () => {
      vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', 'https://api.example.com/contact');
      
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await sendContactNotification(mockFormData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Network error');
    });
  });

  describe('endpoint priority', () => {
    it('prefers endpoint over legacy webhook', async () => {
      vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', 'https://api.example.com/contact');
      vi.stubEnv('VITE_SLACK_WEBHOOK_URL', 'https://hooks.slack.com/test');
      
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      await sendContactNotification(mockFormData);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/contact',
        expect.any(Object)
      );
    });
  });
});
