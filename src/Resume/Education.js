// filepath: /Users/leoliu/Documents/code/leowrites.github.io/src/Resume/ClassicEducationSection.js
import React from "react";
import { Box, Typography } from "@mui/material";
import { SectionHeading, EntryContainer } from "./Components";

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
          <Typography>Courses: {edu.courses}</Typography>
        </EntryContainer>
      ))}
    </Box>
  );
};

export default ClassicEducationSection;
