# Copilot Instructions

## Project Overview

This is Leo Liu's personal portfolio website, a single-page React application deployed to GitHub Pages at [liuwork.ca](https://liuwork.ca). It presents a two-pane layout — a left sidebar listing sections (experience, education, projects, volunteering) and a right detail pane that renders selected content as Markdown.

## Tech Stack

- **React 18** (Create React App) — component framework
- **MUI (Material UI) v5** — UI component library and theming (`@mui/material`, `@emotion/react`, `@emotion/styled`)
- **React Router DOM v7** — client-side routing
- **GSAP** — animations (primarily in `PersonalImageSlicesCard`)
- **react-markdown** + **remark-gfm** + **rehype-raw** — Markdown rendering
- **PostHog** — analytics
- **Storybook 6** — component development (devDependency; pinned to v6, two major versions behind current)
- **Prettier** — code formatting (via `lint-staged` + Husky pre-commit hook)

## Repository Structure

```
src/
  app/         # Router setup
  content/     # Data layer: siteData.js, content model, markdown loader
  features/
    site/      # Main feature: HomePage, hooks, components, constants
  main/        # Shared UI components (Section, DetailPane, SiteHeader, etc.)
  theme.js     # MUI theme configuration
public/        # Static assets (photos, markdown content files)
scripts/       # Image optimization script
```

Key files:
- `src/content/site/siteData.js` — all portfolio content (personalInfo, experience, education, projects, volunteering)
- `src/main/data.js` — raw personal data and UI helpers (imported by siteData.js)
- `src/features/site/hooks/useContentMode.js` — resolves selected item to rendered content
- `src/features/site/hooks/useHomePageInteractions.js` — handles routing, section navigation, and URL-driven selection
- `src/main/Section.js` — renders a content section with expandable entries
- `src/main/DetailPane.js` — right-side detail view

## Development Workflow

```bash
npm install        # Install dependencies
npm start          # Start dev server at http://localhost:3000
npm test           # Run tests (Jest + React Testing Library)
npm run build      # Production build
npm run storybook  # Start Storybook on port 6006
```

Prettier runs automatically on staged files via Husky pre-commit. You can also run it manually:

```bash
npx prettier --write .
```

## Code Conventions

- **File naming:** PascalCase for components (`DetailPane.js`), camelCase for hooks and utilities (`useContentMode.js`)
- **Exports:** mix of default (components) and named (hooks, utilities) exports — follow the pattern in the file being modified
- **Styling:** use MUI's `sx` prop for component-level styles; theme values via `useTheme()` or `(theme) => ...` callbacks inside `sx`
- **IDs:** use the `generateId` utility to derive stable IDs from content objects; avoid hardcoded magic strings
- **Hooks:** hooks should return data, not JSX — keep rendering logic in components
- **Tests:** React Testing Library with Jest; test files live alongside source files (`*.test.js`)

## Known Tech Debt

See `TECH_DEBT_AUDIT.md` for a full audit. High-priority items:
- Project ID mapping is duplicated across `useContentMode` and `useHomePageInteractions`; consolidate into a shared utility
- `data.js` embeds JSX — prefer plain data with Markdown strings
- `PersonalImageSlicesCard.js` is a 600+ line monolith that should be decomposed
