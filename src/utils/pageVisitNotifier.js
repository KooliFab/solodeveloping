const storageKey = (page) => `slack_notified_${page.toLowerCase().replace(/\s+/g, '_')}`;

const getOS = () => {
  const ua = navigator.userAgent;
  if (/iPhone/.test(ua)) return 'iOS (iPhone)';
  if (/iPad/.test(ua)) return 'iOS (iPad)';
  if (/Android/.test(ua)) return 'Android';
  if (/CrOS/.test(ua)) return 'Chrome OS';
  if (/Mac OS X/.test(ua)) return 'macOS';
  if (/Windows/.test(ua)) return 'Windows';
  if (/Linux/.test(ua)) return 'Linux';
  return 'Unknown';
};

const getDevice = () => {
  if (navigator.userAgentData?.mobile !== undefined) {
    return navigator.userAgentData.mobile ? 'Mobile' : 'Desktop';
  }
  return /iPhone|iPad|iPod|Android.*Mobile|webOS|BlackBerry/i.test(navigator.userAgent)
    ? 'Mobile'
    : /Android|iPad/.test(navigator.userAgent)
      ? 'Tablet'
      : 'Desktop';
};

export const notifyPageVisit = (pageName) => {
  const key = storageKey(pageName);

  if (sessionStorage.getItem(key)) return;

  const slackWebhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL;
  if (!slackWebhookUrl) return;

  sessionStorage.setItem(key, '1');

  const payload = {
    text: `📄 Page Visit: *${pageName}*`,
    attachments: [
      {
        color: '#7c3aed',
        fields: [
          { title: 'Page', value: pageName, short: true },
          { title: 'Time', value: new Date().toLocaleString(), short: true },
          { title: 'Referrer', value: document.referrer || 'Direct', short: true },
          { title: 'Device', value: getDevice(), short: true },
          { title: 'OS', value: getOS(), short: true },
          { title: 'User Agent', value: navigator.userAgent, short: false },
        ],
      },
    ],
  };

  fetch(slackWebhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `payload=${encodeURIComponent(JSON.stringify(payload))}`,
  }).catch(() => {});
};
