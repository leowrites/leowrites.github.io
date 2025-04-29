// filepath: /Users/leoliu/Documents/code/leowrites.github.io/src/Resume/ClassicResumeHeader.js
import React from "react";
import { Box, Typography } from "@mui/material";

const ClassicResumeHeader = ({ personalInfo }) => {
  return (
    <Box sx={{ mb: "2rem" }}>
      <Typography
        variant="h1"
        sx={{ fontWeight: "bold", mb: "1rem", color: "#051E36" }}
      >
        Hello, I'm Leo
      </Typography>
      {personalInfo.description.map((info, index) => {
        return (
          <Typography key={index} variant={"h6"} sx={{ mb: "0.5rem" }}>
            {info}
          </Typography>
        );
      })}
    </Box>
  );
};

export default ClassicResumeHeader;
