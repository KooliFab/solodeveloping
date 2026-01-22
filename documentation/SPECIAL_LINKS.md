# Special Entry Links & QR Code URLs

This document lists all special entry point URLs for the website that can be used for QR codes, marketing campaigns, and tracking purposes.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Main homepage |
| `/book` | Book landing page (email capture for book buyers) |
| `/terms-and-conditions` | Terms and conditions page |
| `/privacy-policy` | Privacy policy page |

## Language Redirects

| URL | Redirects To |
|-----|--------------|
| `/fr` | `/?lang=fr` (French) |
| `/es` | `/?lang=es` (Spanish) |

---

## QR Code Entry Points

### Homepage with QR Tracking

Use the `qr` parameter to track QR code scans. The page will auto-scroll to the "free-story" section.

```
https://cognibook.com/?qr={source}
```

**Examples:**
- `https://cognibook.com/?qr=flyer-montreal` — Flyer distributed in Montreal
- `https://cognibook.com/?qr=flyer-toronto` — Flyer distributed in Toronto
- `https://cognibook.com/?qr=friend-referral` — Friend referral card
- `https://cognibook.com/?qr=bookstore-display` — Bookstore display stand

### Book Landing Page (`/book`)

Dedicated landing page for book buyers to register their email and get app access.

```
https://cognibook.com/book?qr={source}&utm_source={source}&utm_medium={medium}&utm_campaign={campaign}
```

**Examples:**
- `https://cognibook.com/book?qr=inside-book` — QR code printed inside the book
- `https://cognibook.com/book?utm_source=amazon&utm_medium=insert&utm_campaign=launch2024`

---

## UTM Parameters

All pages support standard UTM tracking parameters:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `utm_source` | Traffic source | `amazon`, `facebook`, `flyer` |
| `utm_medium` | Marketing medium | `qr`, `social`, `email`, `print` |
| `utm_campaign` | Campaign name | `launch2024`, `holiday-promo` |

---

## Recommended QR Code URLs

### For Physical Book (Inside)
```
https://cognibook.com/book?qr=inside-book
```

### For Flyers/Posters
```
https://cognibook.com/?qr=flyer-{location}
```

**Active QR Codes:**
| Code | URL | Location/Purpose |
|------|-----|------------------|
| `flyer-cpe1` | `https://cognibook.com/?qr=flyer-cpe1` | First flyer location |

### For Business Cards / Friend Referrals
```
https://cognibook.com/?qr=friend-{name}
```

---

## Tracking

All QR scans are tracked via:
1. **Slack notifications** — Real-time alerts when QR codes are scanned
2. **Google Analytics** — Event tracking with `qr_code_scan` event

The tracking captures:
- QR source identifier
- Campaign type
- Referral type (location vs friend referral)
- UTM parameters (if provided)
