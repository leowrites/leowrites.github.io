// filepath: /Users/leoliu/Documents/code/leowrites.github.io/src/Resume/ClassicProjectsSection.js
import React from "react";
import { Box } from "@mui/material";
import { SectionHeading, EntryContainer, BulletPoint } from "./Components";

const ClassicProjectsSection = ({ projectsData }) => {
  return (
    <Box>
      <SectionHeading>Projects</SectionHeading>
      {projectsData.map((project, index) => (
        <EntryContainer
          key={index}
          company={project.name}
          caption={project.description}
          isProject
        >
          {" "}
          {project.bullets.map((bullet, idx) => (
            <BulletPoint key={idx}>
              <Box mr="0.1in">•</Box>
              <Box>{bullet}</Box>
            </BulletPoint>
          ))}
        </EntryContainer>
      ))}
    </Box>
  );
};

export default ClassicProjectsSection;
