import React from "react";
import { Box } from "@mui/material";
import { SectionHeading, EntryContainer, ContentRenderer } from "./Components";
import { generateId } from "./utils";

const EducationItem = React.memo(({ edu, onSelect, selectedId }) => {
  const id = generateId(edu);
  const handleSelect = React.useCallback(() => {
    if (onSelect) {
      onSelect(id, <ContentRenderer item={edu} />);
    }
  }, [id, edu, onSelect]);

  return (
    <EntryContainer
      id={id}
      date={edu.dates}
      company={`${edu.degree}, ${edu.institution}`}
      selected={selectedId === id}
      onSelect={onSelect ? handleSelect : undefined}
    >
      <ContentRenderer item={edu} />
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
