# Page Speed & Lighthouse

This doc summarizes why page speed can be "not good" (e.g. Lighthouse Performance 80, LCP 3.1s) and what this repo does—and what you control in Webflow—to improve it.

## Why page speed is not good (typical Lighthouse report)

1. **Largest Contentful Paint (LCP) ~3.1s (Poor)**  
   The main visible content (hero image, big text, or video) appears too late. This drives the Performance score down.

2. **Render-blocking requests (~690ms)**  
   Scripts or styles load in a way that blocks the browser from painting. The main custom script is often loaded without `defer`, so it blocks parsing until download and run.

3. **Inefficient image delivery (~1.8MB+)**  
   Images are large, wrong format, or not lazy-loaded. This is almost always **Webflow / hosting / content**, not this codebase.

4. **Forced reflow**  
   JavaScript reads layout (e.g. `offsetWidth`, `getBoundingClientRect`) and then immediately changes styles, forcing the browser to recalculate layout in the middle of the frame. We’ve reduced this in the codebase (see below).

## What this codebase does for performance

- **Script loading:** The README tells you to add the script with **`defer`** so it doesn’t block rendering. Use:
  ```html
  <script src="https://your-project.vercel.app/index.js" defer></script>
  ```
- **No forced reflow in key paths:**  
  Progress bars and tab progress (global locations tabs, footer, `tabsComp1`) no longer use `void el.offsetWidth`; we use `requestAnimationFrame` to batch style updates. Lenis uses a cached navbar for scroll offset.
- **Lazy loading:** GSAP, Lenis, Swiper, Carousel, etc. load on interaction or when elements enter the viewport (Intersection Observer).
- **Cleanup:** Intervals and listeners for locations tabs and footer are cleared on re-init (e.g. Barba) to avoid leaks and duplicate work.

## What you should do in Webflow / hosting

1. **Use `defer` on the custom script**  
   In Webflow Project Settings → Custom Code, add the script with `defer` as in the README. This directly reduces render-blocking and helps LCP.

2. **Improve image delivery (biggest win)**  
   - Prefer **WebP/AVIF** where possible (Webflow can serve these).  
   - Use **responsive images** (e.g. `srcset` / “Max Width” in Webflow).  
   - Enable **lazy loading** for below-the-fold images.  
   - Compress assets; 1.8MB+ of images is often the main cost.

3. **Fonts**  
   Use `font-display: optional` or `swap` in Webflow so text isn’t held up by font loading (saves ~10ms+ and improves LCP).

4. **Caching**  
   Ensure your host (e.g. Vercel) sets good cache headers for JS/CSS and images so repeat visits are fast.

## Quick checklist

- [ ] Custom script has `defer`: `<script src="..." defer></script>`
- [ ] Images: WebP/AVIF, responsive, lazy below fold, compressed
- [ ] Fonts: `font-display` set in Webflow
- [ ] Run Lighthouse again after changes; focus on LCP and “Render-blocking” / “Improve image delivery”
