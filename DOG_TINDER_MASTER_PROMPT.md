# 🐾 DOG TINDER — Master Build Prompt

> **Purpose**: This is a **reusable master prompt** for AI coding agents. Feed this document to any LLM/agent to build the complete Dog Tinder landing page from scratch. It serves as a benchmark to test the latest released LLM capabilities — evaluating visual fidelity, animation quality, code architecture, and attention to detail.

> **Version**: 1.0
> **Last Updated**: 2026-05-20
> **Tech Stack**: React 19 + Tailwind CSS 4 + Vite + GSAP + ScrollTrigger

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Project Setup & Tooling](#2-project-setup--tooling)
3. [Architecture & Folder Structure](#3-architecture--folder-structure)
4. [Design System & Tokens](#4-design-system--tokens)
5. [Component Specifications](#5-component-specifications)
6. [Section-by-Section Build Specs](#6-section-by-section-build-specs)
7. [Animation & Motion Specs](#7-animation--motion-specs)
8. [Dual Theme System](#8-dual-theme-system)
9. [Performance Optimization Rules](#9-performance-optimization-rules)
10. [Responsiveness & Breakpoints](#10-responsiveness--breakpoints)
11. [Acceptance Criteria Checklist](#11-acceptance-criteria-checklist)

---

## 1. PROJECT OVERVIEW

### What You Are Building

**Dog Tinder** — a visually stunning, cinematic landing page for a fictional dog-matching/dating SaaS platform. This is a single-page application (SPA) with multiple scroll-driven sections, premium animations, and a membership pricing page.

### Brand Identity

| Attribute       | Value                                                                 |
|-----------------|-----------------------------------------------------------------------|
| **Tone**        | Playful & Fun — energetic, bouncy, joyful (Duolingo meets Tinder)    |
| **Visual Feel** | Bright gradients, rounded shapes, bouncy animations, Electric Pop palette |
| **Target Audience** | Dog owners looking for playdates, breeding partners, or social connections for their pets |
| **Brand Name**  | **PawMatch** (display name) / **Dog Tinder** (project name)          |

### Key Requirements

- React 19 with functional components and hooks
- Tailwind CSS 4 with CSS-first `@theme` configuration (NO tailwind.config.js)
- GSAP + ScrollTrigger for ALL scroll-driven and cinematic animations
- Dual theme (light/dark) with system preference detection + manual toggle
- Enterprise-grade Feature-Sliced Design (FSD) folder structure
- Fully responsive (mobile, tablet, desktop)
- Custom animated loading/splash screen
- AI-generated dog images (use placeholder URLs if image generation is unavailable)
- NO Three.js / R3F — pure GSAP + CSS animations only

---

## 2. PROJECT SETUP & TOOLING

### Initialize Project

```bash
# Create Vite + React project
npx -y create-vite@latest ./ --template react

# Install dependencies
npm install gsap @gsap/react tailwindcss @tailwindcss/vite

# Install dev dependencies
npm install -D @types/react @types/react-dom
```

### Vite Configuration

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
      '@app': '/src/app',
      '@pages': '/src/pages',
      '@widgets': '/src/widgets',
      '@features': '/src/features',
      '@entities': '/src/entities',
      '@shared': '/src/shared',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
```

### Package Versions (Target)

| Package        | Version   |
|----------------|-----------|
| react          | ^19.0.0   |
| react-dom      | ^19.0.0   |
| vite           | ^6.x      |
| tailwindcss    | ^4.x      |
| gsap           | ^3.12+    |
| @gsap/react    | ^2.x      |

---

## 3. ARCHITECTURE & FOLDER STRUCTURE

Use **Feature-Sliced Design (FSD)** — an enterprise-grade architectural methodology that organizes code by responsibility layers.

```
src/
├── app/                          # App-level setup
│   ├── App.jsx                   # Root component, lazy loading, Suspense
│   ├── providers/
│   │   └── ThemeProvider.jsx     # Dark/light theme context + provider
│   └── styles/
│       └── index.css             # Global styles, Tailwind imports, @theme tokens
│
├── pages/
│   └── LandingPage/
│       ├── LandingPage.jsx       # Page composition — assembles all sections
│       └── index.js              # Public export
│
├── widgets/                      # Self-contained UI blocks (sections)
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   ├── MobileDrawer.jsx
│   │   └── index.js
│   ├── HeroSection/
│   │   ├── HeroSection.jsx
│   │   ├── SwipeCardStack.jsx
│   │   ├── FloatingParticles.jsx
│   │   └── index.js
│   ├── HowItWorksSection/
│   │   ├── HowItWorksSection.jsx
│   │   ├── StepCard.jsx
│   │   ├── ConnectingLine.jsx
│   │   └── index.js
│   ├── FeaturesSection/
│   │   ├── FeaturesSection.jsx
│   │   ├── FeatureCard.jsx
│   │   └── index.js
│   ├── BreedGallerySection/
│   │   ├── BreedGallerySection.jsx
│   │   ├── BreedCard.jsx
│   │   └── index.js
│   ├── TestimonialsSection/
│   │   ├── TestimonialsSection.jsx
│   │   ├── TestimonialCard.jsx
│   │   └── index.js
│   ├── PricingSection/
│   │   ├── PricingSection.jsx
│   │   ├── PricingCard.jsx
│   │   ├── PricingToggle.jsx
│   │   └── index.js
│   ├── FAQSection/
│   │   ├── FAQSection.jsx
│   │   ├── FAQItem.jsx
│   │   └── index.js
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── index.js
│   └── LoadingScreen/
│       ├── LoadingScreen.jsx
│       └── index.js
│
├── features/                     # Reusable feature logic
│   ├── theme-toggle/
│   │   ├── ThemeToggle.jsx       # Sun/moon morph toggle button
│   │   └── index.js
│   └── smooth-scroll/
│       ├── useSmoothScroll.js    # Custom hook for anchor scrolling
│       └── index.js
│
├── entities/                     # Business data/models
│   ├── dog/
│   │   ├── dogProfiles.js        # Mock dog profile data
│   │   └── index.js
│   ├── pricing/
│   │   ├── pricingPlans.js       # Pricing tier data
│   │   └── index.js
│   ├── testimonials/
│   │   ├── testimonialData.js    # Testimonial entries
│   │   └── index.js
│   └── faq/
│       ├── faqData.js            # FAQ entries
│       └── index.js
│
├── shared/                       # Shared utilities & UI primitives
│   ├── ui/
│   │   ├── Button.jsx            # Reusable button component
│   │   ├── Badge.jsx             # Badge/tag component
│   │   ├── SectionHeading.jsx    # Consistent section heading with animated underline
│   │   ├── GradientText.jsx      # Gradient-colored text wrapper
│   │   └── index.js
│   ├── hooks/
│   │   ├── useScrollTrigger.js   # Custom GSAP ScrollTrigger hook
│   │   ├── useMediaQuery.js      # Responsive breakpoint hook
│   │   └── useIntersection.js    # Intersection Observer hook for lazy loading
│   ├── lib/
│   │   ├── gsapConfig.js         # GSAP plugin registration & defaults
│   │   └── cn.js                 # Classname merge utility (clsx-like)
│   ├── constants/
│   │   ├── navigation.js         # Nav link items
│   │   └── siteConfig.js         # Site-wide constants (brand name, tagline, etc.)
│   └── assets/
│       ├── images/               # Dog images (AI-generated or placeholder)
│       ├── icons/                # SVG icons (paw, heart, star, etc.)
│       └── fonts/                # Self-hosted font files (if needed)
│
└── main.jsx                      # Entry point — renders App with StrictMode
```

### Architecture Rules

1. **Each folder has an `index.js`** that re-exports public API — no deep imports
2. **Widgets are self-contained** — they import from `shared/`, `entities/`, and `features/` but NEVER from each other
3. **Data lives in `entities/`** — all mock data, types, and business models
4. **Shared UI is generic** — no business logic in `shared/ui/` components
5. **Features contain cross-cutting logic** — theme toggle, smooth scroll, etc.
6. **One component per file** — no multi-component files
7. **Named exports only** — no default exports (except page-level components)

---

## 4. DESIGN SYSTEM & TOKENS

### Tailwind 4 CSS-First Configuration

Define all design tokens using Tailwind 4's `@theme` directive in the main CSS file:

```css
/* src/app/styles/index.css */
@import "tailwindcss";

@theme {
  /* ===== COLORS ===== */

  /* Primary - Electric Pop Pink/Magenta */
  --color-primary-50: #FFF0F7;
  --color-primary-100: #FFE0EF;
  --color-primary-200: #FFC2DF;
  --color-primary-300: #FF8DC4;
  --color-primary-400: #FF3CAC;
  --color-primary-500: #E6359B;
  --color-primary-600: #C42D84;
  --color-primary-700: #A3256D;
  --color-primary-800: #7D1D54;
  --color-primary-900: #5C1640;

  /* Secondary - Deep Purple */
  --color-secondary-50: #F5F0FF;
  --color-secondary-100: #EDE5FF;
  --color-secondary-200: #D4C2FF;
  --color-secondary-300: #B08DFF;
  --color-secondary-400: #784BA0;
  --color-secondary-500: #6B3FA0;
  --color-secondary-600: #5A3485;
  --color-secondary-700: #472A6B;
  --color-secondary-800: #352050;
  --color-secondary-900: #231536;

  /* Accent - Electric Blue */
  --color-accent-50: #E8F4FD;
  --color-accent-100: #D1E9FB;
  --color-accent-200: #A3D3F7;
  --color-accent-300: #56AEE8;
  --color-accent-400: #2196F3;
  --color-accent-500: #1976D2;
  --color-accent-600: #1565C0;
  --color-accent-700: #0D47A1;
  --color-accent-800: #0A3A83;
  --color-accent-900: #072D66;

  /* Neutral */
  --color-neutral-50: #F8FAFC;
  --color-neutral-100: #F1F5F9;
  --color-neutral-200: #E2E8F0;
  --color-neutral-300: #CBD5E1;
  --color-neutral-400: #94A3B8;
  --color-neutral-500: #64748B;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1E293B;
  --color-neutral-900: #0F172A;
  --color-neutral-950: #020617;

  /* Semantic */
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;

  /* ===== GRADIENTS (as CSS custom properties) ===== */
  /* Use these via arbitrary values: bg-[var(--gradient-primary)] won't work for gradients,
     so define gradient classes in custom CSS below */

  /* ===== TYPOGRAPHY ===== */
  --font-heading: 'Outfit', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  --font-size-6xl: 3.75rem;   /* 60px */
  --font-size-7xl: 4.5rem;    /* 72px */

  /* ===== SPACING ===== */
  --spacing-section: 6rem;     /* Vertical padding between sections */
  --spacing-container: 1.5rem; /* Horizontal page padding */

  /* ===== BORDER RADIUS ===== */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  /* ===== SHADOWS ===== */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --shadow-glow: 0 0 20px rgba(255, 60, 172, 0.3);
  --shadow-glow-lg: 0 0 40px rgba(255, 60, 172, 0.4), 0 0 80px rgba(120, 75, 160, 0.2);

  /* ===== ANIMATION DURATIONS ===== */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;

  /* ===== Z-INDEX SCALE ===== */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  --z-loading: 9999;
}
```

### Custom CSS (Beyond Tailwind)

```css
/* Gradient backgrounds — can't define gradients as Tailwind tokens */
.gradient-primary {
  background: linear-gradient(135deg, #FF3CAC 0%, #784BA0 50%, #2196F3 100%);
}

.gradient-primary-hover {
  background: linear-gradient(135deg, #FF3CAC 0%, #9B4DCA 50%, #2196F3 100%);
}

.gradient-text {
  background: linear-gradient(135deg, #FF3CAC, #784BA0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glassmorphism */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.glass-dark {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* 3D Tilt Card Perspective */
.perspective-container {
  perspective: 1000px;
}

.tilt-card {
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}
```

### Google Fonts Import

```html
<!-- In index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

---

## 5. COMPONENT SPECIFICATIONS

### Shared UI Components

| Component          | Props                                    | Description                                                         |
|--------------------|------------------------------------------|---------------------------------------------------------------------|
| `Button`           | `variant: 'primary' \| 'secondary' \| 'ghost' \| 'outline'`, `size: 'sm' \| 'md' \| 'lg'`, `children`, `className`, `...rest` | Reusable button with gradient background for primary, hover scale animation (1.05), active press (0.95), ripple effect on click |
| `Badge`            | `variant: 'default' \| 'popular' \| 'new'`, `children`, `pulse: boolean` | Small label badge. "Popular" variant pulses with glow animation     |
| `SectionHeading`   | `title`, `subtitle`, `align: 'center' \| 'left'`, `gradient: boolean` | Section title with optional gradient text + animated underline that draws on scroll reveal |
| `GradientText`     | `children`, `className`                  | Wraps text in the primary gradient                                  |

### Widget Components

Each widget (section) is a self-contained block. Every widget must:
- Accept `id` prop for anchor navigation
- Wrap content in a `<section>` element with consistent padding
- Use `useScrollTrigger` hook for reveal animations
- Be lazy-loadable via `React.lazy()` (except Navbar and Hero)

---

## 6. SECTION-BY-SECTION BUILD SPECS

### 6.1 Loading Screen (`LoadingScreen`)

**Visual**: Full-screen overlay with the brand gradient background. Centered animated paw print icon that "steps" (alternating left/right paw with bounce). Below the paw, a thin progress bar that fills with a shimmer effect. Brand name "PawMatch" fades in with letter-by-letter stagger.

**Behavior**:
- Shows on initial page load
- Progress bar fills based on actual asset loading (images, fonts)
- When loading complete, the entire screen scales up slightly (1.05) then fades out, revealing the page underneath
- Minimum display time: 1.5 seconds (to prevent flash)
- After dismiss, set `display: none` to remove from DOM

**Animation Details**:
- Paw icon: alternating Y-translate bounce (-10px) with slight rotation (±5°), 0.6s per step
- Progress bar: linear fill with gradient shimmer overlay (left-to-right)
- Dismiss: 0.5s scale(1.05) + opacity(0) with `ease-in` easing

---

### 6.2 Navbar (`Navbar`)

**Visual**: Glassmorphic sticky navbar. Full-width with `max-w-7xl` centered container. Contains:
- **Left**: PawMatch logo (paw icon + brand text)
- **Center**: Navigation links (How It Works, Features, Gallery, Testimonials, Pricing, FAQ)
- **Right**: Theme toggle (sun/moon morph) + "Get Started" CTA button (gradient primary)

**Behavior**:
- Starts with slight transparency, transitions to full glassmorphism on scroll (after 50px)
- On scroll down: shrinks height from 80px → 64px, adds subtle shadow
- Navigation links highlight the currently visible section (Intersection Observer)
- Smooth scroll to section on click
- Mobile (<768px): hamburger icon replaces center links, opens slide-in drawer from right

**Glassmorphism**:
- Light mode: `rgba(255, 255, 255, 0.7)` background, blur(16px)
- Dark mode: `rgba(15, 23, 42, 0.7)` background, blur(16px)
- Border: 1px solid rgba(255, 255, 255, 0.1)

**Mobile Drawer**:
- Slides in from right with overlay backdrop (rgba(0,0,0,0.5))
- Links stagger-animate in (fade + slide from right, 50ms delay each)
- Close on link click, outside click, or X button

---

### 6.3 Hero Section (`HeroSection`)

**Visual**: Full viewport height (100vh). Split layout — left side has text content, right side has the animated swipe card stack. Background has subtle floating particles (hearts, paw prints, sparkles).

**Left Side Content**:
- Eyebrow text: "🐾 #1 Dog Matching App" — fades in first
- Headline: "Find Your Dog's\n**Perfect Match**" — "Perfect Match" in gradient text. Each word reveals with clip-path animation (bottom-to-top wipe), staggered 0.15s
- Subheadline: "Swipe, match, and schedule playdates for your furry best friend. Join 50,000+ happy dogs already matched." — fades in after headline
- CTA buttons: "Start Matching — It's Free" (primary gradient) + "Watch How It Works" (ghost/outline) — slide up with spring animation
- Social proof: row of overlapping dog avatar circles (5 avatars) + "50,000+ matches made" — slides in last

**Right Side — Swipe Card Stack** (`SwipeCardStack`):
- 3 stacked cards with slight rotation and offset (like a fanned deck)
- Each card shows: dog photo (top 60%), dog name + breed + age (bottom 40%), heart and X buttons
- Auto-swipe animation: every 3 seconds, the top card swipes right with rotation (15°), revealing the card below. New card slides in from bottom
- Cards have rounded corners (1.5rem), white background (light) / neutral-800 (dark), subtle shadow
- On hover: stack spreads slightly (more offset between cards)

**Floating Particles** (`FloatingParticles`):
- 15-20 small elements: hearts (♥), paw prints (🐾), sparkles (✨)
- Each particle: random position, random size (8-24px), random opacity (0.1-0.4)
- Float animation: gentle Y-axis bob (±20px) + slight X drift + slow rotation
- Each particle has random animation duration (3-8s) and delay
- Use CSS animations (not GSAP) for continuous background motion — better performance

**GSAP Timeline (Hero)**:
```
t=0.0s  → Loading screen dismisses
t=0.3s  → Eyebrow text fades in (opacity 0→1, y: 20→0)
t=0.5s  → Headline words reveal (clip-path: inset(100% 0 0 0) → inset(0))
t=1.0s  → Subheadline fades in (opacity 0→1, y: 20→0)
t=1.3s  → CTA buttons spring up (y: 40→0, scale: 0.8→1, ease: "back.out(1.7)")
t=1.6s  → Social proof slides in (x: -30→0, opacity 0→1)
t=1.0s  → Card stack assembles (cards scale in from 0, stagger 0.15s)
t=1.5s  → Card auto-swipe loop begins
```

---

### 6.4 How It Works Section (`HowItWorksSection`)

**Visual**: 4 step cards in a horizontal row (vertical on mobile). Each card has: step number (circled), icon, title, description. Cards connected by an animated dashed line.

**Steps Data**:
1. 🐕 **Create Profile** — "Upload photos and tell us about your pup's personality, breed, and favorite activities."
2. 💕 **Swipe & Match** — "Browse nearby dogs and swipe right on potential playmates. It's a match when they swipe back!"
3. 💬 **Chat & Plan** — "Message your matches, share photos, and plan the perfect doggy playdate."
4. 🎉 **Meet & Play** — "Meet up at dog parks, beaches, or trails. Watch your pups become best friends!"

**Scroll Animation**:
- Section heading fades in (SectionHeading component with gradient underline)
- Connecting line draws from left to right (SVG stroke-dasharray animation triggered by ScrollTrigger)
- Each step card flips in from bottom: `rotateX(90°) → rotateX(0°)`, `opacity: 0 → 1`, `y: 60 → 0`
- Stagger: 0.2s delay between each card
- Step number circles fill with gradient (border-only → filled) as each card reveals
- Icons bounce in with `ease: "elastic.out(1, 0.3)"`
- ScrollTrigger: `start: "top 75%"`, `toggleActions: "play none none none"`

---

### 6.5 Features Section (`FeaturesSection`)

**Visual**: Section heading + 6 feature cards in a 3×2 grid (2×3 on tablet, 1-column on mobile). Each card has: gradient icon background, title, description, and a subtle decorative element.

**Features Data**:
1. 📍 **Location Matching** — "Find dogs in your neighborhood. Set your radius and discover nearby pups."
2. 🧬 **Breed Compatibility** — "Our algorithm matches compatible breeds for the best play experiences."
3. 📸 **Photo Galleries** — "Share unlimited photos and videos of your dog's cutest moments."
4. 📅 **Playdate Scheduler** — "Built-in calendar to schedule, track, and manage playdates."
5. ⭐ **Verified Profiles** — "Vet-verified health records and vaccination status for safety."
6. 🏆 **Events & Meetups** — "Join local dog events, competitions, and group walks."

**Scroll Animation**:
- Cards stagger in from bottom: `y: 80 → 0`, `opacity: 0 → 1`, `scale: 0.9 → 1`
- Stagger: 0.12s between cards
- ScrollTrigger: `start: "top 70%"`

**Hover Interactions**:
- 3D tilt effect: card tilts toward cursor (max ±10°) using CSS `perspective` + `rotateX`/`rotateY`
- Implement tilt with `onMouseMove` event calculating cursor position relative to card center
- Icon pulses with scale bounce (1 → 1.15 → 1) on hover
- Subtle gradient border appears (1px gradient border visible only on hover)
- Card lifts with increased shadow: `translateY(-8px)` + `shadow-xl`
- Transition: 0.3s ease for all hover effects

---

### 6.6 Dog Breed Gallery (`BreedGallerySection`)

**Visual**: Masonry grid layout showing dog breed photos. Responsive columns: 4 columns (desktop), 3 (tablet), 2 (mobile). Each card shows a dog photo with breed name overlay on hover.

**Breed Data** (10-12 breeds):
Golden Retriever, French Bulldog, Labrador, Corgi, Husky, Poodle, German Shepherd, Beagle, Samoyed, Shiba Inu, Dalmatian, Pomeranian

**Images**: Use AI-generated dog images. If image generation is unavailable, use placeholder URLs: `https://placedog.net/500/[height]?id=[n]` with varying heights (300-500px) for masonry effect.

**Scroll Animation**:
- Cards stagger in from bottom with random slight rotation: `y: 60 → 0`, `rotate: random(-3, 3) → 0`, `opacity: 0 → 1`
- Stagger: 0.08s between cards (fast cascade effect)
- ScrollTrigger: `start: "top 80%"`

**Hover Interactions**:
- Image scales up slightly: `scale(1.08)` with overflow hidden on container
- Gradient overlay slides up from bottom (transparent → primary gradient at 60% opacity)
- Breed name text slides up into view (from below the card) in bold white
- 3D tilt: subtle tilt toward cursor (max ±5°)
- Transition: 0.4s ease

---

### 6.7 Testimonials Section (`TestimonialsSection`)

**Visual**: Auto-playing horizontal carousel of testimonial cards. Each card shows: matched dog pair photo (side by side), owner quote, owner name, star rating, and match percentage.

**Testimonial Data** (5-6 entries):
```
[
  { dogs: "Buddy & Luna", quote: "Our dogs became inseparable after their first playdate! PawMatch made it so easy to find the perfect playmate.", owner: "Sarah M.", rating: 5, matchPercent: 98 },
  { dogs: "Max & Bella", quote: "I was skeptical at first, but Max hasn't stopped wagging his tail since meeting Bella. Best app ever!", owner: "James K.", rating: 5, matchPercent: 95 },
  { dogs: "Charlie & Daisy", quote: "The breed compatibility feature is genius. Charlie and Daisy are literally best friends now.", owner: "Emma R.", rating: 5, matchPercent: 97 },
  { dogs: "Rocky & Coco", quote: "We've made so many doggy friends in our neighborhood. The playdate scheduler is a game-changer!", owner: "Michael T.", rating: 4, matchPercent: 92 },
  { dogs: "Bailey & Duke", quote: "From first swipe to first playdate in 24 hours. Duke has never been happier!", owner: "Ashley P.", rating: 5, matchPercent: 96 }
]
```

**Carousel Behavior**:
- Auto-plays: slides every 4 seconds
- Shows 1 card on mobile, 2 on tablet, 3 on desktop
- Infinite loop (GSAP horizontal scroll)
- Pause auto-play on hover
- Navigation dots below indicating current position
- Swipe gesture support on mobile

**Scroll Animation**:
- Section heading reveals first
- Cards slide in from the right as a group: `x: 100 → 0`, `opacity: 0 → 1`
- Star ratings animate in with stagger (each star pops with scale bounce)
- Quote text types out character-by-character (CSS `steps()` animation)

**Card Design**:
- Rounded corners (1rem), subtle shadow, glass effect in dark mode
- Dog pair photo at top with slight overlap/parallax
- Quote in italic with decorative quotation mark (large, faded gradient quote symbol behind text)
- Star rating as filled/unfilled star icons (golden)
- Match percentage in a small gradient badge

---

### 6.8 Pricing Section (`PricingSection`)

**Visual**: Section heading + billing toggle + 3 pricing cards side by side. "Good Boy" (Pro) card is highlighted as "Most Popular" with a lifted position and glow effect.

**Pricing Data**:

| Feature               | 🐶 Puppy (Free) | 🌟 Good Boy (Pro) | 👑 Alpha Dog (Premium) |
|-----------------------|-------------------|--------------------|------------------------|
| Monthly Price         | $0                | $9.99              | $19.99                 |
| Yearly Price          | $0                | $7.99/mo ($95.88)  | $14.99/mo ($179.88)    |
| Yearly Savings        | —                 | Save 20%           | Save 25%               |
| Daily Swipes          | 10                | Unlimited          | Unlimited              |
| Photo Uploads         | 3                 | 15                 | Unlimited              |
| Breed Matching        | Basic             | Advanced           | AI-Powered Premium     |
| Playdate Scheduler    | ✗                 | ✓                  | ✓                      |
| Chat                  | Limited           | Unlimited          | Unlimited + Priority   |
| Profile Boost         | ✗                 | 1x/week            | 3x/week                |
| Events Access         | ✗                 | ✗                  | ✓ VIP Access           |
| Vet Verification      | ✗                 | ✓                  | ✓ Priority             |
| Support               | Community         | Email              | 24/7 Priority          |

**Billing Toggle** (`PricingToggle`):
- Pill-shaped toggle: "Monthly" | "Yearly"
- Active side has gradient background that slides (GSAP tween, 0.3s)
- When switched to yearly: "Save X%" badge bounces in next to each price with `ease: "elastic.out"`
- Price numbers animate (count up/down) during transition — GSAP number tween

**Pricing Cards** (`PricingCard`):
- Glassmorphic cards with subtle border
- Popular card ("Good Boy"): slightly larger, lifted (`translateY(-16px)`), gradient border (animated), pulsing "Most Popular" badge at top, glow shadow
- Header: plan emoji + name + price (large) + billing period
- Feature list with ✓/✗ icons (green check, muted X)
- CTA button at bottom: "Get Started" (primary gradient for popular, outline for others)

**Scroll Animation**:
- Cards stagger in from bottom: `y: 80 → 0`, `opacity: 0 → 1`, `scale: 0.9 → 1`
- Popular card animates slightly after the others for emphasis
- Stagger: 0.15s
- ScrollTrigger: `start: "top 70%"`

**Hover Interactions**:
- Card lifts: `translateY(-8px)` with increased shadow
- Non-popular cards gain a subtle gradient border on hover
- CTA button scales slightly (1.05) with glow effect
- Transition: 0.3s ease

---

### 6.9 FAQ Section (`FAQSection`)

**Visual**: Section heading + accordion list. Clean, minimal design. Each FAQ item has question (with toggle +/- icon) and expandable answer.

**FAQ Data** (6-8 entries):
```
[
  { q: "Is PawMatch really free?", a: "Yes! Our Puppy plan is completely free forever. You can create a profile, browse dogs, and get 10 swipes per day at no cost. Upgrade anytime for more features." },
  { q: "How does the matching algorithm work?", a: "We consider breed compatibility, energy levels, size, age, location, and activity preferences to suggest the best matches for your dog." },
  { q: "Is it safe to meet dogs from the app?", a: "Safety is our #1 priority. All profiles can be vet-verified, and we recommend meeting in public dog parks first. Our in-app chat lets you get to know the owner before meeting." },
  { q: "Can I use PawMatch for breeding?", a: "While PawMatch is primarily designed for playdates and socialization, our Premium plan includes breed-specific matching features that breeders find valuable." },
  { q: "What if my dog doesn't get along with a match?", a: "No worries! Not every match is perfect. You can unmatch at any time, and our algorithm learns from your preferences to suggest better matches over time." },
  { q: "How do I cancel my subscription?", a: "You can cancel anytime from your account settings. No hidden fees, no cancellation penalties. Your plan will remain active until the end of your billing period." }
]
```

**Accordion Behavior** (`FAQItem`):
- Click question to toggle answer visibility
- Only one answer open at a time (accordion pattern)
- Toggle icon rotates: `+` → `×` with 0.3s rotation animation
- Answer expands/collapses with smooth height animation (GSAP `auto` height tween)
- Answer text fades in during expand (slight delay after height starts)

**Scroll Animation**:
- FAQ items stagger in from left: `x: -40 → 0`, `opacity: 0 → 1`
- Stagger: 0.1s
- ScrollTrigger: `start: "top 75%"`

---

### 6.10 Footer (`Footer`)

**Visual**: Dark background (neutral-900 in light mode, neutral-950 in dark mode). Multi-column layout with brand info, navigation links, social icons, and newsletter signup.

**Layout** (4 columns on desktop, stack on mobile):
1. **Brand Column**: PawMatch logo, tagline ("Where every dog finds their perfect match"), social media icons (Instagram, Twitter/X, Facebook, TikTok) with hover gradient effect
2. **Product Links**: Features, Pricing, Testimonials, Download App, Blog
3. **Company Links**: About Us, Careers, Press, Contact, Partners
4. **Legal Links**: Privacy Policy, Terms of Service, Cookie Policy, GDPR

**Bottom Bar**: Copyright "© 2026 PawMatch. All rights reserved. Made with ❤️ for dogs everywhere."

**Newsletter Signup** (above the columns):
- Full-width gradient background strip
- "Join 50,000+ dog lovers" heading
- Email input + "Subscribe" button inline
- Input has glass effect styling

**Interactions**:
- Social icons: scale(1.2) + gradient color fill on hover
- Links: gradient underline slides in from left on hover
- Newsletter button: gradient shift on hover

---

## 7. ANIMATION & MOTION SPECS

### GSAP Configuration

```js
// src/shared/lib/gsapConfig.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Global GSAP defaults
gsap.defaults({
  ease: 'power2.out',
  duration: 0.8,
});

// Reusable scroll-triggered reveal
export const createScrollReveal = (element, options = {}) => {
  const defaults = {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  };
  return gsap.from(element, { ...defaults, ...options });
};

export { gsap, ScrollTrigger };
```

### Custom ScrollTrigger Hook

```js
// src/shared/hooks/useScrollTrigger.js
import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@shared/lib/gsapConfig';

export const useScrollTrigger = (animationFn, deps = []) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animationFn(containerRef.current, gsap, ScrollTrigger);
    }, containerRef);

    return () => ctx.revert();
  }, deps);

  return containerRef;
};
```

### Animation Easing Reference

| Animation Type       | Easing                     | Duration |
|----------------------|----------------------------|----------|
| Fade in              | `power2.out`               | 0.6-0.8s |
| Slide up             | `power2.out`               | 0.6-0.8s |
| Bounce in            | `elastic.out(1, 0.3)`      | 1.0s     |
| Spring button        | `back.out(1.7)`            | 0.5s     |
| Card flip            | `power3.out`               | 0.8s     |
| Scale pop            | `back.out(2.5)`            | 0.5s     |
| Line draw            | `power1.inOut`             | 1.2s     |
| Smooth dismiss       | `power2.inOut`             | 0.5s     |
| Number count         | `power1.out`               | 0.8s     |
| Height expand        | `power2.inOut`             | 0.4s     |

### Particle System (CSS-only)

```css
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(5deg); }
  50% { transform: translateY(-10px) rotate(-3deg); }
  75% { transform: translateY(-25px) rotate(3deg); }
}

.particle {
  position: absolute;
  pointer-events: none;
  animation: float var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
  opacity: var(--opacity);
}
```

---

## 8. DUAL THEME SYSTEM

### Theme Provider Implementation

```jsx
// src/app/providers/ThemeProvider.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('pawmatch-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('pawmatch-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

### Theme Toggle Button (`ThemeToggle`)

- SVG morphing animation between sun ☀️ and moon 🌙 icons
- On click: icon rotates 360° while morphing shape
- Sun has radiating rays that retract during morph
- Moon has crescent that forms during morph
- Use GSAP for the morph timeline (0.5s duration)
- Button has circular glass background

### CSS Theme Variables

```css
/* Light theme (default) */
:root {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8FAFC;
  --bg-tertiary: #F1F5F9;
  --text-primary: #0F172A;
  --text-secondary: #475569;
  --text-tertiary: #94A3B8;
  --border-color: #E2E8F0;
  --card-bg: #FFFFFF;
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Dark theme */
.dark {
  --bg-primary: #0F172A;
  --bg-secondary: #1E293B;
  --bg-tertiary: #334155;
  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
  --text-tertiary: #64748B;
  --border-color: rgba(255, 255, 255, 0.08);
  --card-bg: #1E293B;
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
}
```

Use these CSS custom properties via Tailwind's arbitrary value syntax: `bg-[var(--bg-primary)]`, `text-[var(--text-primary)]`, etc.

---

## 9. PERFORMANCE OPTIMIZATION RULES

### Code Splitting

```jsx
// src/app/App.jsx — Lazy load below-fold sections
import { lazy, Suspense } from 'react';

// Eagerly loaded (above fold)
import Navbar from '@widgets/Navbar';
import HeroSection from '@widgets/HeroSection';

// Lazy loaded (below fold)
const HowItWorksSection = lazy(() => import('@widgets/HowItWorksSection'));
const FeaturesSection = lazy(() => import('@widgets/FeaturesSection'));
const BreedGallerySection = lazy(() => import('@widgets/BreedGallerySection'));
const TestimonialsSection = lazy(() => import('@widgets/TestimonialsSection'));
const PricingSection = lazy(() => import('@widgets/PricingSection'));
const FAQSection = lazy(() => import('@widgets/FAQSection'));
const Footer = lazy(() => import('@widgets/Footer'));
```

### Image Optimization Rules

1. Use WebP format for all images
2. Implement lazy loading with `loading="lazy"` attribute
3. Use `srcset` for responsive image sizes
4. Add blur-up placeholder effect: show a tiny blurred version (10px wide, CSS blur) while full image loads
5. Set explicit `width` and `height` attributes to prevent layout shift
6. Preload hero section images in `<head>`

### Animation Performance Rules

1. **Only animate GPU-accelerated properties**: `transform` (translate, scale, rotate) and `opacity`
2. **Never animate**: `width`, `height`, `top`, `left`, `margin`, `padding`, `border`
3. Use `will-change: transform` on elements that will be animated (add via GSAP or CSS)
4. Remove `will-change` after animation completes (GSAP `onComplete` callback)
5. Use `transform: translateZ(0)` or `translate3d` to promote elements to GPU layer when needed
6. Batch DOM reads/writes to prevent layout thrashing

### Bundle Optimization

1. Import GSAP plugins individually: `import { ScrollTrigger } from 'gsap/ScrollTrigger'`
2. Tree-shake unused code with Vite's built-in support
3. Separate vendor chunks (gsap, react) via `manualChunks` in Vite config
4. Target modern browsers only (ES2020+) in Vite build config

---

## 10. RESPONSIVENESS & BREAKPOINTS

### Breakpoint System

| Breakpoint | Width     | Tailwind | Description           |
|------------|-----------|----------|-----------------------|
| Mobile     | < 640px   | default  | Single column, stacked |
| Tablet     | ≥ 640px   | `sm:`    | 2 columns, adjusted   |
| Tablet L   | ≥ 768px   | `md:`    | Navbar switches        |
| Desktop    | ≥ 1024px  | `lg:`    | Full layout            |
| Desktop L  | ≥ 1280px  | `xl:`    | Max-width container    |

### Responsive Rules

1. **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
2. **Hero**: Stack vertically on mobile (text first, cards below). Full-width card stack.
3. **How It Works**: Vertical stacked cards on mobile, horizontal on desktop. Connecting line becomes vertical.
4. **Features Grid**: 1 col (mobile) → 2 col (sm) → 3 col (lg)
5. **Breed Gallery**: 2 col (mobile) → 3 col (md) → 4 col (lg)
6. **Testimonials Carousel**: 1 card visible (mobile) → 2 (md) → 3 (lg)
7. **Pricing Cards**: Stack vertically on mobile, popular card on top
8. **FAQ**: Full width on all breakpoints
9. **Footer**: Stack all columns vertically on mobile
10. **Font Sizes**: Scale down 1-2 levels on mobile (e.g., 7xl → 4xl for hero headline)
11. **Section Padding**: Reduce from `py-24` to `py-16` on mobile
12. **Touch Targets**: All interactive elements minimum 44×44px on mobile

---

## 11. ACCEPTANCE CRITERIA CHECKLIST

Use this checklist to verify the build is complete and meets all requirements:

### Setup & Architecture
- [ ] Vite project initialized with React 19 + Tailwind CSS 4
- [ ] Feature-Sliced Design folder structure created exactly as specified
- [ ] All path aliases configured in vite.config.js
- [ ] Google Fonts (Outfit + Inter) loaded with font-display: swap
- [ ] GSAP + ScrollTrigger installed and configured
- [ ] Each folder has index.js with clean re-exports
- [ ] No deep imports — all imports go through public API (index.js)

### Design System
- [ ] Tailwind 4 @theme tokens defined (colors, typography, spacing, shadows, radii)
- [ ] Custom CSS classes defined (gradients, glassmorphism, tilt cards)
- [ ] CSS custom properties for theme switching (light/dark variables)
- [ ] Shared UI components built (Button, Badge, SectionHeading, GradientText)

### Theme System
- [ ] ThemeProvider context implemented
- [ ] System preference auto-detection on first visit
- [ ] Manual toggle persists to localStorage
- [ ] All sections render correctly in both light and dark themes
- [ ] Theme toggle has animated sun/moon SVG morph

### Sections (8 total)
- [ ] Loading Screen — paw animation + progress bar + fade-out dismiss
- [ ] Navbar — glassmorphic, shrink on scroll, active section highlight, mobile drawer
- [ ] Hero — headline text reveal, swipe card stack with auto-swipe, floating particles, CTAs
- [ ] How It Works — 4 step cards, staggered flip-in, connecting line draw, icon bounce
- [ ] Features — 6 feature cards, 3D tilt on hover, staggered scroll reveal, icon pulse
- [ ] Breed Gallery — masonry grid, hover tilt + overlay, staggered cascade reveal
- [ ] Testimonials — auto-playing carousel, parallax photos, typing quote, star ratings
- [ ] Pricing — 3 glassmorphic cards, monthly/yearly toggle, price animation, popular highlight
- [ ] FAQ — accordion with smooth expand/collapse, rotate toggle icon, stagger reveal
- [ ] Footer — 4-column layout, newsletter signup, social icons, gradient hover effects

### Animations
- [ ] GSAP ScrollTrigger wired to every section
- [ ] Hero entrance timeline plays after loading screen
- [ ] All scroll reveals use consistent easing and timing from spec
- [ ] Hover interactions implemented on all interactive cards
- [ ] CSS particle system running in hero background
- [ ] Swipe card auto-animation loops correctly
- [ ] Pricing toggle animates price numbers and "Save" badges
- [ ] FAQ accordion has smooth height + opacity animation
- [ ] Testimonial carousel auto-plays and pauses on hover

### Performance
- [ ] Below-fold sections lazy loaded with React.lazy + Suspense
- [ ] Images use lazy loading attribute
- [ ] Only GPU-accelerated properties animated (transform, opacity)
- [ ] Vendor chunks split (gsap, react) in Vite config
- [ ] Hero images preloaded in HTML head
- [ ] No layout shift from images (explicit dimensions set)

### Responsiveness
- [ ] All sections render correctly at mobile (< 640px)
- [ ] All sections render correctly at tablet (640-1023px)
- [ ] All sections render correctly at desktop (≥ 1024px)
- [ ] Navbar hamburger menu works on mobile with slide-in drawer
- [ ] Touch targets minimum 44×44px on mobile
- [ ] Font sizes scale appropriately across breakpoints

### Code Quality
- [ ] One component per file
- [ ] Named exports (no default exports except pages)
- [ ] No hardcoded strings — all data in entities/ layer
- [ ] Consistent code formatting
- [ ] Components are reusable and accept appropriate props
- [ ] Custom hooks extract reusable logic
- [ ] No unused imports or dead code

---

## QUICK START COMMAND

Run this single command sequence to scaffold and start development:

```bash
npx -y create-vite@latest ./ --template react && npm install gsap @gsap/react && npm install tailwindcss @tailwindcss/vite && npm run dev
```

Then follow this build order:
1. Configure `vite.config.js` with aliases and plugins
2. Set up `src/app/styles/index.css` with all @theme tokens and custom CSS
3. Update `index.html` with Google Fonts, meta tags, and preloads
4. Build `shared/` layer (ui components, hooks, lib, constants)
5. Build `entities/` layer (all mock data files)
6. Build `features/` layer (theme toggle, smooth scroll)
7. Build `app/` layer (ThemeProvider, App.jsx with lazy loading)
8. Build `widgets/` layer (each section, one at a time, starting with Navbar → Hero → downward)
9. Build `pages/` layer (LandingPage composition)
10. Polish: test all animations, both themes, all breakpoints

---

> **🎯 Success Metric**: When this prompt is executed by an AI agent, the resulting website should look like a premium, production-ready SaaS landing page that would impress at a product demo. The animations should be smooth (60fps), the design should feel cohesive, and the code should be maintainable by a team of engineers.
