import React from "react";
import { Box } from "@mui/material";
import { SectionHeading, EntryContainer, MarkdownRenderer } from "./Components";
import { generateId } from "./utils";

const EducationItem = React.memo(({ edu, onSelect, selectedId }) => {
  const id = generateId(edu);
  const handleSelect = React.useCallback(() => {
    if (onSelect) {
      onSelect(id, <MarkdownRenderer content={edu.content} />);
    }
  }, [id, edu.content, onSelect]);

  return (
    <EntryContainer
      id={id}
      date={edu.dates}
      company={`${edu.degree}, ${edu.institution}`}
      selected={selectedId === id}
      onSelect={onSelect ? handleSelect : undefined}
    >
      <MarkdownRenderer content={edu.content} />
    </EntryContainer>
  );
});

const ClassicEducationSection = ({ educationData, onSelect, selectedId }) => {
  return (
    <Box>
      <SectionHeading>Education</SectionHeading>
      {educationData.map((edu, index) => (
        <EducationItem
          key={index}
          edu={edu}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      ))}
    </Box>
  );
};

export default ClassicEducationSection;
