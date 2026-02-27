import React from "react";
import { Box, Button } from "@mui/material";
import Section from "main/Section";
import EducationSection from "main/Education";
import { SECTION_LINKS } from "../constants/layout";

const HomeSectionList = ({
  aboutItem,
  education,
  experience,
  volunteering,
  projects,
  selectedId,
  onSelect,
  activeSectionId,
  onJumpToSection,
  showSectionIndex = false,
  folderOverviewMode = false,
}) => {
  return (
    <>
      {showSectionIndex && (
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 2,
            py: 1,
            mb: 1,
            backgroundColor: { xs: "transparent", md: "background.paper" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              gap: 0.25,
              overflowX: "scroll",
            }}
          >
            {SECTION_LINKS.map((section) => (
              <Button
                key={section.id}
                size="small"
                variant="text"
                disableRipple
                onClick={() => onJumpToSection(section.id)}
                sx={{
                  textTransform: "none",
                  minWidth: 0,
                  flexShrink: 0,
                  px: 0.75,
                  py: 0.35,
                  borderRadius: "0.5rem",
                  color:
                    activeSectionId === section.id
                      ? "text.primary"
                      : "text.secondary",
                  fontWeight: activeSectionId === section.id ? 700 : 600,
                  whiteSpace: "nowrap",
                  opacity: activeSectionId === section.id ? 1 : 0.82,
                  "&:hover": {
                    backgroundColor: "action.hover",
                    opacity: 1,
                  },
                }}
              >
                {section.label}
              </Button>
            ))}
          </Box>
        </Box>
      )}
      <Section
        sectionTitle="About Me"
        items={[aboutItem]}
        selectedId={selectedId}
        onSelect={onSelect}
        sectionId="section-about"
      />
      <EducationSection
        educationData={education}
        selectedId={selectedId}
        onSelect={onSelect}
        sectionId="section-education"
      />
      <Section
        sectionTitle="Experience"
        items={experience}
        selectedId={selectedId}
        onSelect={onSelect}
        showOverviewInFolder={folderOverviewMode}
        sectionId="section-experience"
      />
      <Section
        sectionTitle="Leadership"
        items={volunteering}
        selectedId={selectedId}
        onSelect={onSelect}
        showOverviewInFolder={folderOverviewMode}
        sectionId="section-leadership"
      />
      <Section
        sectionTitle="Projects"
        items={projects}
        selectedId={selectedId}
        onSelect={onSelect}
        sectionId="section-projects"
      />
    </>
  );
};

export default HomeSectionList;
