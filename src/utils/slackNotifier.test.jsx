/**
 * Test component for Slack notifications
 * Use this to test your Slack integration before deploying
 */

import React from 'react';
import { trackButtonClick, sendSlackNotification } from './slackNotifier';
import { Button } from '@/components/ui/Button';

const SlackNotifierTest = () => {
  const testBasicNotification = () => {
    trackButtonClick('Test Button - Basic');
    alert('Basic notification sent! Check your Slack channel.');
  };

  const testWithCustomData = () => {
    trackButtonClick('Test Button - With Data', {
      'Test Field 1': 'Value 1',
      'Test Field 2': 'Value 2',
      'Environment': import.meta.env.MODE,
    });
    alert('Notification with custom data sent! Check your Slack channel.');
  };

  const testAsyncNotification = async () => {
    const result = await sendSlackNotification('Test Button - Async', {
      'Async Test': 'true',
      'Timestamp': new Date().toISOString(),
    });
    
    if (result.success) {
      alert('✅ Async notification sent successfully!');
    } else {
      alert(`❌ Failed to send notification: ${result.error}`);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Slack Notifier Test</h1>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800">
          <strong>⚠️ Testing Mode:</strong> Make sure you have set VITE_SLACK_WEBHOOK_URL in your .env file
          and restarted your dev server before testing.
        </p>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Test 1: Basic Notification</h3>
          <p className="text-sm text-gray-600 mb-3">
            Sends a simple notification with device info, location, and page data.
          </p>
          <Button onClick={testBasicNotification}>
            Send Basic Notification
          </Button>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Test 2: Notification with Custom Data</h3>
          <p className="text-sm text-gray-600 mb-3">
            Sends a notification with additional custom fields.
          </p>
          <Button onClick={testWithCustomData} variant="outline">
            Send Notification with Data
          </Button>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Test 3: Async Notification</h3>
          <p className="text-sm text-gray-600 mb-3">
            Sends a notification and waits for the result (shows success/error).
          </p>
          <Button onClick={testAsyncNotification} variant="secondary">
            Send Async Notification
          </Button>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Expected Result:</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>A message should appear in your configured Slack channel</li>
          <li>The message should include device type, OS, browser info</li>
          <li>Location data (timezone, language) should be present</li>
          <li>Current page URL and referrer should be shown</li>
          <li>Custom data fields should appear in the message</li>
        </ul>
      </div>

      <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Troubleshooting:</h3>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Check browser console for errors</li>
          <li>Verify VITE_SLACK_WEBHOOK_URL is set in .env</li>
          <li>Make sure you restarted the dev server after adding the env variable</li>
          <li>Test your webhook URL directly with curl (see documentation)</li>
        </ul>
      </div>
    </div>
  );
};

export default SlackNotifierTest;
