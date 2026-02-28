export const generateId = (item) => {
  if (item.id) return item.id;

  const parts = [];
  if (item.degree) parts.push(item.degree);
  if (item.institution) parts.push(item.institution);
  if (item.title) parts.push(item.title);
  if (item.organization) parts.push(item.organization);

  // Join parts, lowercase, remove special chars, replace spaces with hyphens
  return parts
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};
