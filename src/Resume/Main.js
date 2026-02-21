import React, { useState, useEffect } from "react";
import ResumeHeader from "./Header";
import EducationSection from "./Education";
import Section from "./Section";
import Contacts from "./Contacts";
import { Box, useTheme, useMediaQuery, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ResumeNavbar } from "./ResumeNavbar";
import {
  personalInfo,
  education,
  experience,
  projects,
  volunteering,
} from "./data";
import { StructuredDetails } from "./StructuredDetails";
import { generateId } from "./utils";

const Resume = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const languages = ["TypeScript", "Python", "C++", "Java"];
  const webFrameworks = ["React", "Node.js", "Express", "Django"];
  const fields = [
    "Backend",
    "Frontend",
    "Fullstack",
    "Machine Learning",
    "Compiler",
    "Research",
    "Leadership",
    "Project Management",
  ];
  const frameworks = ["LLVM", "sklearn", "OpenMP", "OpenMPI"];
  const tags = languages.concat(webFrameworks, fields, frameworks, languages);
  const categoryToTags = {
    Languages: languages,
    "Computing/Compiler Libraries & Frameworks": frameworks,
    "Web Frameworks": webFrameworks,
    Fields: fields,
  };
  const [selected, setSelected] = useState(tags);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // Handle deep linking on mount
  useEffect(() => {
    const hash = window.location.hash.substring(1); // remove #
    if (!hash) return;

    // Search for the item with the matching generated ID
    const allItems = [
      ...education,
      ...experience,
      ...volunteering,
      ...projects,
    ];

    // In a real app with large data this might be slow, but for a resume it's fine
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
    if (match?.details) {
      setSelectedId(hash);
      setSelectedContent(<StructuredDetails details={match.details} />);
      scrollToHash(hash);
    }
  }, []);

  const scrollToHash = (hash) => {
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  const handleSelect = (id, content) => {
    if (selectedId === id) {
      setSelectedId(null);
      setSelectedContent(null);
      window.history.replaceState(null, "", " "); // Remove hash
    } else {
      setSelectedId(id);
      setSelectedContent(content);
      window.history.replaceState(null, "", "#" + id);
    }
  };

  const handleTagClick = (tag) => {
    if (selected.includes(tag)) {
      setSelected(selected.filter((t) => t !== tag));
    } else {
      setSelected([...selected, tag]);
    }
  };
  const handleSelectAll = () => {
    if (selected.length === 0) {
      setSelected(tags);
    } else {
      setSelected([]);
    }
  };

  const filteredExperience = experience.filter((exp) =>
    exp.tags?.some((tag) => selected.includes(tag))
  );
  const filteredProjects = projects.filter((proj) =>
    proj.tags?.some((tag) => selected.includes(tag))
  );
  const filteredVolunteering = volunteering.filter((vol) =>
    vol.tags?.some((tag) => selected.includes(tag))
  );

  return (
    <>
      <ResumeNavbar
        categoryToTags={categoryToTags}
        selected={selected}
        handleTagClick={handleTagClick}
        handleSelectAll={handleSelectAll}
      />
      <Box sx={{ p: matches ? "4rem" : "1rem 0.5rem", textAlign: "start" }}>
        <ResumeHeader personalInfo={personalInfo} />
        {matches ? (
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
            {/* Left Column: List */}
            <Box
              sx={{
                width: selectedContent ? "40%" : "100%",
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
                items={filteredExperience}
                selectedId={selectedId}
                onSelect={(id, content) => handleSelect(id, content)}
              />
              <Section
                sectionTitle="Leadership"
                items={filteredVolunteering}
                selectedId={selectedId}
                onSelect={(id, content) => handleSelect(id, content)}
              />
              <Section
                sectionTitle="Projects"
                items={filteredProjects}
                selectedId={selectedId}
                onSelect={(id, content) => handleSelect(id, content)}
              />
            </Box>

            {/* Right Column: Detail View */}
            <Box
              sx={{
                width: selectedContent ? "60%" : "0%",
                opacity: selectedContent ? 1 : 0,
                visibility: selectedContent ? "visible" : "hidden",
                transition:
                  "width 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease 0.2s",
                position: "sticky",
                top: "70px",
                maxHeight: "calc(100vh - 100px)",
                overflowY: "auto",
                "&::-webkit-scrollbar": { display: "none" },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                borderRadius: "1rem",
                boxShadow: 0,
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.background.paper,
                whiteSpace: "normal", // Prevent text compression during transition
              }}
            >
              {
                // Only render content box if width > 0 to prevent layout thrashing
                selectedContent && (
                  <Box sx={{ p: 2, position: "relative" }}>
                    <IconButton
                      onClick={() => handleSelect(null, null)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    {selectedContent}
                  </Box>
                )
              }
            </Box>
          </Box>
        ) : (
          /* Mobile View: Standard Stack */
          <>
            <EducationSection educationData={education} />
            <Section sectionTitle="Experience" items={filteredExperience} />
            <Section sectionTitle="Leadership" items={filteredVolunteering} />
            <Section sectionTitle="Projects" items={filteredProjects} />
          </>
        )}
        <Contacts personalInfo={personalInfo} />
      </Box>
    </>
  );
};

export default Resume;
