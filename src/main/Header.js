// filepath: /Users/leoliu/Documents/code/leowrites.github.io/src/Resume/ClassicResumeHeader.js
import React from "react";
import { Box, Typography } from "@mui/material";

const SiteHeader = ({ personalInfo }) => {
  return (
    <Box sx={{ mb: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "1rem",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Hello, I'm Leo
        </Typography>
        <Box
          component="img"
          src="/IMG_1822.JPG"
          alt="Portrait of Leo"
          sx={{
            marginRight: { xs: 0, lg: "4rem" },
            width: 200,
            height: 200,
            borderRadius: "1rem",
            objectFit: "cover",
            flexShrink: 2,
          }}
        />
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

export default SiteHeader;
