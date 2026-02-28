import { useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pageItems } from "features/site/data/pageItems";
import { projects } from "content/site/siteData";
import { generateId } from "main/utils";
import { ContentRenderer } from "main/Components";

export const useContentMode = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const selectedId = itemId || null;

  const renderContent = useCallback((item) => {
    return <ContentRenderer item={item} />;
  }, []);

  const {
    itemById,
    nestedProjectById,
    standaloneProjectById,
    parentByProjectId,
  } = useMemo(() => {
    const byId = new Map();
    const nestedById = new Map();
    const standaloneById = new Map();
    const parentByNestedId = new Map();

    for (const item of pageItems) {
      const id = generateId(item);
      byId.set(id, item);

      if (item.projects?.length) {
        for (const proj of item.projects) {
          const projId = generateId({
            ...proj,
            title: proj.projectName,
            organization: item.organization,
          });
          byId.set(projId, proj);
          nestedById.set(projId, proj);
          parentByNestedId.set(projId, item);
        }
      }
    }

    for (const proj of projects) {
      const standaloneId = generateId(proj);
      byId.set(standaloneId, proj);
      standaloneById.set(standaloneId, proj);
    }

    return {
      itemById: byId,
      nestedProjectById: nestedById,
      standaloneProjectById: standaloneById,
      parentByProjectId: parentByNestedId,
    };
  }, []);

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

  const handleSelect = useCallback(
    (id, options = {}) => {
      const { replace = false } = options;
      if (id === null) {
        navigate("/", { replace });
      } else if (selectedId === id) {
        navigate("/", { replace });
      } else {
        navigate(`/item/${id}`, { replace });
      }
    },
    [navigate, selectedId]
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

  return {
    selectedContent,
    selectedId,
    selectedProject,
    parentItem,
    selectedItem,
    handleSelect,
    parentByProjectId,
  };
};
