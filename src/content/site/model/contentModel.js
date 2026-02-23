export const buildPageItems = ({
  education = [],
  experience = [],
  volunteering = [],
  projects = [],
}) => {
  return [...education, ...experience, ...volunteering, ...projects];
};
