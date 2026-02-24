import { personalInfo } from "main/data";
import { loadSiteDataFromSanity } from "./loaders/sanitySiteDataLoader";

export const initialSiteData = {
  personalInfo,
  education: [],
  experience: [],
  projects: [],
  volunteering: [],
};

export const loadSiteData = async () => {
  const sanityData = await loadSiteDataFromSanity();

  return {
    ...initialSiteData,
    ...sanityData,
  };
};

export { personalInfo };
