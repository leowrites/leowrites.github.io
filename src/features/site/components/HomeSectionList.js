import React from "react";
import { Box, Button } from "@mui/material";
import Section from "main/Section";
import {
  education,
  experience,
  projects,
  volunteering,
} from "content/site/siteData";
import {
  SECTION_LINKS,
  SECTION_ABOUT_ID,
  SECTION_EDUCATION_ID,
  SECTION_EXPERIENCE_ID,
  SECTION_LEADERSHIP_ID,
  SECTION_PROJECTS_ID,
  ABOUT_ID,
} from "../constants/layout";

const ABOUT_ITEM = { title: "Leo Liu", id: ABOUT_ID };

const HomeSectionList = ({
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
              overflowX: "auto",
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
                  backgroundColor:
                    activeSectionId === section.id
                      ? "action.selected"
                      : "transparent",
                  transition: (theme) =>
                    theme.transitions.create(
                      ["background-color", "color", "opacity"],
                      {
                        duration: theme.transitions.duration.shorter,
                        easing: theme.transitions.easing.easeInOut,
                      }
                    ),
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
        items={[ABOUT_ITEM]}
        selectedId={selectedId}
        onSelect={onSelect}
        sectionId={SECTION_ABOUT_ID}
      />
      <Section
        sectionTitle="Education"
        items={education}
        selectedId={selectedId}
        onSelect={onSelect}
        sectionId={SECTION_EDUCATION_ID}
      />
      <Section
        sectionTitle="Experience"
        items={experience}
        selectedId={selectedId}
        onSelect={onSelect}
        showOverviewInFolder={folderOverviewMode}
        sectionId={SECTION_EXPERIENCE_ID}
      />
      <Section
        sectionTitle="Leadership"
        items={volunteering}
        selectedId={selectedId}
        onSelect={onSelect}
        showOverviewInFolder={folderOverviewMode}
        sectionId={SECTION_LEADERSHIP_ID}
      />
      <Section
        sectionTitle="Projects"
        items={projects}
        selectedId={selectedId}
        onSelect={onSelect}
        sectionId={SECTION_PROJECTS_ID}
      />
    </>
  );
};

export default HomeSectionList;
