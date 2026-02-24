import { useEffect, useState } from "react";
import { initialSiteData, loadSiteData } from "content/site/siteData";

export const useSiteData = () => {
  const [siteData, setSiteData] = useState(initialSiteData);

  useEffect(() => {
    let cancelled = false;

    loadSiteData()
      .then((loadedData) => {
        if (!cancelled && loadedData) {
          setSiteData(loadedData);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSiteData(initialSiteData);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    siteData,
  };
};
