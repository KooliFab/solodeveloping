const fs = require("fs");
const path = require("path");

const apps = [
  // { name: "ZeLoop", domain: "zeloop.net" }, // using custom provided icon
  { name: "LOVT", domain: "lovt.ca" },
  { name: "Cogni", domain: "cognibook.com" },
  // { name: "Hiiba", domain: "hiiba.ae" }, // using custom provided icon
  // { name: "BarcodeVibe", domain: "barcodevibe.com" }, // generic fallback/custom icon
  { name: "Myride901", domain: "myride901.com" },
  { name: "OpenFleet", domain: "openfleet.com" },
  // { name: "Koolicar", domain: "koolicar.com" }, // using custom provided icon
  { name: "Stepchain", domain: "stepchain.io" },
  { name: "RecharjMe", domain: "recharjme.com" },
  // { name: "Spotter", domain: "zeloop.net" }, // using custom provided icon
  { name: "Onboarding_x5", domain: "pif-onboarding.web.app" },
  { name: "Reward_Engine", domain: "zeloop.net" },
  { name: "pwa_installer", domain: "pub.dev" },
];

const destDir = "/Users/fabapps/Documents/Dev/me/website/public/icons/apps";

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function downloadAll() {
  for (const app of apps) {
    const clearbitUrl = `https://logo.clearbit.com/${app.domain}`;
    const fallbackUrl = `https://www.google.com/s2/favicons?domain=${app.domain}&sz=128`;

    let urlToUse = null;
    let res = null;

    try {
      res = await fetch(clearbitUrl, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        urlToUse = clearbitUrl;
      }
    } catch (e) {
      // ignore
    }

    if (!urlToUse) {
      try {
        res = await fetch(fallbackUrl, { signal: AbortSignal.timeout(3000) });
        if (res.ok) {
          urlToUse = fallbackUrl;
        }
      } catch (e) {
        // ignore
      }
    }

    if (urlToUse && res && res.ok) {
      const buffer = await res.arrayBuffer();
      const dest = path.join(
        destDir,
        app.name.replace(/\s+/g, "_").toLowerCase() + ".png",
      );
      fs.writeFileSync(dest, Buffer.from(buffer));
      console.log(`Downloaded ${app.name} from ${urlToUse}`);
    } else {
      console.log(`Failed to fetch for ${app.name}`);
    }
  }
}

downloadAll();
