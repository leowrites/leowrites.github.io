// filepath: /Users/leoliu/Documents/code/leowrites.github.io/src/Resume/ClassicExperienceSection.js
import React from "react";
import { Box } from "@mui/material";
import { SectionHeading, EntryContainer, BulletPoint } from "./Components";

const ClassicExperienceSection = ({ experienceData }) => {
  return (
    <Box>
      <SectionHeading>Experience</SectionHeading>
      {experienceData.map((exp, index) => (
        <EntryContainer
          key={index}
          date={exp.dates}
          company={`${exp.title} @ ${exp.organization}`}
          caption={exp.caption || ""}
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

export default ClassicExperienceSection;
