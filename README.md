# PawMatch / Dog Tinder Prompt Benchmark

This repository contains a reference implementation of **PawMatch**, a fictional "Dog Tinder" landing page built with React, Tailwind CSS 4, Vite, and GSAP.

The primary artifact is not the app itself. The main purpose of this repo is [`DOG_TINDER_MASTER_PROMPT.md`](./DOG_TINDER_MASTER_PROMPT.md): a reusable master prompt for testing how well current and future LLM coding agents can execute a detailed product plan, preserve visual intent, structure a frontend codebase, implement motion, and verify UI behavior.

## What The App Is

PawMatch is a playful dog-matching SaaS landing page. It includes:

- A glassmorphic navigation bar with light/dark theme support.
- A cinematic hero section with an interactive infinite swipe-card stack.
- Smooth section navigation.
- Scroll-reactive landing sections for onboarding, features, gallery, testimonials, pricing, FAQ, and footer.
- Generated dog imagery used as profile and gallery assets.
- A feature-sliced frontend structure for app, pages, widgets, features, entities, and shared UI.

The current implementation is a reference execution of the prompt, useful for comparing future model outputs against a known working baseline.

## Main Benchmark Requirement

Use [`DOG_TINDER_MASTER_PROMPT.md`](./DOG_TINDER_MASTER_PROMPT.md) as the source of truth when testing an LLM or agent.

Anyone evaluating a new model should be able to give that prompt to a fresh coding session and expect the agent to recreate the same product direction, UI/UX expectations, folder architecture, animation requirements, theme system, responsiveness, and verification checklist. The goal is to measure plan execution and software development quality, not to ship PawMatch as a real product.

When running a benchmark session, record whether the agent:

- Preserved the required React 19 + Tailwind CSS 4 + Vite + GSAP stack.
- Followed the feature-sliced architecture described in the prompt.
- Implemented the required sections and interactions.
- Produced smooth, reversible animation instead of one-shot or flickering reveals.
- Kept the UI responsive across desktop and mobile.
- Verified build, lint, and rendered behavior.
- Documented any intentional deviations from the master prompt.

## Current Implementation Notes

- `src/app` contains app-level providers, root composition, and global Tailwind 4 CSS tokens.
- `src/pages/LandingPage` composes the single-page landing experience.
- `src/widgets` contains page sections such as Navbar, Hero, Gallery, Pricing, FAQ, and Footer.
- `src/entities` stores mock dog, pricing, testimonial, and FAQ data.
- `src/features` contains cross-cutting behavior such as theme toggle and smooth scroll.
- `src/shared` contains reusable UI primitives, hooks, constants, generated image assets, and GSAP setup.

Generated image assets are copied into:

- `public/dog-portraits-sheet.png`
- `public/pawmatch-concept.png`
- `src/shared/assets/images/`

## Development

Install dependencies, then run the dev server:

```bash
bun install
bun run dev
```

In this environment, package-manager shims may be restricted. These direct Node invocations were used successfully:

```bash
node node_modules/typescript/bin/tsc -b
node node_modules/eslint/bin/eslint.js .
node node_modules/vite/bin/vite.js build
```

## Verification Checklist

Before considering an implementation complete:

- Run TypeScript and lint checks.
- Run a production build.
- Load the local app in a browser.
- Test smooth app-bar navigation.
- Test the hero love/pass buttons and verify cards continue indefinitely.
- Test light/dark theme switching.
- Test the pricing monthly/yearly toggle.
- Test FAQ accordion behavior.
- Check desktop and mobile layouts.
- Compare the final render against the prompt requirements and note deviations.

## Reference URL

When the dev server is running, open:

```text
http://127.0.0.1:5173/
```
