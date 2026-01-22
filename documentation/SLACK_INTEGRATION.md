# Slack Button Tracking Integration

Send Slack notifications when users click buttons on your website, with device info, location, user agent, and custom data.

## Quick Setup

### 1. Create Slack Webhook (5 minutes)

1. Go to https://api.slack.com/messaging/webhooks
2. Click "Create New App" → "From scratch"
3. Name it (e.g., "Website Analytics") and select your workspace
4. Go to "Incoming Webhooks" → Toggle ON
5. Click "Add New Webhook to Workspace"
6. Select a channel (e.g., #analytics)
7. Copy the webhook URL

### 2. Configure Environment

Add to your `.env` file:

```bash
VITE_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### 3. Restart Server

```bash
npm run dev
```

### 4. Test

Click any button on your site and check your Slack channel!

## What Gets Tracked

Every notification includes:
- **Device**: Type (Desktop/Mobile/Tablet), OS, Browser, Screen resolution
- **Location**: Timezone, Language
- **Page**: URL, Path, Referrer
- **Timestamp**: When the action occurred
- **Custom Data**: Button-specific information

## Currently Tracked Buttons

- **Buy Now** - Tracks purchases
- **Download App** - Tracks app downloads
- **Newsletter Subscribe** - Tracks email subscriptions (email masked)
- **Book Landing Form** - Tracks form submissions (email masked, UTM params)

## Usage

### Basic Button Tracking

```javascript
import { trackButtonClick } from '@/utils/slackNotifier';

const MyButton = () => {
  const handleClick = () => {
    trackButtonClick('My Button Name');
    // Your button logic
  };

  return <button onClick={handleClick}>Click Me</button>;
};
```

### With Custom Data

```javascript
trackButtonClick('Purchase Button', {
  'Product': 'Premium Plan',
  'Price': '$29.99',
  'Status': 'Success',
});
```

### Form Submission Example

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    await submitForm(formData);
    
    trackButtonClick('Contact Form', {
      'Email': email.replace(/(.{2})(.*)(@.*)/, '$1***$3'), // Mask email
      'Status': 'Success',
    });
  } catch (error) {
    trackButtonClick('Contact Form', {
      'Status': 'Failed',
      'Error': error.message,
    });
  }
};
```

## Example Notification

```
🎯 Button Click: Buy Now Button

Device Type: Desktop          OS: macOS
Browser: Chrome               Screen: 1920x1080

Timezone: America/New_York    Language: en-US
Page: /                       Referrer: Direct

URL: https://cognibook.com/

Action: Redirect to Amazon
Page: /

🕐 2024-12-02T15:30:45.123Z
```

## Troubleshooting

**No notifications appearing?**

1. Check `VITE_SLACK_WEBHOOK_URL` is set in `.env`
2. Restart dev server after adding env variable
3. Check browser console for errors
4. Verify webhook is active in Slack

**Test webhook directly:**
```bash
curl -X POST -H 'Content-type: application/json' \
--data '{"text":"Test message"}' \
YOUR_WEBHOOK_URL
```

## Privacy & Security

- ✅ Email addresses automatically masked (e.g., `jo***@example.com`)
- ✅ No passwords or sensitive data tracked
- ✅ Webhook URL in `.env` (not committed to git)
- ✅ Non-blocking async tracking (no UI impact)

## Files

- `src/utils/slackNotifier.js` - Main tracking utility
- `src/utils/slackNotifier.test.jsx` - Test component
- `.env` - Webhook configuration

## Testing

Use the test component to verify everything works:

```javascript
import SlackNotifierTest from '@/utils/slackNotifier.test';

// Add to any page temporarily
<SlackNotifierTest />
```

## More Examples

### External Link Tracking
```javascript
const handleClick = () => {
  trackButtonClick('External Link', {
    'Destination': href,
    'Link Text': children,
  });
};
```

### Video Play Tracking
```javascript
const handlePlay = () => {
  trackButtonClick('Video Play', {
    'Video Title': videoTitle,
    'Video URL': videoUrl,
  });
};
```

### A/B Testing
```javascript
trackButtonClick('CTA Button', {
  'Variant': isVariantA ? 'A' : 'B',
  'Test Name': 'Homepage CTA Test',
});
```

## Production Deployment

1. Add `VITE_SLACK_WEBHOOK_URL` to production environment
2. Consider using a different webhook for production
3. Update privacy policy to mention analytics
4. Monitor your Slack channel for notifications

---

**That's it!** Your website now tracks user interactions in real-time with detailed context. 🎉
