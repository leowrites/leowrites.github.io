import React, { Suspense, lazy } from "react";
import SiteHeader from "main/SiteHeader";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  personalInfo,
  education,
  experience,
  projects,
  volunteering,
} from "content/site/siteData";
import { useContentMode } from "./hooks/useContentMode";
import { useHomePageInteractions } from "./hooks/useHomePageInteractions";
import { DESKTOP_PANE_HEIGHT } from "./constants/layout";
import { generateId } from "main/utils";
import { ContentRenderer } from "main/Components";
import DetailPaneLoading from "./components/DetailPaneLoading";
import HomeEmptyState from "./components/HomeEmptyState";
import HomeSectionList from "./components/HomeSectionList";

const DetailPane = lazy(() => import("main/DetailPane"));

const ABOUT_ITEM = { title: "Leo Liu" };
const LATEST_EXPERIENCE_ID = generateId(experience[0]);

const HomePage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();

  const {
    selectedId,
    selectedProject,
    parentItem,
    selectedItem,
    handleSelect,
    parentByProjectId,
  } = useContentMode();

  const selectedContent =
    selectedItem &&
    (selectedItem.content ||
      selectedItem.contentKey ||
      selectedItem.details) ? (
      <ContentRenderer item={selectedItem} />
    ) : null;

  const {
    activeSectionId,
    isAboutSelected,
    isMobileSelectedDetailMode,
    listSelectedId,
    handleClose,
    handleSelectWithRoute,
    handleJumpToSection,
  } = useHomePageInteractions({
    matches,
    location,
    selectedId,
    selectedItem,
    handleSelect,
    parentByProjectId,
  });

  const detailPaneContent = isAboutSelected ? (
    <SiteHeader personalInfo={personalInfo} variant="detailPane" />
  ) : (
    selectedContent
  );

  return (
    <Box sx={{ textAlign: "start" }}>
      {matches ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 0,
            height: DESKTOP_PANE_HEIGHT,
            overflow: "hidden",
            borderRadius: "1rem",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            bgcolor: "background.paper",
            transition: theme.transitions.create(["gap", "height"], {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeInOut,
            }),
          }}
        >
          <Box
            sx={{
              display: "block",
              width: "25%",
              minWidth: "320px",
              maxWidth: "390px",
              height: DESKTOP_PANE_HEIGHT,
              borderRight: (theme) => `1px solid ${theme.palette.divider}`,
              transition: theme.transitions.create("width", {
                duration: theme.transitions.duration.complex,
                easing: theme.transitions.easing.easeInOut,
              }),
            }}
          >
            <Box
              sx={{
                p: 3,
                pt: 0,
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <HomeSectionList
                aboutItem={ABOUT_ITEM}
                education={education}
                experience={experience}
                volunteering={volunteering}
                projects={projects}
                selectedId={listSelectedId}
                onSelect={handleSelectWithRoute}
                activeSectionId={activeSectionId}
                onJumpToSection={handleJumpToSection}
                showSectionIndex
                folderOverviewMode={false}
              />
            </Box>
          </Box>

          <Suspense fallback={<DetailPaneLoading />}>
            <DetailPane
              isBlogMode={false}
              selectedContent={detailPaneContent}
              selectedProject={selectedProject}
              parentItem={parentItem}
              selectedItem={selectedItem}
              selectedId={selectedId}
              onClose={handleClose}
              desktopHeight={DESKTOP_PANE_HEIGHT}
              emptyState={
                <HomeEmptyState
                  latestExperienceId={LATEST_EXPERIENCE_ID}
                  onSelect={handleSelectWithRoute}
                />
              }
            />
          </Suspense>
        </Box>
      ) : isMobileSelectedDetailMode && detailPaneContent ? (
        <Suspense fallback={<DetailPaneLoading width="100%" />}>
          <DetailPane
            isBlogMode={false}
            selectedContent={detailPaneContent}
            selectedProject={selectedProject}
            parentItem={parentItem}
            selectedItem={selectedItem}
            selectedId={selectedId}
            onClose={handleClose}
            desktopHeight="auto"
            disableContainerGutters
          />
        </Suspense>
      ) : (
        <HomeSectionList
          aboutItem={ABOUT_ITEM}
          education={education}
          experience={experience}
          volunteering={volunteering}
          projects={projects}
          selectedId={listSelectedId}
          onSelect={handleSelectWithRoute}
          activeSectionId={activeSectionId}
          onJumpToSection={handleJumpToSection}
          showSectionIndex
          folderOverviewMode="selected-only"
        />
      )}
    </Box>
  );
};

export default HomePage;
