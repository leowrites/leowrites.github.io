import { TagButton } from "./Components";
import { Box, Typography, Collapse } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";

export const TagFilter = ({
  categoryToTags,
  selected,
  handleTagClick,
  handleSelectAll,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={toggleOpen}
      >
        <KeyboardArrowRightIcon
          fontSize="medium"
          sx={{
            mr: "0.5rem",
            transition: "transform 0.3s",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
        <Typography variant="h6" sx={{ textDecoration: "underline" }}>
          Project & Experience Filter
        </Typography>
      </Box>
      <Collapse
        in={isOpen}
        timeout="auto"
        sx={{
          padding: `0.5rem 1rem`,
          mb: "1rem",
          ml: "1rem",
        }}
      >
        <Box>
          <Typography
            onClick={handleSelectAll}
            selected={true}
            sx={{
              textDecoration: "underline",
              cursor: "pointer",
              display: "inline",
            }}
          >
            Select/Deselect All
          </Typography>
        </Box>
        {Object.entries(categoryToTags).map(([key, value], index) => (
          <Box key={index}>
            <Typography sx={{ mb: "0.5rem" }}>{key}</Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                mb: "1rem",
              }}
            >
              {value.map((tag, index) => (
                <TagButton
                  key={index}
                  disableRipple
                  onClick={() => handleTagClick(tag)}
                  selected={selected.includes(tag)}
                >
                  {tag}
                </TagButton>
              ))}
            </Box>
          </Box>
        ))}
      </Collapse>
    </>
  );
};
