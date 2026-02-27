import React from "react";
import { Box, Chip } from "@mui/material";

const normalizeTechTags = (technologies) => {
  if (!technologies) return [];
  if (Array.isArray(technologies)) return technologies;
  if (typeof technologies === "string") {
    return technologies
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
};

export const TechTagList = ({ technologies = [], size = "small", sx }) => {
  const tags = normalizeTechTags(technologies);
  if (!tags.length) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 0.75,
        mt: 1,
        ...sx,
      }}
    >
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          size={size}
          variant="outlined"
          sx={{
            borderRadius: "0.6rem",
            borderColor: "divider",
            color: "text.secondary",
            fontWeight: 500,
          }}
        />
      ))}
    </Box>
  );
};
