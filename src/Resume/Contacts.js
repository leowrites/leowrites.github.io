// filepath: /Users/leoliu/Documents/code/leowrites.github.io/src/Resume/ClassicSkillsSection.js
import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { SectionHeading } from "./Components";

const Contacts = ({ personalInfo }) => {
  return (
    <Box>
      <SectionHeading>Contacts</SectionHeading>
      <Box sx={{ ml: "1rem" }}>
        <Link
          sx={{ color: "#000", textDecoration: "underline" }}
          href={`mailto:${personalInfo.email}`}
          target="_blank"
        >
          <Typography>Email</Typography>
        </Link>
        <Link
          sx={{ color: "#000", textDecoration: "underline" }}
          href={`https://${personalInfo.linkedin}`}
          target="_blank"
        >
          <Typography>LinkedIn</Typography>
        </Link>
        <Link
          sx={{ color: "#000", textDecoration: "underline" }}
          href={`https://${personalInfo.github}`}
          target="_blank"
        >
          <Typography>GitHub</Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default Contacts;
