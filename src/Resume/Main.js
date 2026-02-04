import React, { useState } from "react";
import ResumeHeader from "./Header";
import EducationSection from "./Education";
import Section from "./Section";
import Contacts from "./Contacts";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { ResumeNavbar } from "./ResumeNavbar";
import {
  personalInfo,
  education,
  experience,
  projects,
  volunteering,
} from "./data";

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
      <Box sx={{ p: matches ? "1rem 4rem" : "0.5rem", textAlign: "start" }}>
        <ResumeHeader personalInfo={personalInfo} />
        <EducationSection educationData={education} />
        <Section sectionTitle="Experience" items={filteredExperience} />
        <Section sectionTitle="Leadership" items={filteredVolunteering} />
        <Section sectionTitle="Projects" items={filteredProjects} />
        <Contacts personalInfo={personalInfo} />
      </Box>
    </>
  );
};

export default Resume;
