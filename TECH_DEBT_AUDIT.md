# Tech Debt Audit — Portfolio Codebase

**Date:** February 27, 2026  
**Scope:** Full codebase review of `leowrites.github.io`

## Architecture Overview

The app is a CRA-based React 18 SPA using MUI, react-router-dom v7, react-markdown, and GSAP. It renders a personal portfolio with a left sidebar / right detail pane layout. Content is loaded from static markdown files via `fetch`.

---

## P0 — Bugs / Critical Issues

### 1. Misleading filepath comment in `Header.js`

**File:** `src/main/Header.js` (line 1)

Line 1 reads `// filepath: .../src/Resume/ClassicResumeHeader.js` — a stale comment from a previous file location. The actual exported component is named `SiteHeader`, but the file is `Header.js`. Meanwhile `SiteHeader.js` is a one-line re-export of `./Header`. This indirection is confusing: two files to find one component, with a misleading comment suggesting a third path. Should be a single file named `SiteHeader.js`.

### 2. Theme toggle overridden by system preference

**File:** `src/theme.js`

```js
const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");
React.useEffect(() => { setMode(prefersDarkMode ? ...); }, [prefersDarkMode]);
```

If the user manually toggles the mode, the `useEffect` snaps it back whenever `prefers-color-scheme` re-fires (e.g. OS focus change). Need a `hasManuallyToggled` ref to gate the effect.

### 3. Dead ternary in Header.js

**File:** `src/main/Header.js` (line 39)

```js
variant={isDetailPane ? "h1" : "h1"}
```

The ternary always resolves to `"h1"` — dead branching that suggests an incomplete refactor.

---

## P1 — Duplicated Logic (High-Impact)

### 4. Parent/project ID mapping computed three separate times

The same iteration pattern — loop over `experience`/`volunteering`, call `generateId({...proj, title: proj.projectName, organization: item.organization})` — appears in:

- `src/features/site/hooks/useContentMode.js` (lines 30–57): builds `itemById`, `nestedProjectById`, `parentByProjectId`
- `src/features/site/hooks/useHomePageInteractions.js` (lines 30–50): builds `parentIdByNestedProjectId`
- `src/features/site/hooks/useHomePageInteractions.js` (lines 52–59): builds `parentFolderIdSet`

All three could be one shared lookup computed once and passed through.

### 5. Content rendering branch duplicated 4+ times

This exact pattern is repeated across `useContentMode.js`, `Section.js` (twice), and `Education.js`:

```jsx
item.content || item.contentKey ? (
  <MarkdownRenderer content={item.content} contentKey={item.contentKey} />
) : (
  <StructuredDetails details={item.details} />
);
```

Should be extracted into a `<ContentRenderer item={item} />` component.

### 6. `tags || technologies` fallback repeated

`item.tags || item.technologies` appears in `Section.js` (lines 44 and 128) and a 4-way fallback chain in `DetailPane.js`. The data layer uses both `tags` (array) and `technologies` (string) for the same concept. Should be normalized to a single field name at the data layer.

### 7. `EntryContainer` and `ProjectEntry` — duplicated expand/collapse card pattern

Both components independently implement: `useState(false)` for expand, `Collapse` with `timeout={300}`, `ExpandMoreIcon` with rotation, `getCardContainerSx` from `uiHelpers`, `TechTagList`, and compact mode gating. ~60% structural overlap that should be a shared base component.

### 8. `Education.js` is a simplified copy of `Section.js`

Same `generateId` → `EntryContainer` → `MarkdownRenderer` pattern. Education items could flow through `Section` with the right data shape rather than maintaining a parallel component.

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

## P3 — Dead Code & Unused Exports

| What                                                                               | Where                                                                              |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `generateSlug` — exported but never imported                                       | `src/main/utils.js` (line 17)                                                      |
| `logo` prop — accepted but never rendered                                          | `src/main/components/EntryContainer.js`                                            |
| `compact={false}` — no caller ever passes it, making all non-compact branches dead | `EntryContainer`, `ProjectEntry`, `SectionHeading`                                 |
| `StructuredVisual` re-exported from `StructuredDetails.js`                         | `src/main/StructuredDetails.js` (line 6) — every consumer already imports directly |
| `type` prop on `StructuredVisual` — only `"image"` is handled                      | `src/main/StructuredVisual.js` (line 4)                                            |
| `useState`, `useEffect` imported but unused                                        | `src/features/site/hooks/useContentMode.js` (line 1)                               |
| `buildPageItems` — trivial array concat, over-abstraction                          | `src/content/site/model/contentModel.js`                                           |

---

## P3 — Consistency & Minor Issues

### 13. Inconsistent default vs named exports

`DetailPane`, `Section`, `Education` use default exports; `EntryContainer`, `TechTagList`, `StructuredDetails` use named exports. Makes imports unpredictable across the codebase.

### 14. `"leo-liu"` hardcoded magic string

Appears in 3 places in `src/features/site/hooks/useHomePageInteractions.js`. Should be a constant derived from `generateId(ABOUT_ITEM)`.

### 15. Section IDs duplicated between constants and JSX

`src/features/site/constants/layout.js` defines section IDs. `src/features/site/components/HomeSectionList.js` hardcodes the same strings as props. They can drift out of sync silently.

### 16. `keyframes` defined in render body

`src/main/DetailPane.js` (lines 22–25) creates `fadeSlideUp` on every render. MUI's `keyframes` returns a new object each time. Move it outside the component.

### 17. Inconsistent truthiness checks for `onSelect`

`EntryContainer` uses `typeof onSelect === "function"` while `ProjectEntry` uses `!!onSelect`. Could lead to subtle bugs if a truthy non-function is ever passed.

### 18. `overflowX: "scroll"` instead of `"auto"`

`src/features/site/components/HomeSectionList.js` (line 41) — always shows a scrollbar on some OS/browser combinations even when content fits.

### 19. Storybook devDeps pinned to v6

`package.json` has Storybook 6.5.x — two major versions behind current (v8). Likely unused or broken.

### 20. Missing `displayName` on `React.memo` wrappers

`EducationItem`, `SectionProjectItem`, `SectionItem`, `EntryContainer`, `ProjectEntry`, and `MarkdownRenderer` are all wrapped in `React.memo` with anonymous functions. They show as "Anonymous" in React DevTools.

### 21. Redundant `typography.h6` spread in `SectionHeading`

`src/main/components/SectionHeading.js` spreads `theme.typography.h6` on a component that already has `variant="h6"`, applying the same styles twice.

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

| Priority | Action                                                | Issues   | Effort |
| -------- | ----------------------------------------------------- | -------- | ------ |
| 1        | Consolidate project ID mapping into shared utility    | #4       | Medium |
| 2        | Extract `ContentRenderer` component                   | #5       | Low    |
| 3        | Move data out of JSX, fix dependency inversion        | #9, #10  | Medium |
| 4        | Fix theme toggle bug                                  | #2       | Low    |
| 5        | Split `PersonalImageSlicesCard` into smaller pieces   | #12      | High   |
| 6        | Delete dead code (unused exports, props, imports)     | P3 table | Low    |
| 7        | Extract shared expandable card base component         | #7       | Medium |
| 8        | Normalize `tags`/`technologies` at data layer         | #6       | Low    |
| 9        | Consolidate `Header.js`/`SiteHeader.js` into one file | #1       | Low    |
| 10       | Fix minor consistency issues                          | #13–#25  | Low    |
