# Sanity CMS integration for this portfolio

This project can now load entries and markdown content from Sanity at runtime.
If Sanity env vars are missing, it falls back to local static data from `src/main/data.js` and `public/content`.

## 1) Configure frontend env vars

Create `.env` from `.env.example` and set:

- `REACT_APP_SANITY_PROJECT_ID`
- `REACT_APP_SANITY_DATASET` (usually `production`)
- `REACT_APP_SANITY_API_VERSION` (keep `2025-01-01` unless needed)
- `REACT_APP_SANITY_USE_CDN` (`true` recommended)

Restart the dev server after editing env vars.

## 2) Add schemas in your Sanity Studio

Primary schema source is your Studio project at `/Users/leoliu/Documents/code/studio-leos-site/schemaTypes`:

- `portfolioItem.ts`
- `portfolioContent.ts`

They are already registered in `studio-leos-site/schemaTypes/index.ts`.

The files under `docs/sanity-schemas` are kept as reference copies only.

## 3) How to add a new experience/project entry

### Add an Experience

1. Create a new `Portfolio Item` document.
2. Set `section = experience`.
3. Fill fields (`title`, `organization`, `dates`, `location`, `tags`, etc).
4. Set `contentKey` (example: `experience/new-role-overview`).
5. Optional: add nested `projects` array items and give each nested item its own `contentKey`.
6. Publish.

For logos, prefer uploading `logoImage` in Studio. The frontend maps this to your existing logo rendering. The legacy `logo` URL field still works as fallback.

### Add a Standalone Project

1. Create a new `Portfolio Item` document.
2. Set `section = projects`.
3. Fill fields (`title`, `caption`, `technologies`, `githubLink`, etc).
4. Set `contentKey` (example: `projects/new-awesome-project`).
5. Publish.

### Add Markdown body for any entry

1. Create a new `Portfolio Content` document.
2. Set `contentKey` to match the entry’s `contentKey` exactly.
3. Put markdown in `markdown`.
4. Publish.

### Add images in markdown

You can embed images in markdown using regular Markdown syntax:

```md
![Alt text](https://cdn.sanity.io/images/<projectId>/<dataset>/<asset-file>.png)
```

The renderer also supports Sanity image asset refs directly:

```md
![Alt text](image-abc123def456-1600x900-png)
![Alt text](sanity:image-abc123def456-1600x900-png)
```

Tip: You can get the asset ref from the image field data in Studio, or use the full CDN URL if easier.

The site resolves markdown by `contentKey`; if a key is missing in Sanity, it falls back to local markdown files in `public/content`.

## 4) Current section values

Use one of these exact `section` values:

- `education`
- `experience`
- `projects`
- `volunteering`

## 5) Notes

- Ordering is controlled by `order` (ascending).
- You can keep current local content during migration and move entries gradually.
