// filepath: /Users/leoliu/Documents/code/leowrites.github.io/src/Resume/ClassicResumeHeader.js
import React, { useContext } from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../theme";

const ClassicResumeHeader = ({ personalInfo }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

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
        <IconButton
          onClick={colorMode.toggleColorMode}
          color="inherit"
          sx={{ ml: 2 }}
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
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
