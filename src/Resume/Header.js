// filepath: /Users/leoliu/Documents/code/leowrites.github.io/src/Resume/ClassicResumeHeader.js
import React from "react";
import { Box, Typography } from "@mui/material";

const ClassicResumeHeader = ({ personalInfo }) => {
  return (
    <Box sx={{ mb: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "1rem",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Hello, I'm Leo
        </Typography>
      </Box>
      {personalInfo.description.map((info, index) => {
        return (
          <Typography
            key={index}
            variant={"h6"}
            sx={{ mb: "0.5rem", color: "text.primary" }}
          >
            {info}
          </Typography>
        );
      })}
    </Box>
  );
};

export default ClassicResumeHeader;
