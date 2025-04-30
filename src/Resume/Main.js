// filepath: /Users/leoliu/Documents/code/leowrites.github.io/src/Resume/Resume.js
import React, { useState } from "react";
import ResumeHeader from "./Header";
import EducationSection from "./Education";
import ExperienceSection from "./Experience";
import ProjectsSection from "./Projects";
import Volunteering from "./Volunteering";
import Contacts from "./Contacts";
import { TagButton } from "./Components";
import {
  Box,
  useTheme,
  useMediaQuery,
  Button,
  Typography,
} from "@mui/material";
import {
  personalInfo,
  education,
  experience,
  projects,
  volunteering,
} from "./data";

const TagFilter = ({
  categoryToTags,
  selected,
  handleTagClick,
  handleSelectAll,
}) => {
  return (
    <>
      <Box>
        <Typography variant="h6" sx={{ mr: "1rem", display: "inline" }}>
          Filter experience & projects by tags:
        </Typography>
        <Typography
          onClick={handleSelectAll}
          selected={true}
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
            display: "inline",
          }}
        >
          Select/Deselect All
        </Typography>
      </Box>
      {Object.entries(categoryToTags).map(([key, value], index) => (
        <Box key={index}>
          <Typography sx={{ mb: "0.5rem" }}>{key}</Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              mb: "1rem",
            }}
          >
            {value.map((tag, index) => (
              <TagButton
                key={index}
                disableRipple
                onClick={() => handleTagClick(tag)}
                selected={selected.includes(tag)}
              >
                {tag}
              </TagButton>
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
};

const Resume = () => {
  // Mock data - replace with your actual data
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const languages = ["TypeScript", "Python", "C++", "JavaScript", "Java"];
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
    "Computing Libraries & Frameworks": frameworks,
    "Web Frameworks": webFrameworks,
    Fields: fields,
  };
  const [selected, setSelected] = useState(tags);
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
    <Box sx={{ p: matches ? "4rem" : "4rem 1rem", textAlign: "start" }}>
      <ResumeHeader personalInfo={personalInfo} />
      <TagFilter
        categoryToTags={categoryToTags}
        selected={selected}
        handleTagClick={handleTagClick}
        handleSelectAll={handleSelectAll}
      />
      <EducationSection educationData={education} />
      <ExperienceSection experienceData={filteredExperience} />
      <ProjectsSection projectsData={filteredProjects} />
      <Volunteering experienceData={filteredVolunteering} />
      <Contacts personalInfo={personalInfo} />
    </Box>
  );
};

export default Resume;
