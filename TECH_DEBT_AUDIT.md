# Tech Debt Audit — Portfolio Codebase

**Date:** February 27, 2026  
**Scope:** Full codebase review of `leowrites.github.io`

## Architecture Overview

The app is a CRA-based React 18 SPA using MUI, react-router-dom v7, react-markdown, and GSAP. It renders a personal portfolio with a left sidebar / right detail pane layout. Content is loaded from static markdown files via `fetch`.

---

## P2 — Separation of Concerns / Architecture

### 9. JSX embedded in data definitions

**File:** `src/main/data.js`

`data.js` imports `TooltipLink` and puts JSX directly into `personalInfo.description` and `experience[2].caption`. This makes the data non-serializable, untestable without React, and tightly couples content to UI components. Prefer markdown strings rendered by `MarkdownRenderer`.

### 10. Inverted dependency: `content/site/siteData.js` → `main/data.js`

`siteData.js` (the "content" layer) re-exports from `main/data.js` (the "UI" layer). The dependency should flow the other direction — data should be defined in `content/` and consumed by `main/`.

### 11. Hook returns JSX

**File:** `src/features/site/hooks/useContentMode.js` (lines 14–20)

`renderContent` returns `<MarkdownRenderer>` or `<StructuredDetails>` elements, making the hook tightly coupled to the view layer. Hooks should return data; the component should decide rendering.

### 12. `PersonalImageSlicesCard.js` — 631-line monolith

**File:** `src/main/PersonalImageSlicesCard.js`

Handles photo data constants, collapsed slice animations, expanded clip-path transitions, full-screen portal overlay with GSAP, image preloading, and dimension tracking — all in one file. Should be decomposed into:

- A `FullScreenImageViewer` component
- A `useSliceAnimation` hook
- Photo data moved to a separate file

---

## P3 — Consistency & Minor Issues

### 13. Inconsistent default vs named exports

`DetailPane`, `Section`, `Education` use default exports; `EntryContainer`, `TechTagList`, `StructuredDetails` use named exports. Makes imports unpredictable across the codebase.

### 14. `"leo-liu"` hardcoded magic string

Appears in 3 places in `src/features/site/hooks/useHomePageInteractions.js`. Should be a constant derived from `generateId(ABOUT_ITEM)`.

### 15. Section IDs duplicated between constants and JSX

`src/features/site/constants/layout.js` defines section IDs. `src/features/site/components/HomeSectionList.js` hardcodes the same strings as props. They can drift out of sync silently.

### 19. Storybook devDeps pinned to v6

`package.json` has Storybook 6.5.x — two major versions behind current (v8). Likely unused or broken.

### 20. Missing `displayName` on `React.memo` wrappers

`EducationItem`, `SectionProjectItem`, `SectionItem`, `EntryContainer`, `ProjectEntry`, and `MarkdownRenderer` are all wrapped in `React.memo` with anonymous functions. They show as "Anonymous" in React DevTools.

### 22. Hardcoded image path and caption in empty state

`src/features/site/components/HomeEmptyState.js` has a hardcoded `backgroundImage: "url(/photos/optimized/IMG_0206.jpg)"` and `"Kelowna, BC"` caption. Not data-driven.

### 23. Module-level markdown cache without eviction or dedup

`src/content/site/loaders/markdownContentLoader.js` uses a module-scoped `Map` that grows unboundedly and does not deduplicate concurrent in-flight requests for the same key.

### 24. `handleSelect` recreated on every selection change

`src/features/site/hooks/useContentMode.js` (lines 78–89) — `handleSelect` depends on `selectedId` for toggle behavior, causing a new callback on every selection. The toggle logic could be pushed to the caller.

### 25. Redundant `generateId` calls in render paths

In `src/main/Section.js`, `generateId` is called redundantly: once for the `key` prop, once inside the component body for `id`, and again inside `isChildSelected` for every project on every render. Should be computed once and passed down.

---

## Recommended Action Priority

| Priority | Action                                             | Issues   | Effort |
| -------- | -------------------------------------------------- | -------- | ------ |
| 1        | Move data out of JSX, fix dependency inversion     | #9, #10  | Medium |
| 2        | Split `PersonalImageSlicesCard` into smaller pieces | #12      | High   |
| 3        | Fix minor consistency issues                       | #13–#25  | Low    |
