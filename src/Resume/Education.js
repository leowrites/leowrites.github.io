import React from "react";
import { Box } from "@mui/material";
import { SectionHeading, EntryContainer, MarkdownRenderer } from "./Components";
import { generateId } from "./utils";

const ClassicEducationSection = ({ educationData, onSelect, selectedId }) => {
  return (
    <Box>
      <SectionHeading>Education</SectionHeading>
      {educationData.map((edu, index) => {
        const id = generateId(edu);
        return (
          <EntryContainer
            key={index}
            id={id}
            date={edu.dates}
            company={`${edu.degree}, ${edu.institution}`}
            selected={selectedId === id}
            onSelect={
              onSelect
                ? () => onSelect(id, <MarkdownRenderer content={edu.content} />)
                : undefined
            }
          >
            <MarkdownRenderer content={edu.content} />
          </EntryContainer>
        );
      })}
    </Box>
  );
};

export default ClassicEducationSection;
