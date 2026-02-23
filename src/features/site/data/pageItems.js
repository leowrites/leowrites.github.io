import {
  education,
  experience,
  projects,
  volunteering,
} from "content/site/siteData";
import { buildPageItems } from "content/site/model/contentModel";

export const pageItems = buildPageItems({
  education,
  experience,
  volunteering,
  projects,
});
