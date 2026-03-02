# Webflow Starter Template

A modern starter template for Webflow projects with page-based routing, build system, and development server.

## Features

✨ **Page-based routing** - Automatically loads page-specific code based on `data-page` attribute
🎯 **Lenis smooth scroll** - Premium buttery-smooth scrolling library included
🎵 **Accordion component** - Flexible accordion with image sync built-in
🎠 **Swiper carousel** - Touch-enabled slider with sync and custom progress
🎬 **GSAP animations** - Professional animations with ScrollTrigger for scroll effects
🌐 **jsDelivr CDN integration** - Centralized CDN library management with automatic dependency loading
🔥 **Live reload** - Automatically refreshes the browser when you save changes
📦 **Build & minify** - Production-ready minified output with esbuild
⚡ **Performance optimized** - 60fps animations, minimal bundle size
🎨 **Code quality** - ESLint and Prettier pre-configured
🚀 **Fast development** - Local development server with instant updates
📝 **Plain JavaScript** - No TypeScript, just modern ES6+ JavaScript

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
# or
pnpm install
```

### Development Mode

Start the development server with live reload:

```bash
npm run dev
# or
pnpm dev
```

This will:

- Build your code in development mode (with source maps)
- Start a local server at `http://localhost:3000`
- Watch for file changes and rebuild automatically
- Enable live reload in the browser

### Production Build

Build minified code for production:

```bash
npm run build
# or
pnpm build
```

The output will be in the `dist/` folder.

## How to Use in Webflow

### 1. During Development

Add this script tag to your Webflow project settings (before `</body>` tag):

```html
<script src="http://localhost:3000/index.js"></script>
```

### 2. In Production

#### Option A: Deploy to Vercel (Recommended)

1. **Deploy to Vercel**:

   ```bash
   # Install Vercel CLI (if not installed)
   npm i -g vercel

   # Deploy
   vercel --prod
   ```

2. **Get your Vercel URL**:

   ```bash
   npm run vercel:url
   # Or specify project name:
   npm run vercel:url -- --project your-project-name
   ```

3. **Add to Webflow**:
   ```html
   <script src="https://your-project-name.vercel.app/index.js"></script>
   ```

📖 **See VERCEL_DEPLOYMENT.md for complete Vercel deployment guide!**

#### Option B: Other Hosting

1. Run `npm run build` to create the production build
2. Upload `dist/index.js` to your hosting (GitHub Pages, Netlify, etc.)
3. Add the script tag to your Webflow project settings:

```html
<script src="https://your-domain.com/index.js"></script>
```

### 3. Set Page Attributes

Add a `data-page` attribute to the `<body>` tag in Webflow's page settings:

**Home page:**

```html
<body data-page="home"></body>
```

**About page:**

```html
<body data-page="about"></body>
```

**Contact page:**

```html
<body data-page="contact"></body>
```

The script will automatically detect the page and run the corresponding code!

### 4. Optional: Barba.js (SPA-like transitions)

To enable smooth page transitions without full reloads:

1. **Enable in config:** In `src/config.js`, set `enableBarba: true`.

2. **Add Barba markup in Webflow** (when Barba is enabled):
   - **Wrapper:** Add `data-barba="wrapper"` to an element that wraps the whole page (e.g. a div wrapping header + main + footer).
   - **Container:** Add `data-barba="container"` and `data-page="home"` (or the page name) to the element whose content should be replaced on navigation (e.g. the main content block).

   Example structure:

   ```html
   <body>
     <div data-barba="wrapper">
       <header data-navbar>...</header>
       <main data-barba="container" data-page="home">
         <!-- This block is replaced on navigation -->
       </main>
       <footer>...</footer>
     </div>
   </body>
   ```

   Each Webflow page should use the same wrapper/container structure and set `data-page` on the container to the correct page name (e.g. `home`, `about`, `contact`).

3. Same-origin links will then use Barba; hash links (e.g. `#section`) still use Lenis smooth scroll. If the wrapper/container are missing, the app falls back to static mode automatically.

## Project Structure

```
.
├── bin/
│   └── build.js          # Build configuration
├── src/
│   ├── index.js          # Main entry point (page router)
│   ├── config.js         # App config (e.g. enableBarba)
│   ├── barba.js          # Barba.js integration (optional)
│   ├── global/           # Global code (runs on every page)
│   │   ├── index.js      # Global initializer
│   │   ├── lenis.js      # Lenis smooth scroll
│   │   ├── navbar.js     # Navbar component
│   │   └── footer.js     # Footer component
│   ├── components/       # Reusable components (import as needed)
│   │   ├── accordion.js  # Accordion component
│   │   ├── swiper.js     # Swiper carousel component
│   │   └── gsap.js       # GSAP animations + ScrollTrigger
│   ├── pages/            # Page-specific code
│   │   ├── home.js       # Home page logic
│   │   ├── about.js      # About page logic
│   │   └── contact.js    # Contact page logic
│   └── utils/            # Utility functions
│       └── helpers.js    # Helper functions
├── dist/                 # Build output (generated)
└── package.json
```

## Adding Global Code (Runs on Every Page)

For code that should run on **every page** (like navbar, footer, analytics, etc.), add it to the `src/global/` folder:

1. Edit `src/global/navbar.js` or `src/global/footer.js` with your code
2. Or create a new global component file, e.g., `src/global/analytics.js`:

```javascript
export function initAnalytics() {
  console.log('Analytics initialized');
  // Your analytics code here
}
```

3. Import and call it in `src/global/index.js`:

```javascript
import { initNavbar } from './navbar';
import { initFooter } from './footer';
import { initAnalytics } from './analytics';

export function initGlobal() {
  console.log('🌐 Initializing global components...');

  initNavbar();
  initFooter();
  initAnalytics(); // Add this line
}
```

**That's it!** The global code will now run on every page automatically, before any page-specific code.

## Adding a New Page

For code that should run on **one specific page**, add it to the `src/pages/` folder:

1. Create a new file in `src/pages/`, e.g., `src/pages/services.js`:

```javascript
export function initServicesPage() {
  console.log('Services page initialized');

  // Your page-specific code here
}
```

2. Import and register it in `src/index.js`:

```javascript
import { initServicesPage } from './pages/services';

const pageRegistry = {
  home: initHomePage,
  about: initAboutPage,
  contact: initContactPage,
  services: initServicesPage, // Add this line
};
```

3. Add `data-page="services"` to your Webflow page's `<body>` tag

## Utility Functions

The template includes helpful utility functions in `src/utils/helpers.js`:

- `debounce()` - Limit function execution rate
- `throttle()` - Control function call frequency
- `isInViewport()` - Check if element is visible
- `animateNumber()` - Animate numbers (counters)
- `smoothScrollTo(trigger, target, offset)` - Bind Lenis-powered scroll to triggers
- `getQueryParams()` - Get URL query parameters
- `waitForElement()` - Wait for element to appear in DOM

### Example Usage

```javascript
import { debounce, smoothScrollTo } from '../utils/helpers';

export function initHomePage() {
  // Debounced scroll handler
  const handleScroll = debounce(() => {
    console.log('Scrolled!');
  }, 300);

  window.addEventListener('scroll', handleScroll);

  // Smooth scroll to section (Lenis aware, native fallback)
  smoothScrollTo('[data-scroll-to]', '#about', 100);
}
```

## jsDelivr CDN Integration

The project includes a centralized jsDelivr CDN utility for loading external libraries. All CDN libraries are managed through `src/utils/jsdelivr.js`.

### Quick Start

```javascript
import { loadLibrary } from '../utils/jsdelivr';

// Load a library
await loadLibrary('swiper');

// Load multiple libraries
import { loadLibraries } from '../utils/jsdelivr';
await loadLibraries(['gsap', 'swiper']);
```

### Pre-configured Libraries

- **GSAP** (v3.12.5) - Animation library
- **ScrollTrigger** (v3.12.5) - GSAP scroll plugin
- **Swiper** (v11) - Carousel/slider component

### Adding New Libraries

Edit `src/utils/jsdelivr.js`:

```javascript
export const jsDelivrLibraries = {
  // ... existing libraries
  lodash: {
    version: '4.17.21',
    js: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
    css: null,
  },
};
```

📖 **See JSDELIVR_GUIDE.md for complete documentation!**

## Scripts

- `npm run dev` - Start development server with live reload
- `npm run build` - Build for production (minified)
- `npm run lint` - Check code for errors
- `npm run lint:fix` - Auto-fix linting errors
- `npm run format` - Format code with Prettier
- `npm run vercel:url` - Get your Vercel file URL

## Code Quality

The project includes ESLint and Prettier for code quality and formatting:

- **ESLint**: Catches errors and enforces best practices
- **Prettier**: Automatically formats your code

Run `npm run lint` before committing to catch any issues.

## Code Execution Order

Understanding the execution order helps you structure your code better:

```
1. Global Code (src/global/) → Runs on EVERY page
   ├── Lenis Smooth Scroll
   ├── Navbar
   ├── Footer
   └── Other always-needed components

2. Reusable Components (src/components/) → Import where needed
   └── Accordion, Tabs, Modals, etc.

3. Page-Specific Code (src/pages/) → Runs only on specific pages
   └── Based on data-page attribute
```

**Example:**

- On the home page with `data-page="home"`:
  1. Global components run (navbar, footer, etc.)
  2. Then `initHomePage()` runs

- On the about page with `data-page="about"`:
  1. Global components run (navbar, footer, etc.)
  2. Then `initAboutPage()` runs

## Lenis Smooth Scroll

Lenis is **automatically enabled** on all pages for buttery-smooth scrolling! Here's how to use it:

### Automatic Smooth Scrolling

All pages now have premium smooth scrolling enabled by default. No setup required!

### Anchor Links

All anchor links automatically use Lenis smooth scroll:

```html
<!-- In Webflow, just add an ID to your section -->
<section id="about">...</section>

<!-- Then link to it anywhere -->
<a href="#about">Go to About</a>
```

### Scroll Buttons

Add `data-scroll-to` attribute to any button:

```html
<!-- Scroll to a specific section -->
<button data-scroll-to="#contact">Contact Us</button>

<!-- Special values -->
<button data-scroll-to="top">Back to Top</button>
<button data-scroll-to="bottom">Scroll to Bottom</button>
```

### Programmatic Scrolling

Use Lenis functions in your page-specific code:

```javascript
// Import Lenis helper functions
import { scrollTo, scrollToTop, scrollToBottom } from '../global/lenis';

export function initHomePage() {
  const button = document.querySelector('[data-my-button]');

  button.addEventListener('click', () => {
    // Scroll to an element
    scrollTo('#my-section');

    // With custom options
    scrollTo('#my-section', {
      offset: -100, // Custom offset
      duration: 2, // Custom duration in seconds
    });

    // Scroll to top
    scrollToTop();

    // Scroll to bottom
    scrollToBottom();
  });
}
```

### Stop/Start Lenis

Useful for modals or when you need to disable scrolling:

```javascript
import { stopLenis, startLenis } from '../global/lenis';

// Stop scrolling (e.g., when opening a modal)
stopLenis();

// Start scrolling again (e.g., when closing a modal)
startLenis();
```

## Accordion Component

A flexible, CSS-based accordion component with optional image sync. **Import it only on pages where you need accordions.**

### Basic Accordion

**Step 1:** Import in your page file:

```javascript
// src/pages/faq.js
import { initAccordion } from '../components/accordion';

export function initFaqPage() {
  initAccordion(); // Initialize accordion on this page
}
```

**Step 2:** Add data attributes in Webflow:

1. **Container**: `data-accordion-list="css"`
2. **Each item**: `data-accordion`
3. **Toggle/Header**: `data-accordion-toggle`
4. **Content panel**: `data-accordion-content`

**Example structure:**

```
div [data-accordion-list="css"]
├── div [data-accordion]
│   ├── div [data-accordion-toggle] → Clickable header
│   └── div [data-accordion-content] → Expandable content
├── div [data-accordion]
│   ├── div [data-accordion-toggle]
│   └── div [data-accordion-content]
```

### Configuration Options

Add these to the container (`data-accordion-list="css"`):

```html
<!-- Only one panel open at a time -->
<div data-accordion-list="css" data-accordion-close-siblings="true">
  <!-- First panel starts open -->
  <div data-accordion-list="css" data-accordion-first-active="true">
    <!-- Keep at least one panel open -->
    <div data-accordion-list="css" data-accordion-collapsible="false">
      <!-- Use hover instead of click -->
      <div data-accordion-list="css" data-accordion-event="hover"></div>
    </div>
  </div>
</div>
```

### Accordion with Image Sync

Perfect for feature showcases! Images sync with accordion states automatically.

```html
<div data-accordion-imgs>
  <!-- Your accordion -->
  <div data-accordion-list="css">...</div>

  <!-- Your images (in same order as accordion items) -->
  <img data-accordion-img src="feature-1.jpg" />
  <img data-accordion-img src="feature-2.jpg" />
  <img data-accordion-img src="feature-3.jpg" />
</div>
```

**Required CSS:**

```css
/* Hide inactive content */
[data-accordion='not-active'] [data-accordion-content] {
  display: none;
  max-height: 0;
}

/* Show active content */
[data-accordion='active'] [data-accordion-content] {
  display: block;
  max-height: 1000px;
}

/* Hide inactive images */
[data-accordion-img='not-active'] {
  display: none;
}

/* Show active image */
[data-accordion-img='active'] {
  display: block;
}
```

📖 **See ACCORDION_GUIDE.md for complete documentation and examples!**

## Swiper Carousel Component

A powerful, touch-enabled carousel/slider component. **Import it only on pages where you need carousels.**

### Basic Swiper

**Step 1:** Import in your page file:

```javascript
// src/pages/home.js
import { initSwiper } from '../components/swiper';

export function initHomePage() {
  initSwiper(); // Initialize Swiper on this page
}
```

**Step 2:** Add structure in Webflow:

```
div [swiper-slider]
└── div.swiper
    └── div.swiper-wrapper
        ├── div.swiper-slide → Slide 1
        ├── div.swiper-slide → Slide 2
        └── div.swiper-slide → Slide 3
```

**Step 3:** Add navigation buttons (optional):

- Add `[swiper-next-btn]` to next button
- Add `[swiper-prev-btn]` to previous button

### Configuration Options

```html
<!-- Custom spacing -->
<div swiper-slider data-space="32" data-space-mobile="16">
  <!-- Centered slides -->
  <div swiper-slider data-center data-click-center>
    <!-- Sync multiple sliders -->
    <div swiper-slider data-sync="gallery-1"></div>
  </div>
</div>
```

### Features

- ✅ **Auto-loads** - Swiper library loads from CDN only when needed
- ✅ **Touch-enabled** - Swipe on mobile/tablet
- ✅ **Keyboard navigation** - Arrow keys
- ✅ **Synced sliders** - Link multiple carousels
- ✅ **Custom progress bar** - Beautiful progress tracking
- ✅ **Responsive** - Different spacing on mobile/desktop
- ✅ **Zero bundle impact** - Loads from CDN (not in your bundle)

📖 **See SWIPER_GUIDE.md for complete documentation and examples!**

## GSAP Animations

Professional animations with GSAP and ScrollTrigger. **Import it only on pages where you need animations.**

### Basic Animation

**Step 1:** Import in your page file:

```javascript
// src/pages/home.js
import { initGSAP } from '../components/gsap';

export function initHomePage() {
  initGSAP(); // Initialize GSAP on this page
}
```

**Step 2:** Add data attributes in Webflow:

```html
<!-- Fade in from bottom on scroll -->
<div data-scroll-trigger data-gsap-from='{"opacity": 0, "y": 50}' data-trigger-start="top 80%">
  Your content here
</div>
```

### Common Animations

```html
<!-- Fade in on page load -->
<div data-gsap data-gsap-from='{"opacity": 0}' data-gsap-duration="1">
  <!-- Slide from left on scroll -->
  <div data-scroll-trigger data-gsap-from='{"opacity": 0, "x": -100}'>
    <!-- Stagger animation for children -->
    <div data-scroll-trigger data-gsap-from='{"opacity": 0, "y": 30}' data-gsap-stagger="0.1">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>

    <!-- Scrub animation (linked to scroll) -->
    <div data-scroll-trigger data-trigger-scrub="true" data-gsap-from='{"scale": 0.8}'></div>
  </div>
</div>
```

### Advanced: Programmatic Animations

```javascript
import { initGSAP, getGSAP, createTimeline } from '../components/gsap';

export async function initHomePage() {
  await initGSAP();
  const gsap = getGSAP();

  // Custom timeline
  const tl = await createTimeline();
  tl.from('.hero-title', { opacity: 0, y: 100 })
    .from('.hero-subtitle', { opacity: 0, y: 50 }, '-=0.5')
    .from('.hero-button', { opacity: 0, scale: 0.8 }, '-=0.3');

  // Parallax effect
  gsap.to('[data-parallax]', {
    y: 200,
    scrollTrigger: {
      trigger: '[data-section]',
      scrub: true,
    },
  });
}
```

### Features

- ✅ **Auto-loads from CDN** - GSAP library only loads when needed
- ✅ **ScrollTrigger included** - Scroll-based animations
- ✅ **Data attribute config** - No code for basic animations
- ✅ **Programmatic API** - Full control for complex animations
- ✅ **Performance optimized** - 60fps smooth animations
- ✅ **Zero bundle impact** - Loads from CDN (~40kb gzipped)

📖 **See GSAP_GUIDE.md for complete documentation and examples!**

## Examples

### Global Navbar Code (Runs Everywhere)

```javascript
// src/global/navbar.js
export function initNavbar() {
  // Mobile menu toggle
  const menuButton = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('is-open');
    });
  }

  // Highlight active page
  const currentPage = document.body.getAttribute('data-page');
  const navLinks = document.querySelectorAll('[data-nav-link]');

  navLinks.forEach((link) => {
    if (link.getAttribute('data-nav-link') === currentPage) {
      link.classList.add('is-active');
    }
  });
}
```

### Home Page - Scroll Animation

```javascript
export function initHomePage() {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight;

      if (isVisible) {
        element.classList.add('is-visible');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
}
```

### About Page - Counter Animation

```javascript
export function initAboutPage() {
  const statsElements = document.querySelectorAll('[data-stat]');
  statsElements.forEach((stat) => {
    const target = parseInt(stat.getAttribute('data-stat'), 10);
    animateCounter(stat, target, 2000);
  });
}
```

### Contact Page - Form Validation

```javascript
export function initContactPage() {
  const form = document.querySelector('[data-contact-form]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    // Handle form submission
  });
}
```

## Tips & Best Practices

1. **Use data attributes** - Use `data-*` attributes in Webflow to target elements instead of classes
2. **Keep it modular** - Each page should only contain code specific to that page
3. **Use utilities** - Leverage the helper functions for common tasks
4. **Lenis is automatic** - All anchor links use Lenis (loads on first interaction)
5. **GSAP is automatic** - Scroll animations work with data attributes (loads on first interaction)
6. **Performance optimized** - Heavy libraries load only when user interacts
7. **Test in dev mode** - Always test with `npm run dev` before building for production
8. **Minify for production** - Always use `npm run build` for production code

## Troubleshooting

**Script not loading in Webflow:**

- Make sure the development server is running (`npm run dev`)
- Check that the script URL is correct in Webflow settings
- Check browser console for errors

**Page code not running:**

- Verify the `data-page` attribute is set correctly
- Check browser console for the initialization message
- Make sure the page is registered in `src/index.js`

**Live reload not working:**

- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Restart the development server

## License

MIT

## Credits

Inspired by the [Finsweet Developer Starter](https://github.com/finsweet/developer-starter) template.
