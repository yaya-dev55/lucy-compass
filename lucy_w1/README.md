# Lucy Compass — static site

A premium, editorial website for Lucy Compass. Plain HTML/CSS/JS —
no build step, no npm install. Open the folder in VS Code and click
**Go Live** (Live Server extension) to run it.

## Running it

1. Open this folder in VS Code.
2. If you don't have it yet, install the **Live Server** extension
   (by Ritwick Dey) from the Extensions panel.
3. Right-click `index.html` → **Open with Live Server**, or click
   **Go Live** in the bottom-right status bar.
4. That's it — no terminal commands, no `npm run dev`.

You can also just double-click `index.html` to open it directly in a
browser, though Live Server is recommended because it auto-refreshes
on save and avoids occasional `file://` restrictions on video autoplay.

## Structure

```
index.html               Home — video hero + all homepage sections
our-story.html
master-icy.html
services.html
journal.html
contact.html              has a working demo contact form
book-consultation.html    has a working demo booking form
404.html

css/style.css             all design tokens + styles (plain CSS, no framework)
js/main.js                nav, scroll reveals, hero video, five elements, forms
js/content-data.js        Five Elements data used by the homepage selector

assets/video/
  hero-compass.mp4          desktop hero video (1920px wide, muted, H.264)
  hero-compass-mobile.mp4   smaller version served on narrow screens
  hero-compass-poster.jpg   poster frame shown before the video loads
```

Each HTML page is a full, self-contained document (nav + footer are
duplicated at the top/bottom of each file) — there's no templating
step, so editing a page is just editing that page's HTML directly.

## The hero video

The hero section (`.hero` in `index.html`) plays your compass
animation on loop, muted, with a dark scrim over it for text
contrast. It:

- Uses two `<source>` sizes (`hero-compass.mp4` for ≥780px viewports,
  `hero-compass-mobile.mp4` below that) so phones don't download the
  full desktop file
- Shows `hero-compass-poster.jpg` instantly while the video buffers
- Has a subtle scroll-driven zoom/fade (see `initHeroVideo()` in
  `js/main.js`) — respects `prefers-reduced-motion`
- Has a "Sound On/Off" toggle bottom-right, since browsers require
  video to start muted to autoplay

To swap in a different cut of the video later, replace the three
files in `assets/video/` and keep the same filenames (or update the
`<source>` paths in `index.html`).

## Design tokens

All colors, fonts, and spacing live in `css/style.css` under `:root`:

- Ivory `#F8F5EF`, Charcoal `#111111`, Stone `#E4E0D8`
- Amber `#C96A32` and Bronze `#8C6A45` — accents only (buttons, glow,
  highlights), never a background fill
- Display face: Cormorant Garamond · Body face: Inter (loaded from
  Google Fonts in each page's `<head>`)

## Forms

`contact.html` and `book-consultation.html` have working forms that
show a confirmation message on submit (see `initForms()` in
`js/main.js`) — but they don't send anywhere yet. Each form has a
`// NOTE:` comment marking where to wire in a real backend, a form
service (Formspree, Basin, etc.), or a Shopify Storefront API call
for consultation checkout.

## Notes

- No React, no Three.js, no npm packages, no bundler — everything
  here runs directly in the browser.
- Google Fonts are loaded from `fonts.googleapis.com`; if you ever
  need this to work fully offline, download the font files and
  self-host them instead.
- Scroll-reveal animations use `IntersectionObserver` (built into
  every modern browser, no library needed).
