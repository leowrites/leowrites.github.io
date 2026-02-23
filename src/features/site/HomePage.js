import React, { useState, Suspense, lazy } from "react";
import SiteHeader from "main/SiteHeader";
import EducationSection from "main/Education";
import Section from "main/Section";
import Contacts from "main/Contacts";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TopNav } from "main/TopNav";
import {
  personalInfo,
  education,
  experience,
  projects,
  volunteering,
} from "content/site/siteData";
import { TechTagList } from "main/Components";
import { useContentMode } from "./hooks/useContentMode";
import { generateSlug, generateId } from "main/utils";

const DetailPane = lazy(() => import("main/DetailPane"));
const BlogView = lazy(() => import("main/BlogView"));
const ProjectBottomSheet = lazy(() => import("main/ProjectBottomSheet"));

const HomePage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const {
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
  } = useContentMode();

  const [bottomSheetProject, setBottomSheetProject] = useState(null);

  const handleMobileStandaloneSelect = (id) => {
    const found = projects.find((p) => generateId(p) === id);
    if (found) setBottomSheetProject({ item: found, parent: null });
  };

  const handleClose = () => {
    if (isArticleMode) {
      navigate("/", {
        viewTransition: true,
        state: { restoreProjectId: selectedId },
      });
    } else {
      handleSelect(null);
    }
  };

  const handleExpand = () => {
    if (!selectedProject) return;
    const url = parentItem
      ? getArticleUrl(selectedProject.projectName, parentItem)
      : `/projects/${generateSlug(selectedProject.projectName)}`;
    navigate(url, { viewTransition: true });
  };

  const handleMobileProjectSelect = (id, content, proj, parent) => {
    if (!proj) return;
    setBottomSheetProject({ item: proj, parent });
  };

  return (
    <>
      <TopNav />
      <Box sx={{ p: matches ? "4rem" : "0 0.5rem", textAlign: "start" }}>
        {!isArticleMode && (
          <Alert
            severity="warning"
            sx={{
              mb: 2,
              borderRadius: "1rem",
              alignItems: "center",
            }}
          >
            This site is a work in progress — content and UI are actively being
            updated.
          </Alert>
        )}
        {!isArticleMode && <SiteHeader personalInfo={personalInfo} />}
        {matches ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: isArticleMode ? 0 : 4,
            }}
          >
            <Box
              sx={{
                display: isArticleMode ? "none" : "block",
                width: "35%",
                transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <EducationSection
                educationData={education}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
              <Section
                sectionTitle="Experience"
                items={experience}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
              <Section
                sectionTitle="Leadership"
                items={volunteering}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
              <Section
                sectionTitle="Projects"
                items={projects}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            </Box>

            <Suspense
              fallback={<Box sx={{ width: "65%", p: 4 }}>Loading...</Box>}
            >
              <DetailPane
                isBlogMode={isArticleMode}
                selectedContent={selectedContent}
                selectedProject={selectedProject}
                parentItem={parentItem}
                selectedItem={selectedItem}
                selectedId={selectedId}
                onClose={handleClose}
                onExpand={handleExpand}
                navigate={navigate}
                getBlogUrl={getArticleUrl}
              />
            </Suspense>
          </Box>
        ) : isArticleMode && selectedContent ? (
          <Box style={{ viewTransitionName: "project-modal" }}>
            <Box sx={{ position: "relative", pt: 1 }}>
              <IconButton
                onClick={handleClose}
                sx={{ mb: 1, pl: 0 }}
                size="small"
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              {isStandaloneProject ? (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {projects.find((p) => generateId(p) === selectedId)?.title}
                  </Typography>
                  {(() => {
                    const p = projects.find(
                      (p) => generateId(p) === selectedId
                    );
                    return (
                      <>
                        {p?.caption && (
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            {p.caption}
                          </Typography>
                        )}
                        {p?.technologies && (
                          <Typography variant="caption" color="text.disabled">
                            {p.technologies}
                          </Typography>
                        )}
                        <TechTagList
                          technologies={p?.tags || p?.technologies}
                          sx={{ mt: 1 }}
                        />
                      </>
                    );
                  })()}
                </Box>
              ) : (
                <Suspense fallback={<Box p={2}>Loading...</Box>}>
                  <BlogView
                    selectedProject={selectedProject}
                    parentItem={parentItem}
                    selectedId={selectedId}
                    navigate={navigate}
                    getBlogUrl={getArticleUrl}
                    variant="mobile"
                  />
                </Suspense>
              )}
              {selectedContent}
            </Box>
          </Box>
        ) : (
          <>
            <EducationSection educationData={education} />
            <Section
              sectionTitle="Experience"
              items={experience}
              onSelect={handleMobileProjectSelect}
              showOverviewInFolder
            />
            <Section
              sectionTitle="Leadership"
              items={volunteering}
              onSelect={handleMobileProjectSelect}
              showOverviewInFolder
            />
            <Section
              sectionTitle="Projects"
              items={projects}
              onSelect={handleMobileStandaloneSelect}
            />
          </>
        )}
        {!isArticleMode && <Contacts personalInfo={personalInfo} />}
      </Box>
      <Suspense fallback={null}>
        <ProjectBottomSheet
          project={bottomSheetProject?.item}
          open={Boolean(bottomSheetProject)}
          onClose={() => setBottomSheetProject(null)}
          onExpand={() => {
            const { item, parent } = bottomSheetProject;
            const url = item.projectName
              ? getArticleUrl(item.projectName, parent)
              : `/projects/${generateSlug(item.title)}`;
            navigate(url, { viewTransition: true });
            setBottomSheetProject(null);
          }}
        />
      </Suspense>
    </>
  );
};

export default HomePage;
