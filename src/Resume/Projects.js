import React from "react";
import { Box, Link } from "@mui/material";
import { SectionHeading, EntryContainer, EmptySectionText } from "./Components";
import { StructuredDetails } from "./StructuredDetails";

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
            <StructuredDetails details={project.details} />
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
