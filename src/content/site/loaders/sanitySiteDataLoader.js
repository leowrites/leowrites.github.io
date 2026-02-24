import { primeContentCache } from "./markdownContentLoader";

const SANITY_API_VERSION =
  process.env.REACT_APP_SANITY_API_VERSION || "2025-01-01";
const SANITY_DATASET = process.env.REACT_APP_SANITY_DATASET || "production";
const SANITY_PROJECT_ID = process.env.REACT_APP_SANITY_PROJECT_ID;
const SANITY_USE_CDN =
  (process.env.REACT_APP_SANITY_USE_CDN || "true") === "true";

const ITEMS_QUERY = `*[_type == "portfolioItem"] | order(order asc) {
  section,
  title,
  institution,
  organization,
  degree,
  dates,
  location,
  caption,
  technologies,
  tags,
  logo,
  logoImage {
    asset->{
      url
    }
  },
  url,
  tooltipText,
  githubLink,
  content,
  contentKey,
  projects[] {
    projectName,
    caption,
    technologies,
    tags,
    githubLink,
    content,
    contentKey
  }
}`;

const CONTENT_QUERY = `*[_type == "portfolioContent" && defined(contentKey)] {
  contentKey,
  markdown,
  body,
  content
}`;

const hasSanityConfig = () => Boolean(SANITY_PROJECT_ID && SANITY_DATASET);

const buildQueryUrl = (query) => {
  const host = SANITY_USE_CDN ? "apicdn.sanity.io" : "api.sanity.io";
  const encodedQuery = encodeURIComponent(query);
  return `https://${SANITY_PROJECT_ID}.${host}/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodedQuery}`;
};

const extractSanityResult = async (response) => {
  if (!response.ok) {
    throw new Error(`Sanity query failed with status ${response.status}`);
  }

  const payload = await response.json();
  if (!payload || !Array.isArray(payload.result)) {
    throw new Error("Invalid Sanity response shape");
  }

  return payload.result;
};

const normalizeItem = (item = {}) => {
  const normalizedProjects = Array.isArray(item.projects)
    ? item.projects.map((project) => ({
        projectName: project?.projectName || "",
        caption: project?.caption || "",
        technologies: project?.technologies || [],
        tags: project?.tags || [],
        githubLink: project?.githubLink || "",
        content: project?.content || "",
        contentKey: project?.contentKey || "",
      }))
    : [];

  return {
    title: item.title || "",
    institution: item.institution || item.organization || "",
    organization: item.organization || "",
    degree: item.degree || "",
    dates: item.dates || "",
    location: item.location || "",
    caption: item.caption || "",
    technologies: item.technologies || "",
    tags: item.tags || [],
    logo: item.logoImage?.asset?.url || item.logo || "",
    url: item.url || "",
    tooltipText: item.tooltipText || "",
    githubLink: item.githubLink || "",
    content: item.content || "",
    contentKey: item.contentKey || "",
    projects: normalizedProjects,
    section: item.section || "",
  };
};

const normalizeContentMap = (records = []) => {
  return records.reduce((acc, record) => {
    const key = record?.contentKey;
    const value = record?.markdown || record?.body || record?.content || "";
    if (key && typeof value === "string") {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export const loadSiteDataFromSanity = async () => {
  if (!hasSanityConfig()) {
    throw new Error("Sanity config missing for site data loading");
  }

  const [itemsResponse, contentResponse] = await Promise.all([
    fetch(buildQueryUrl(ITEMS_QUERY)),
    fetch(buildQueryUrl(CONTENT_QUERY)),
  ]);

  const [itemsResult, contentResult] = await Promise.all([
    extractSanityResult(itemsResponse),
    extractSanityResult(contentResponse),
  ]);

  const items = itemsResult.map(normalizeItem);
  const contentMap = normalizeContentMap(contentResult);

  primeContentCache(contentMap);

  return {
    education: items.filter((item) => item.section === "education"),
    experience: items.filter((item) => item.section === "experience"),
    projects: items.filter((item) => item.section === "projects"),
    volunteering: items.filter((item) => item.section === "volunteering"),
  };
};
