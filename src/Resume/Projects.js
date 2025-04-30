// filepath: /Users/leoliu/Documents/code/leowrites.github.io/src/Resume/ClassicProjectsSection.js
import React from "react";
import { Box } from "@mui/material";
import {
  SectionHeading,
  EntryContainer,
  BulletPoint,
  EmptySectionText,
} from "./Components";

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
      {projectsData.length === 0 && (
        <EmptySectionText label="No projects listed" />
      )}
    </Box>
  );
};

export default ClassicProjectsSection;
