export const COMING_SOON_KEY = "coming-soon";

const contentCache = new Map();

export const loadContentByKey = async (contentKey) => {
  if (!contentKey) return "";
  if (contentCache.has(contentKey)) return contentCache.get(contentKey);

  const publicUrl = process.env.PUBLIC_URL || "";
  const response = await fetch(`${publicUrl}/content/${contentKey}.md`);

  if (!response.ok) {
    throw new Error(`Failed to load content for key: ${contentKey}`);
  }

  const text = await response.text();
  contentCache.set(contentKey, text);
  return text;
};
