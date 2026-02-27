import React from "react";
import { Box } from "@mui/material";
import { SectionHeading, EntryContainer, MarkdownRenderer } from "./Components";
import { generateId } from "./utils";

const EducationItem = React.memo(({ edu, onSelect, selectedId }) => {
  const id = generateId(edu);
  const handleSelect = React.useCallback(() => {
    if (onSelect) {
      onSelect(
        id,
        <MarkdownRenderer content={edu.content} contentKey={edu.contentKey} />
      );
    }
  }, [id, edu.content, edu.contentKey, onSelect]);

  return (
    <EntryContainer
      id={id}
      date={edu.dates}
      company={`${edu.degree}, ${edu.institution}`}
      selected={selectedId === id}
      onSelect={onSelect ? handleSelect : undefined}
    >
      <MarkdownRenderer content={edu.content} contentKey={edu.contentKey} />
    </EntryContainer>
  );
});

const ClassicEducationSection = ({
  educationData,
  onSelect,
  selectedId,
  sectionId,
}) => {
  return (
    <Box id={sectionId} sx={{ scrollMarginTop: "4.5rem" }}>
      <SectionHeading>Education</SectionHeading>
      {educationData.map((edu) => (
        <EducationItem
          key={generateId(edu)}
          edu={edu}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      ))}
    </Box>
  );
};

export default ClassicEducationSection;
