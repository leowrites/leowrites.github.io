import React, { useState, Suspense, lazy } from "react";
import ResumeHeader from "./Header";
import EducationSection from "./Education";
import Section from "./Section";
import Contacts from "./Contacts";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ResumeNavbar } from "./ResumeNavbar";
import {
  personalInfo,
  education,
  experience,
  projects,
  volunteering,
} from "./data";
import { useBlogMode } from "./useBlogMode";
import { generateSlug, generateId } from "./utils";

const DetailPane = lazy(() => import("./DetailPane"));
const BlogView = lazy(() => import("./BlogView"));
const ProjectBottomSheet = lazy(() => import("./ProjectBottomSheet"));

export const allItems = [
  ...education,
  ...experience,
  ...volunteering,
  ...projects,
];

const Resume = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const {
    isBlogMode,
    isStandaloneProject,
    selectedContent,
    selectedId,
    selectedProject,
    parentItem,
    handleSelect,
    getBlogUrl,
    navigate,
  } = useBlogMode();

  const [bottomSheetProject, setBottomSheetProject] = useState(null);

  const handleMobileStandaloneSelect = (id) => {
    const found = projects.find((p) => generateId(p) === id);
    if (found) setBottomSheetProject({ item: found, parent: null });
  };

  const handleClose = () => {
    if (isBlogMode) {
      navigate("/", {
        viewTransition: true,
        state: { restoreProjectId: selectedId },
      });
    } else {
      handleSelect(null, null);
    }
  };

  const handleExpand = () => {
    navigate(getBlogUrl(selectedProject.projectName, parentItem), {
      viewTransition: true,
    });
  };

  const handleMobileProjectSelect = (id, content, proj, parent) => {
    if (!proj) return;
    setBottomSheetProject({ item: proj, parent });
  };

  return (
    <>
      <ResumeNavbar />
      <Box sx={{ p: matches ? "4rem" : "0 0.5rem", textAlign: "start" }}>
        {!isBlogMode && <ResumeHeader personalInfo={personalInfo} />}
        {matches ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: isBlogMode ? 0 : 4,
            }}
          >
            {/* Left Column: List */}
            <Box
              sx={{
                display: isBlogMode ? "none" : "block",
                width: selectedContent ? "35%" : "100%",
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

            {/* Right Column: Detail View */}
            <Suspense
              fallback={<Box sx={{ width: "65%", p: 4 }}>Loading...</Box>}
            >
              <DetailPane
                isBlogMode={isBlogMode}
                selectedContent={selectedContent}
                selectedProject={selectedProject}
                parentItem={parentItem}
                selectedId={selectedId}
                onClose={handleClose}
                onExpand={handleExpand}
                navigate={navigate}
                getBlogUrl={getBlogUrl}
              />
            </Suspense>
          </Box>
        ) : isBlogMode && selectedContent ? (
          /* Mobile Blog View */
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
                /* Standalone project header */
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
                    getBlogUrl={getBlogUrl}
                    variant="mobile"
                  />
                </Suspense>
              )}
              {selectedContent}
            </Box>
          </Box>
        ) : (
          /* Mobile View: Standard Stack */
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
        {!isBlogMode && <Contacts personalInfo={personalInfo} />}
      </Box>
      <Suspense fallback={null}>
        <ProjectBottomSheet
          project={bottomSheetProject?.item}
          open={Boolean(bottomSheetProject)}
          onClose={() => setBottomSheetProject(null)}
          onExpand={() => {
            const { item, parent } = bottomSheetProject;
            const url = item.projectName
              ? getBlogUrl(item.projectName, parent)
              : `/projects/${generateSlug(item.title)}`;
            navigate(url, { viewTransition: true });
            setBottomSheetProject(null);
          }}
        />
      </Suspense>
    </>
  );
};

export default Resume;
