/**
 * Slack notification utility for tracking user interactions
 * Uses application/x-www-form-urlencoded format to bypass CORS
 */

/**
 * Get user's approximate location based on timezone and language
 */
const getUserLocation = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language || navigator.userLanguage;

  return {
    timezone,
    language,
    locale: navigator.languages ? navigator.languages.join(', ') : language,
  };
};

/**
 * Get device information with detailed detection
 */
const getDeviceInfo = () => {
  const ua = navigator.userAgent;

  // Detect specific device model
  let deviceModel = '';
  
  // iPhone detection
  if (/iPhone/i.test(ua)) {
    deviceModel = 'iPhone';
    // More accurate iPhone model detection based on screen dimensions and pixel ratio
    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;
    const pixelRatio = window.devicePixelRatio || 1;
    
    // Calculate actual pixel dimensions
    const actualHeight = screenHeight * pixelRatio;
    const actualWidth = screenWidth * pixelRatio;
    
    // iPhone model detection based on actual screen dimensions
    if (actualHeight === 2796 && actualWidth === 1290) {
      deviceModel = 'iPhone 15 Pro Max';
    } else if (actualHeight === 2556 && actualWidth === 1179) {
      deviceModel = 'iPhone 15 Pro';
    } else if (actualHeight === 2796 && actualWidth === 1290) {
      deviceModel = 'iPhone 15 Plus';
    } else if (actualHeight === 2556 && actualWidth === 1179) {
      deviceModel = 'iPhone 15';
    } else if (actualHeight === 2778 && actualWidth === 1284) {
      deviceModel = 'iPhone 14 Pro Max';
    } else if (actualHeight === 2556 && actualWidth === 1179) {
      deviceModel = 'iPhone 14 Pro';
    } else if (actualHeight === 2778 && actualWidth === 1284) {
      deviceModel = 'iPhone 14 Plus';
    } else if (actualHeight === 2532 && actualWidth === 1170) {
      deviceModel = 'iPhone 14';
    } else if (actualHeight === 2778 && actualWidth === 1284) {
      deviceModel = 'iPhone 13 Pro Max';
    } else if (actualHeight === 2532 && actualWidth === 1170) {
      deviceModel = 'iPhone 13 Pro';
    } else if (actualHeight === 2532 && actualWidth === 1170) {
      deviceModel = 'iPhone 13';
    } else if (actualHeight === 2778 && actualWidth === 1284) {
      deviceModel = 'iPhone 13 mini';
    } else if (actualHeight === 2688 && actualWidth === 1242) {
      deviceModel = 'iPhone 12 Pro Max';
    } else if (actualHeight === 2532 && actualWidth === 1170) {
      deviceModel = 'iPhone 12 Pro';
    } else if (actualHeight === 2532 && actualWidth === 1170) {
      deviceModel = 'iPhone 12';
    } else if (actualHeight === 2340 && actualWidth === 1080) {
      deviceModel = 'iPhone 12 mini';
    } else if (actualHeight === 2688 && actualWidth === 1242) {
      deviceModel = 'iPhone 11 Pro Max';
    } else if (actualHeight === 2436 && actualWidth === 1125) {
      deviceModel = 'iPhone 11 Pro';
    } else if (actualHeight === 1792 && actualWidth === 828) {
      deviceModel = 'iPhone 11';
    } else if (actualHeight === 2688 && actualWidth === 1242) {
      deviceModel = 'iPhone XS Max';
    } else if (actualHeight === 2436 && actualWidth === 1125) {
      deviceModel = 'iPhone XS';
    } else if (actualHeight === 1792 && actualWidth === 828) {
      deviceModel = 'iPhone XR';
    } else if (actualHeight === 2436 && actualWidth === 1125) {
      deviceModel = 'iPhone X';
    } else if (actualHeight === 1920 && actualWidth === 1080) {
      deviceModel = 'iPhone 8 Plus';
    } else if (actualHeight === 1334 && actualWidth === 750) {
      deviceModel = 'iPhone 8';
    } else if (actualHeight === 1920 && actualWidth === 1080) {
      deviceModel = 'iPhone 7 Plus';
    } else if (actualHeight === 1334 && actualWidth === 750) {
      deviceModel = 'iPhone 7';
    } else if (actualHeight === 1136 && actualWidth === 640) {
      deviceModel = 'iPhone SE';
    } else {
      // Fallback for unknown iPhone models
      if (screenHeight >= 926) deviceModel = 'iPhone (Large)';
      else if (screenHeight >= 844) deviceModel = 'iPhone (Standard)';
      else if (screenHeight >= 812) deviceModel = 'iPhone (Compact)';
      else deviceModel = 'iPhone (Classic)';
    }
  }
  // iPad detection
  else if (/iPad/i.test(ua)) {
    deviceModel = 'iPad';
    if (/iPad Pro/i.test(ua)) deviceModel = 'iPad Pro';
    else if (/iPad Air/i.test(ua)) deviceModel = 'iPad Air';
    else if (/iPad Mini/i.test(ua)) deviceModel = 'iPad Mini';
  }
  // Android phone/tablet detection
  else if (/Android/i.test(ua)) {
    // Try to extract device model from user agent
    const androidMatch = ua.match(/Android[^;]*;\s*([^)]+)\)/i);
    if (androidMatch && androidMatch[1]) {
      const model = androidMatch[1].split('Build')[0].trim();
      // Clean up common patterns
      if (/SM-/i.test(model)) deviceModel = 'Samsung ' + model;
      else if (/Pixel/i.test(model)) deviceModel = 'Google ' + model;
      else if (/HUAWEI|Honor/i.test(model)) deviceModel = model;
      else if (/Xiaomi|Redmi|POCO/i.test(model)) deviceModel = model;
      else if (/OnePlus/i.test(model)) deviceModel = model;
      else deviceModel = model || 'Android Device';
    } else {
      deviceModel = 'Android Device';
    }
  }
  // Mac detection
  else if (/Macintosh|Mac OS X/i.test(ua)) {
    deviceModel = 'Mac';
    if (/MacBook/i.test(ua)) deviceModel = 'MacBook';
  }
  // Windows detection
  else if (/Windows/i.test(ua)) {
    deviceModel = 'Windows PC';
  }
  // Linux detection
  else if (/Linux/i.test(ua) && !/Android/i.test(ua)) {
    deviceModel = 'Linux PC';
  }

  // Detect device type
  const isIPhone = /iPhone/i.test(ua);
  const isIPad = /iPad/i.test(ua);
  const isAndroidPhone = /Android/i.test(ua) && /Mobile/i.test(ua);
  const isAndroidTablet = /Android/i.test(ua) && !/Mobile/i.test(ua);
  const isMobile = isIPhone || isAndroidPhone;
  const isTablet = isIPad || isAndroidTablet;
  const isDesktop = !isMobile && !isTablet;

  // Detect OS with version
  let os = 'Unknown';
  let osVersion = '';
  
  if (/iPhone|iPad|iPod/i.test(ua)) {
    os = 'iOS';
    const iosMatch = ua.match(/OS (\d+[_\.]\d+)/i);
    if (iosMatch) osVersion = iosMatch[1].replace('_', '.');
  } else if (/Android/i.test(ua)) {
    os = 'Android';
    const androidMatch = ua.match(/Android (\d+\.?\d*)/i);
    if (androidMatch) osVersion = androidMatch[1];
  } else if (/Windows/i.test(ua)) {
    os = 'Windows';
    if (/Windows NT 10/i.test(ua)) osVersion = '10/11';
    else if (/Windows NT 6.3/i.test(ua)) osVersion = '8.1';
    else if (/Windows NT 6.2/i.test(ua)) osVersion = '8';
    else if (/Windows NT 6.1/i.test(ua)) osVersion = '7';
  } else if (/Mac OS X/i.test(ua)) {
    os = 'macOS';
    const macMatch = ua.match(/Mac OS X (\d+[_\.]\d+)/i);
    if (macMatch) osVersion = macMatch[1].replace('_', '.');
  } else if (/Linux/i.test(ua)) {
    os = 'Linux';
  }

  // Detect browser with version
  let browser = 'Unknown';
  let browserVersion = '';
  
  if (/CriOS/i.test(ua)) {
    browser = 'Chrome (iOS)';
    const match = ua.match(/CriOS\/(\d+)/i);
    if (match) browserVersion = match[1];
  } else if (/FxiOS/i.test(ua)) {
    browser = 'Firefox (iOS)';
  } else if (/Edg/i.test(ua)) {
    browser = 'Edge';
    const match = ua.match(/Edg\/(\d+)/i);
    if (match) browserVersion = match[1];
  } else if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) {
    browser = 'Chrome';
    const match = ua.match(/Chrome\/(\d+)/i);
    if (match) browserVersion = match[1];
  } else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
    browser = 'Safari';
    const match = ua.match(/Version\/(\d+)/i);
    if (match) browserVersion = match[1];
  } else if (/Firefox/i.test(ua)) {
    browser = 'Firefox';
    const match = ua.match(/Firefox\/(\d+)/i);
    if (match) browserVersion = match[1];
  } else if (/Opera|OPR/i.test(ua)) {
    browser = 'Opera';
  }

  // Build display strings
  const deviceType = isDesktop ? '🖥️ Desktop' : isTablet ? '📱 Tablet' : '📱 Mobile';
  const osDisplay = osVersion ? `${os} ${osVersion}` : os;
  const browserDisplay = browserVersion ? `${browser} ${browserVersion}` : browser;

  return {
    type: deviceType,
    model: deviceModel,
    os: osDisplay,
    browser: browserDisplay,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
  };
};

/**
 * Get current page information
 */
const getPageInfo = () => {
  return {
    url: window.location.href,
    path: window.location.pathname,
    referrer: document.referrer || 'Direct',
    title: document.title,
  };
};

/**
 * Get color based on action type
 * @param {object} additionalData - Additional data to check for action type
 * @returns {string} Hex color code
 */
const getColorForAction = (additionalData) => {
  const action = additionalData?.Action || '';
  
  if (action.includes('Amazon') || action.includes('Redirect to Amazon')) {
    return '#FF9900'; // Amazon orange for book purchases
  } else if (action.includes('App') || action.includes('Open App')) {
    return '#6366f1'; // Purple for app actions
  } else if (additionalData?.Status === 'Success') {
    return '#22c55e'; // Green for successful form submissions
  }
  
  return '#6366f1'; // Default purple
};

/**
 * Send notification to Slack
 * @param {string} buttonName - Name of the button clicked
 * @param {object} additionalData - Any additional data to include
 */
export const sendSlackNotification = async (buttonName, additionalData = {}) => {
  const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('Slack webhook URL not configured');
    return { success: false, error: 'Webhook URL not configured' };
  }

  try {
    const device = getDeviceInfo();
    const location = getUserLocation();
    const page = getPageInfo();
    const timestamp = Math.floor(Date.now() / 1000);

    // Build fields array with detailed device info
    const fields = [
      { title: 'Device', value: `${device.type} | ${device.model}`, short: true },
      { title: 'OS', value: device.os, short: true },
      { title: 'Browser', value: device.browser, short: true },
      { title: 'Screen', value: device.screenResolution, short: true },
      { title: 'Timezone', value: location.timezone, short: true },
      { title: 'Language', value: location.language, short: true },
      { title: 'Page', value: page.path, short: true },
      { title: 'Referrer', value: page.referrer, short: true },
      { title: 'URL', value: page.url, short: false },
    ];

    // Add additional data fields
    Object.entries(additionalData).forEach(([key, value]) => {
      fields.push({ title: key, value: String(value), short: true });
    });

    // Get color based on action type
    const color = getColorForAction(additionalData);

    const payload = {
      text: `🎯 Button Click: ${buttonName}`,
      attachments: [
        {
          color: color,
          fields: fields,
          footer: 'Solo Developing Portfolio',
          ts: timestamp,
        },
      ],
    };

    // Use application/x-www-form-urlencoded format (like your Flutter code)
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `payload=${encodeURIComponent(JSON.stringify(payload))}`,
    });

    if (response.ok) {
      console.log('Slack notification sent successfully');
      return { success: true };
    } else {
      console.error('Slack notification failed:', response.status);
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    console.error('Error sending Slack notification:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Track button click with Slack notification
 * This is a wrapper that can be used directly in onClick handlers
 */
export const trackButtonClick = (buttonName, additionalData = {}) => {
  // Send notification asynchronously without blocking the UI
  sendSlackNotification(buttonName, additionalData).catch(console.error);
};

/**
 * Track page visit with Slack notification
 * Useful for QR code scans and campaign tracking
 * @param {string} pageName - Name of the page visited
 * @param {object} additionalData - Any additional data to include (UTM params, QR source, etc.)
 */
export const trackPageVisit = async (pageName, additionalData = {}) => {
  const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('Slack webhook URL not configured');
    return { success: false, error: 'Webhook URL not configured' };
  }

  try {
    const device = getDeviceInfo();
    const location = getUserLocation();
    const page = getPageInfo();
    const timestamp = Math.floor(Date.now() / 1000);

    // Build fields array with detailed device info
    const fields = [
      { title: 'Device', value: `${device.type} | ${device.model}`, short: true },
      { title: 'OS', value: device.os, short: true },
      { title: 'Browser', value: device.browser, short: true },
      { title: 'Screen', value: device.screenResolution, short: true },
      { title: 'Timezone', value: location.timezone, short: true },
      { title: 'Language', value: location.language, short: true },
      { title: 'Referrer', value: page.referrer, short: true },
      { title: 'Full URL', value: page.url, short: false },
    ];

    // Add additional data fields
    Object.entries(additionalData).forEach(([key, value]) => {
      if (value) {
        fields.push({ title: key, value: String(value), short: true });
      }
    });

    const payload = {
      text: `📱 Page Visit: ${pageName}`,
      attachments: [
        {
          color: '#10b981', // Green color for page visits
          fields: fields,
          footer: 'Solo Developing Portfolio',
          ts: timestamp,
        },
      ],
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `payload=${encodeURIComponent(JSON.stringify(payload))}`,
    });

    if (response.ok) {
      console.log('Slack page visit notification sent successfully');
      return { success: true };
    } else {
      console.error('Slack page visit notification failed:', response.status);
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    console.error('Error sending Slack page visit notification:', error);
    return { success: false, error: error.message };
  }
};
