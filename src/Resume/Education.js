// filepath: /Users/leoliu/Documents/code/leowrites.github.io/src/Resume/ClassicEducationSection.js
import React from "react";
import { Box, Typography } from "@mui/material";
import { SectionHeading, EntryContainer } from "./Components";
import { StructuredDetails } from "./StructuredDetails";

const ClassicEducationSection = ({ educationData }) => {
  return (
    <Box>
      <SectionHeading>Education</SectionHeading>
      {educationData.map((edu, index) => (
        <EntryContainer
          key={index}
          date={edu.dates}
          company={`${edu.degree}, ${edu.institution}`}
        >
          <StructuredDetails details={edu.details} />
        </EntryContainer>
      ))}
    </Box>
  );
};

export default ClassicEducationSection;
