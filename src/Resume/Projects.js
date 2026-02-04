import React from "react";
import { Box, Link } from "@mui/material";
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
      {projectsData.map((project, index) => {
        const titleContent = project.projectUrl ? (
          <Link
            href={project.projectUrl}
            target="_blank"
            rel="noopener"
            color="secondary"
            underline="hover"
            onClick={(e) => e.stopPropagation()}
          >
            {project.name}
          </Link>
        ) : (
          project.name
        );

        return (
          <EntryContainer
            key={index}
            company={titleContent}
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
        );
      })}
      {projectsData.length === 0 && (
        <EmptySectionText label="No projects listed" />
      )}
    </Box>
  );
};

export default ClassicProjectsSection;
