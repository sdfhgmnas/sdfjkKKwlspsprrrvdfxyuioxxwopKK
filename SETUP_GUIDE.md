# TASR BharatNext Fuel Manager — Professional Setup Guide

## What you'll get
- ✅ Custom branded URL (e.g. `https://tasrbharatnext.com`)
- ✅ Installable Android APK (signed, professional, fullscreen — no browser bar)
- ✅ Offline support + cloud sync
- ✅ Add-to-Home-Screen on any device

---

## STEP 1 — Upload PWA files to GitHub

Your existing repo `sed-app` already has `index.html`. You now need to add 6 more files:

| File | Purpose |
|------|---------|
| `manifest.json` | Tells browser/Android this is an installable app |
| `sw.js` | Service worker — enables offline cache |
| `icon-192.png` | App icon (small) |
| `icon-512.png` | App icon (large) |
| `icon-maskable-512.png` | Android adaptive icon |
| `favicon.png` | Browser tab icon |

**How to upload:**
1. Open repo `sed-app` on GitHub
2. Click **"Add file" → "Upload files"**
3. Drag-drop all 6 files
4. Replace `index.html` with the latest (v2.0)
5. Scroll down → **"Commit changes"**
6. Wait 1-2 minutes for GitHub Pages to redeploy

**Quick verify:** open `https://abhinavmishrasea-sketch.github.io/sed-app/?v=20` on phone Chrome. Chrome should show **"Install"** / **"Add to Home Screen"** prompt at the bottom (or in 3-dot menu).

---

## STEP 2 — Buy a Professional Domain (for the URL)

### Recommended name options
- `tasrbharatnext.com` — best brand match
- `tasrfuel.com` — short, memorable
- `bharatnextfuel.in` — India TLD, cheaper
- `tasrbharatnext.in` — local

### Where to buy (₹500-1500/year)
| Provider | Approx. price (.com) | Notes |
|----------|---------|-------|
| **Cloudflare Registrar** | ₹900/yr | Cheapest, no markup, free Cloudflare DNS bundled |
| **Namecheap** | ₹1000/yr | Easy UI, free WHOIS privacy |
| **GoDaddy** | ₹800/yr first year, then ₹1200+ | Popular in India, often discount codes |
| **Hostinger** | ₹700/yr | Good India support |

### For `.in` domain (cheaper, ~₹400/yr)
- Hostinger, GoDaddy, or Domain.com → check `.in` pricing

### Steps to purchase (example: Cloudflare)
1. Sign up at [cloudflare.com](https://cloudflare.com)
2. Dashboard → **Domain Registration** → search your name
3. Pay → domain is yours

---

## STEP 3 — Connect Custom Domain to GitHub Pages

Once you have the domain (let's say `tasrbharatnext.com`):

### 3.1 At your domain registrar (DNS records)
Add these **A records** for the apex domain (`tasrbharatnext.com`):
```
Type: A   Name: @   Value: 185.199.108.153
Type: A   Name: @   Value: 185.199.109.153
Type: A   Name: @   Value: 185.199.110.153
Type: A   Name: @   Value: 185.199.111.153
```

And one **CNAME** for `www` subdomain:
```
Type: CNAME   Name: www   Value: abhinavmishrasea-sketch.github.io
```

### 3.2 At GitHub
1. Open repo `sed-app` → **Settings** → **Pages**
2. In **Custom domain** box, enter: `tasrbharatnext.com`
3. Click **Save**
4. Wait 1-2 mins → GitHub verifies DNS
5. Once verified, **check the "Enforce HTTPS"** checkbox ✅

### 3.3 Wait for DNS propagation
- Usually 10 minutes to 1 hour
- Maximum 24 hours
- Test by opening `https://tasrbharatnext.com` in browser
- Should redirect to your app

**This is your professional desktop URL ✅**

---

## STEP 4 — Generate Professional APK via PWABuilder

This is the **best free way** — Google's preferred method. The APK will be a TWA (Trusted Web Activity) — looks and feels 100% native.

### 4.1 Visit PWABuilder
Open [https://www.pwabuilder.com](https://www.pwabuilder.com)

### 4.2 Enter your URL
Paste your URL:
- If domain ready: `https://tasrbharatnext.com`
- If not yet: `https://abhinavmishrasea-sketch.github.io/sed-app/`

Click **"Start"**.

### 4.3 PWABuilder analyzes the PWA
It checks:
- Manifest ✓
- Service worker ✓
- HTTPS ✓
- Icons ✓

All should be green ticks. If any red:
- Manifest issue → re-check `manifest.json` uploaded
- Icon issue → re-check all 3 icons uploaded
- HTTPS → enable in GitHub Pages settings

### 4.4 Package for Android
1. Click **"Package For Stores"** button (top right)
2. Select **"Android"**
3. Form appears with fields pre-filled. **Important inputs:**
   - **Package ID**: `com.tasrbharatnext.fuel` (or your domain reversed)
   - **App name**: `TASR Fuel Manager`
   - **Launcher name**: `TB Fuel`
   - **App version**: `1.0.0`
   - **Version code**: `1`
   - **Display mode**: Standalone
   - **Status bar color**: `#0891b2`
   - **Signing key**: Choose **"New"** (PWABuilder generates one for you — save the file securely!)
4. Click **"Download"**
5. You'll get a `.zip` containing:
   - `app-release-signed.apk` ← install this on Android
   - `app-release-bundle.aab` ← upload to Play Store if needed
   - `signing.keystore` + `.txt` with the key passwords ← **BACK THIS UP** (you need the same key to publish updates)

### 4.5 Install APK on Android
1. Transfer `app-release-signed.apk` to your phone (via WhatsApp / Drive / email)
2. Open the file → Android asks to allow install from unknown sources → allow
3. Tap **Install**
4. App icon appears on home screen with your "TB Fuel" branding ✅
5. Open → looks completely native (no browser chrome)

---

## STEP 5 — Publish to Google Play Store (Optional, Professional)

If you want **searchable Play Store presence** + auto-updates:

1. **Google Play Developer Account** — one-time **$25** fee
   - https://play.google.com/console
2. Use the `.aab` file PWABuilder generated
3. Fill app listing (screenshots, description, privacy policy)
4. Submit for review (usually approved in 3-7 days)
5. Updates: when you change HTML on GitHub, app updates automatically — no Play Store resubmission needed (PWA-based magic) ✨

---

## STEP 6 — Quick alternatives if you want

| Goal | Tool | Cost | Time |
|------|------|------|------|
| Just an APK fast | webintoapp.com | ~₹2500 | 5 min |
| Native-quality APK | **PWABuilder** ⭐ | Free | 10 min |
| Full control / CLI | Bubblewrap CLI | Free | 30 min |
| Capacitor/Cordova | Capacitor.js | Free | 1-2 hr |

**PWABuilder is the recommended path** — best balance of professional, free, fast.

---

## Verification Checklist

After everything's deployed:

- [ ] `https://tasrbharatnext.com` opens the app on desktop
- [ ] Phone Chrome shows "Install app" option
- [ ] Installed PWA opens fullscreen (no URL bar)
- [ ] Works offline (turn off wifi, open installed app — calculator + login still work)
- [ ] APK installed shows "TB Fuel" icon on home screen
- [ ] APK opens to calculator screen
- [ ] Login + sync works from APK same as web
- [ ] Settings → Sync section shows **"Connected to server"** in green

---

## Troubleshooting

**PWABuilder says "manifest not found"**
→ Make sure `manifest.json` is uploaded to repo root and accessible at `https://your-url/manifest.json`

**APK installs but shows white screen**
→ Service worker may be caching old version. In phone, go to Settings → Apps → TB Fuel → Storage → Clear data, then reopen

**Service worker not registering**
→ Open browser DevTools → Console. Look for `[TASR] SW registered`. If error, check `sw.js` is at repo root.

**Custom domain shows "Site not served by GitHub Pages"**
→ DNS propagation taking longer than expected. Wait up to 24 hours. Check with `nslookup tasrbharatnext.com` (should return 185.199.108.153)

---

## File checklist (your repo should have)

```
sed-app/
├── index.html         (v2.0 — main app)
├── manifest.json      (PWA manifest)
├── sw.js              (service worker)
├── icon-192.png
├── icon-512.png
├── icon-maskable-512.png
├── favicon.png
└── (optional: CNAME file with your domain name on one line)
```

For the **CNAME file** (auto-created by GitHub when you set custom domain in Settings): just contains the text `tasrbharatnext.com` and nothing else. GitHub creates this for you.

---

## What's already done in v2.0

- ✅ Manifest with correct theme colors (cyan brand)
- ✅ Service worker with smart caching:
  - HTML: network-first (so updates come through)
  - Static assets: cache-first (offline-resilient)
  - Supabase API: never cached (always fresh data)
- ✅ Apple iOS PWA tags (works on iPhone too)
- ✅ Theme color matches login screen
- ✅ Icons in 3 sizes including maskable for Android adaptive
- ✅ Standalone display mode (no browser chrome when installed)

---

Need help with any step — just ask. Most users complete domain + APK in under an hour.
