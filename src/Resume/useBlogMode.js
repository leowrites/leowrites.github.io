import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { allItems } from "./Main";
import { generateId, generateSlug } from "./utils";
import { MarkdownRenderer } from "./Components";
import { StructuredDetails } from "./StructuredDetails";

/**
 * Custom hook encapsulating all blog-mode logic:
 * - Auto-selects project from URL slugs
 * - Restores selection when navigating back from blog
 * - Provides selectedProject, parentItem, getBlogUrl
 */
export const useBlogMode = () => {
  const navigate = useNavigate();
  const { companySlug, projectSlug } = useParams();
  const location = useLocation();
  const isBlogMode = Boolean(companySlug && projectSlug);

  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // Helper to render content
  const renderContent = (item) => {
    return item.content ? (
      <MarkdownRenderer content={item.content} />
    ) : (
      <StructuredDetails details={item.details} />
    );
  };

  const scrollToHash = (hash) => {
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  // Handle deep linking on mount
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    let foundItem = null;
    let foundProject = null;

    for (const item of allItems) {
      if (generateId(item) === hash) {
        foundItem = item;
        break;
      }

      const nestedProj = item.projects?.find(
        (p) =>
          generateId({
            ...p,
            title: p.projectName,
            organization: item.organization,
          }) === hash
      );

      if (nestedProj) {
        foundItem = item;
        foundProject = nestedProj;
        break;
      }
    }

    const match = foundProject || foundItem;
    if (match) {
      if (match.content || match.details) {
        setSelectedId(hash);
        setSelectedContent(renderContent(match));
        scrollToHash(hash);
      }
    }
  }, []);

  // Blog mode: auto-select the project from URL
  useEffect(() => {
    if (!companySlug || !projectSlug) return;
    window.scrollTo(0, 0);

    for (const item of allItems) {
      if (
        item.projects &&
        generateSlug(item.organization || item.title) === companySlug
      ) {
        const nestedProj = item.projects.find(
          (p) => generateSlug(p.projectName) === projectSlug
        );
        if (nestedProj) {
          const projId = generateId({
            ...nestedProj,
            title: nestedProj.projectName,
            organization: item.organization,
          });
          setSelectedId(projId);
          setSelectedContent(renderContent(nestedProj));
          break;
        }
      }
    }
  }, [companySlug, projectSlug]);

  // Restore selection when navigating back from blog mode
  useEffect(() => {
    const restoreId = location.state?.restoreProjectId;
    if (!companySlug && !projectSlug && restoreId) {
      for (const item of allItems) {
        if (item.projects) {
          const nestedProj = item.projects.find((p) => {
            const pId = generateId({
              ...p,
              title: p.projectName,
              organization: item.organization,
            });
            return pId === restoreId;
          });
          if (nestedProj) {
            setSelectedId(restoreId);
            setSelectedContent(renderContent(nestedProj));
            scrollToHash(restoreId);
            break;
          }
        }
      }
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  const handleSelect = (id, content) => {
    if (selectedId === id) {
      setSelectedId(null);
      setSelectedContent(null);
      window.history.replaceState(null, "", " ");
    } else {
      setSelectedId(id);
      setSelectedContent(content);
      window.history.replaceState(null, "", "#" + id);
    }
  };

  const selectedProject = useMemo(() => {
    if (!selectedId) return null;
    for (const item of allItems) {
      if (item.projects) {
        const nestedProj = item.projects.find(
          (p) =>
            generateId({
              ...p,
              title: p.projectName,
              organization: item.organization,
            }) === selectedId
        );
        if (nestedProj) return nestedProj;
      }
    }
    return null;
  }, [selectedId]);

  const parentItem = useMemo(() => {
    if (!selectedProject) return null;
    for (const item of allItems) {
      if (item.projects?.some((p) => p === selectedProject)) {
        return item;
      }
    }
    return null;
  }, [selectedProject]);

  const getBlogUrl = (projName, parent) => {
    const company = generateSlug(parent?.organization || parent?.title || "");
    const project = generateSlug(projName);
    return `/experience/${company}/projects/${project}`;
  };

  return {
    isBlogMode,
    selectedContent,
    selectedId,
    selectedProject,
    parentItem,
    handleSelect,
    getBlogUrl,
    navigate,
  };
};
