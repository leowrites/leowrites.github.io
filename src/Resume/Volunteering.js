// filepath: /Users/leoliu/Documents/code/leowrites.github.io/src/Resume/ClassicExperienceSection.js
import React from "react";
import { Box } from "@mui/material";
import { SectionHeading, EntryContainer, BulletPoint } from "./Components";

const Volunteering = ({ experienceData }) => {
  return (
    <Box>
      <SectionHeading>Extracurriculars</SectionHeading>
      {experienceData.map((exp, index) => (
        <EntryContainer
          key={index}
          date={exp.dates}
          company={`${exp.title} @ ${exp.organization}`}
        >
          {exp.bullets.map((bullet, idx) => (
            <BulletPoint key={idx}>
              <Box> • {bullet}</Box>
            </BulletPoint>
          ))}
        </EntryContainer>
      ))}
    </Box>
  );
};

export default Volunteering;
