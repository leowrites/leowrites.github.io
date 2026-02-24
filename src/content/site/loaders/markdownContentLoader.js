const contentCache = new Map();
const SANITY_API_VERSION =
  process.env.REACT_APP_SANITY_API_VERSION || "2025-01-01";
const SANITY_DATASET = process.env.REACT_APP_SANITY_DATASET || "production";
const SANITY_PROJECT_ID = process.env.REACT_APP_SANITY_PROJECT_ID;
const SANITY_USE_CDN =
  (process.env.REACT_APP_SANITY_USE_CDN || "true") === "true";

const hasSanityConfig = () => Boolean(SANITY_PROJECT_ID && SANITY_DATASET);

const buildQueryUrl = (query) => {
  const host = SANITY_USE_CDN ? "apicdn.sanity.io" : "api.sanity.io";
  const encodedQuery = encodeURIComponent(query);
  return `https://${SANITY_PROJECT_ID}.${host}/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodedQuery}`;
};

const escapeGroqString = (value) =>
  String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');

export const primeContentCache = (entries = {}) => {
  if (!entries || typeof entries !== "object") return;
  Object.entries(entries).forEach(([key, value]) => {
    if (!key || typeof value !== "string") return;
    contentCache.set(key, value);
  });
};

export const loadContentByKey = async (contentKey) => {
  if (!contentKey) return "";
  if (contentCache.has(contentKey)) return contentCache.get(contentKey);

  if (!hasSanityConfig()) {
    throw new Error("Sanity config missing for markdown loading");
  }

  const query = `*[_type == "portfolioContent" && contentKey == "${escapeGroqString(
    contentKey
  )}"][0]{markdown, body, content}`;
  const response = await fetch(buildQueryUrl(query));

  if (!response.ok) {
    throw new Error(`Failed to load markdown for key: ${contentKey}`);
  }

  const payload = await response.json();
  const result = payload?.result;
  const text = result?.markdown || result?.body || result?.content || "";
  contentCache.set(contentKey, text);
  return text;
};
