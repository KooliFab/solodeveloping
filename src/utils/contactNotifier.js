const buildPayload = (formData) => ({
  name: formData.name,
  email: formData.email,
  project: formData.project,
  message: formData.message,
  source: window.location.href,
});

const sendToEndpoint = async (endpoint, formData) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildPayload(formData)),
  });

  if (!response.ok) {
    return { success: false, error: `HTTP ${response.status}` };
  }

  return { success: true };
};

const sendToSlackWebhook = async (webhookUrl, formData) => {
  const payload = {
    text: 'Contact Form Submission',
    attachments: [
      {
        color: '#22c55e',
        fields: [
          { title: 'Name', value: formData.name, short: true },
          { title: 'Email', value: formData.email, short: true },
          { title: 'Project', value: formData.project, short: true },
          { title: 'Message', value: formData.message, short: false },
          { title: 'Source', value: window.location.href, short: false },
        ],
      },
    ],
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `payload=${encodeURIComponent(JSON.stringify(payload))}`,
  });

  if (!response.ok) {
    return { success: false, error: `HTTP ${response.status}` };
  }

  return { success: true };
};

/**
 * Sends the contact form notification.
 *
 * Two intentional delivery strategies, tried in order:
 *
 * 1. VITE_CONTACT_FORM_ENDPOINT — preferred. POST to a backend proxy that
 *    handles enrichment, validation and forwarding. The webhook URL never
 *    leaves the server.
 *
 * 2. VITE_SLACK_WEBHOOK_URL — direct Slack Incoming Webhook, used when no
 *    backend proxy is configured. The URL is read exclusively from the
 *    environment variable and is never hardcoded in source. Set this variable
 *    in your deployment environment to enable this path.
 */
export const sendContactNotification = async (formData) => {
  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
  const slackWebhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL;

  try {
    if (endpoint) {
      return await sendToEndpoint(endpoint, formData);
    }

    if (slackWebhookUrl) {
      return await sendToSlackWebhook(slackWebhookUrl, formData);
    }

    return {
      success: false,
      error: 'Contact endpoint not configured',
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
