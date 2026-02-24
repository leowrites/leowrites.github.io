import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { generateId, generateSlug } from "main/utils";
import { MarkdownRenderer } from "main/Components";
import { StructuredDetails } from "main/StructuredDetails";

export const useContentMode = ({ pageItems, projects }) => {
  const navigate = useNavigate();
  const { companySlug, projectSlug, standaloneSlug } = useParams();
  const location = useLocation();
  const isArticleMode = Boolean((companySlug && projectSlug) || standaloneSlug);
  const isStandaloneProject = Boolean(standaloneSlug && !companySlug);

  const [selectedId, setSelectedId] = useState(null);

  const renderContent = useCallback((item) => {
    return item.content || item.contentKey ? (
      <MarkdownRenderer content={item.content} contentKey={item.contentKey} />
    ) : (
      <StructuredDetails details={item.details} />
    );
  }, []);

  const {
    itemById,
    nestedProjectById,
    standaloneProjectById,
    parentByProjectId,
    companyProjectBySlug,
    standaloneBySlug,
  } = useMemo(() => {
    const byId = new Map();
    const nestedById = new Map();
    const standaloneById = new Map();
    const parentByNestedId = new Map();
    const companyProject = new Map();
    const standalone = new Map();

    for (const item of pageItems) {
      const id = generateId(item);
      byId.set(id, item);

      if (item.projects?.length) {
        const company = generateSlug(item.organization || item.title || "");
        for (const proj of item.projects) {
          const projId = generateId({
            ...proj,
            title: proj.projectName,
            organization: item.organization,
          });
          byId.set(projId, proj);
          nestedById.set(projId, proj);
          parentByNestedId.set(projId, item);
          companyProject.set(
            `${company}::${generateSlug(proj.projectName)}`,
            projId
          );
        }
      }
    }

    for (const proj of projects) {
      const standaloneId = generateId(proj);
      standalone.set(generateSlug(proj.title), standaloneId);
      byId.set(standaloneId, proj);
      standaloneById.set(standaloneId, proj);
    }

    return {
      itemById: byId,
      nestedProjectById: nestedById,
      standaloneProjectById: standaloneById,
      parentByProjectId: parentByNestedId,
      companyProjectBySlug: companyProject,
      standaloneBySlug: standalone,
    };
  }, [pageItems, projects]);

  const selectedContent = useMemo(() => {
    if (!selectedId) return null;
    const selectedItem = itemById.get(selectedId);
    if (
      !selectedItem ||
      (!selectedItem.content &&
        !selectedItem.contentKey &&
        !selectedItem.details)
    ) {
      return null;
    }
    return renderContent(selectedItem);
  }, [selectedId, itemById, renderContent]);

  const scrollToHash = (hash) => {
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const match = itemById.get(hash);
    if (match && (match.content || match.contentKey || match.details)) {
      setSelectedId(hash);
      scrollToHash(hash);
    }
  }, [itemById]);

  useEffect(() => {
    if (!companySlug || !projectSlug) return;
    window.scrollTo(0, 0);

    const projectId = companyProjectBySlug.get(
      `${companySlug}::${projectSlug}`
    );
    if (projectId) {
      setSelectedId(projectId);
    }
  }, [companySlug, projectSlug, companyProjectBySlug]);

  useEffect(() => {
    if (!standaloneSlug) return;
    window.scrollTo(0, 0);

    const projectId = standaloneBySlug.get(standaloneSlug);
    if (projectId) {
      setSelectedId(projectId);
    }
  }, [standaloneSlug, standaloneBySlug]);

  useEffect(() => {
    const restoreId = location.state?.restoreProjectId;
    if (!companySlug && !projectSlug && restoreId) {
      if (nestedProjectById.has(restoreId)) {
        setSelectedId(restoreId);
        scrollToHash(restoreId);
      }
      window.history.replaceState({}, "");
    }
  }, [location.state, companySlug, projectSlug, nestedProjectById]);

  const handleSelect = useCallback(
    (id) => {
      if (selectedId === id) {
        setSelectedId(null);
        window.history.replaceState(null, "", " ");
      } else {
        setSelectedId(id);
        window.history.replaceState(null, "", "#" + id);
      }
    },
    [selectedId]
  );

  const selectedProject = useMemo(() => {
    if (!selectedId) return null;
    const nested = nestedProjectById.get(selectedId);
    if (nested) return nested;

    const standalone = standaloneProjectById.get(selectedId);
    if (!standalone) return null;

    return {
      ...standalone,
      projectName: standalone.title,
    };
  }, [selectedId, nestedProjectById, standaloneProjectById]);

  const parentItem = useMemo(() => {
    if (!selectedProject || !nestedProjectById.has(selectedId)) return null;
    return parentByProjectId.get(selectedId) || null;
  }, [selectedProject, selectedId, parentByProjectId, nestedProjectById]);

  const selectedItem = useMemo(() => {
    if (!selectedId) return null;
    return itemById.get(selectedId) || null;
  }, [selectedId, itemById]);

  const getArticleUrl = useCallback((projName, parent) => {
    const company = generateSlug(parent?.organization || parent?.title || "");
    const project = generateSlug(projName);
    return `/experience/${company}/projects/${project}`;
  }, []);

  return {
    isArticleMode,
    isStandaloneProject,
    selectedContent,
    selectedId,
    selectedProject,
    parentItem,
    selectedItem,
    handleSelect,
    getArticleUrl,
    navigate,
  };
};
