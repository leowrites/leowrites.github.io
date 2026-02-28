import React from "react";
import { generateId } from "main/utils";
import { SECTION_LINKS } from "features/site/constants/layout";

const SECTION_RESTORE_KEY = "mobile-list-restore";

export const useHomePageInteractions = ({
  matches,
  location,
  selectedId,
  selectedContent,
  selectedItem,
  handleSelect,
  parentByProjectId,
}) => {
  const [activeSectionId, setActiveSectionId] = React.useState(
    SECTION_LINKS[0].id
  );
  const [mobileListSelectedId, setMobileListSelectedId] = React.useState(null);

  const hasAutoOpenedDesktopRef = React.useRef(false);
  const hasExplicitDesktopCloseRef = React.useRef(false);

  const { parentIdByNestedProjectId, parentFolderIdSet } = React.useMemo(() => {
    const idMap = new Map();
    const folderSet = new Set();
    for (const [projId, parentItem] of parentByProjectId) {
      const parentId = generateId(parentItem);
      idMap.set(projId, parentId);
      folderSet.add(parentId);
    }
    return { parentIdByNestedProjectId: idMap, parentFolderIdSet: folderSet };
  }, [parentByProjectId]);

  const isAboutSelected = selectedId === "leo-liu";
  const isMobileSelectedDetailMode =
    !matches &&
    (isAboutSelected ||
      (Boolean(selectedContent) && !selectedItem?.projects?.length));
  const isMobileListMode = !matches && !isMobileSelectedDetailMode;

  const handleClose = React.useCallback(() => {
    if (!matches && window.history.length > 1) {
      window.history.back();
      return;
    }

    if (matches) {
      hasExplicitDesktopCloseRef.current = true;
    }

    handleSelect(null, { replace: true });
  }, [handleSelect, matches]);

  const handleSelectWithRoute = React.useCallback(
    (id) => {
      if (id === null) {
        setMobileListSelectedId(null);
        handleSelect(null);
        return;
      }

      if (!matches) {
        const isParentFolder = parentFolderIdSet.has(id);

        if (isParentFolder) {
          const isAlreadyOpen = (selectedId || mobileListSelectedId) === id;
          setMobileListSelectedId(isAlreadyOpen ? null : id);
          if (selectedId) {
            handleSelect(null, { replace: true });
          }
          return;
        }

        const selected =
          id === "leo-liu" || parentIdByNestedProjectId.has(id)
            ? parentIdByNestedProjectId.get(id) || id
            : id;

        const restorePayload = {
          scrollY: window.scrollY,
          selectedId: selected,
        };
        sessionStorage.setItem(
          SECTION_RESTORE_KEY,
          JSON.stringify(restorePayload)
        );
      }

      handleSelect(id);
    },
    [
      handleSelect,
      matches,
      mobileListSelectedId,
      parentFolderIdSet,
      parentIdByNestedProjectId,
      selectedId,
    ]
  );

  React.useEffect(() => {
    if (!matches) return;
    if (hasExplicitDesktopCloseRef.current) return;
    if (location.pathname !== "/") return;

    if (selectedId) {
      hasAutoOpenedDesktopRef.current = true;
      return;
    }

    if (hasAutoOpenedDesktopRef.current) return;
    hasAutoOpenedDesktopRef.current = true;

    handleSelect("leo-liu", { replace: true });
  }, [matches, selectedId, handleSelect, location.pathname]);

  React.useEffect(() => {
    if (matches || !isMobileSelectedDetailMode) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [matches, isMobileSelectedDetailMode, selectedId]);

  React.useEffect(() => {
    if (matches || !isMobileListMode) return;

    const stored = sessionStorage.getItem(SECTION_RESTORE_KEY);
    if (!stored) return;

    try {
      const restore = JSON.parse(stored);
      setMobileListSelectedId(restore?.selectedId || null);
      requestAnimationFrame(() => {
        window.scrollTo({ top: restore?.scrollY || 0, behavior: "auto" });
      });
    } catch {
      setMobileListSelectedId(null);
    }

    sessionStorage.removeItem(SECTION_RESTORE_KEY);
  }, [matches, isMobileListMode, location.key]);

  const listSelectedId =
    !matches && isMobileListMode && !selectedId
      ? mobileListSelectedId
      : selectedId;

  const handleJumpToSection = React.useCallback((sectionId) => {
    setActiveSectionId(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return {
    activeSectionId,
    isAboutSelected,
    isMobileSelectedDetailMode,
    listSelectedId,
    handleClose,
    handleSelectWithRoute,
    handleJumpToSection,
  };
};
