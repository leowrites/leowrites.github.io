import React from "react";
import ResumeHeader from "./Header";
import EducationSection from "./Education";
import Section from "./Section";
import Contacts from "./Contacts";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ResumeNavbar } from "./ResumeNavbar";
import {
  personalInfo,
  education,
  experience,
  projects,
  volunteering,
} from "./data";
import { useBlogMode } from "./useBlogMode";
import DetailPane from "./DetailPane";
import BlogView from "./BlogView";

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
    selectedContent,
    selectedId,
    selectedProject,
    parentItem,
    handleSelect,
    getBlogUrl,
    navigate,
  } = useBlogMode();

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
    const url = getBlogUrl(proj.projectName, parent);
    navigate(url, { viewTransition: true });
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
                onSelect={(id, content) => handleSelect(id, content)}
              />
              <Section
                sectionTitle="Experience"
                items={experience}
                selectedId={selectedId}
                onSelect={(id, content) => handleSelect(id, content)}
              />
              <Section
                sectionTitle="Leadership"
                items={volunteering}
                selectedId={selectedId}
                onSelect={(id, content) => handleSelect(id, content)}
              />
              <Section
                sectionTitle="Projects"
                items={projects}
                selectedId={selectedId}
                onSelect={(id, content) => handleSelect(id, content)}
              />
            </Box>

            {/* Right Column: Detail View */}
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
          </Box>
        ) : isBlogMode && selectedContent ? (
          /* Mobile Blog View */
          <Box style={{ viewTransitionName: "project-modal" }}>
            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
              >
                <CloseIcon />
              </IconButton>
              <BlogView
                selectedProject={selectedProject}
                parentItem={parentItem}
                selectedId={selectedId}
                navigate={navigate}
                getBlogUrl={getBlogUrl}
                variant="mobile"
              />
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
            />
            <Section
              sectionTitle="Leadership"
              items={volunteering}
              onSelect={handleMobileProjectSelect}
            />
            <Section
              sectionTitle="Projects"
              items={projects}
              onSelect={handleMobileProjectSelect}
            />
          </>
        )}
        {!isBlogMode && <Contacts personalInfo={personalInfo} />}
      </Box>
    </>
  );
};

export default Resume;
