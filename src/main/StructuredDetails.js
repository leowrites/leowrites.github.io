import React from "react";
import { Box, Typography } from "@mui/material";
import { MarkdownRenderer } from "./Components";
import StructuredVisual from "./StructuredVisual";

export { StructuredVisual };

export const StructuredDetails = ({ details }) => {
  return (
    <Box>
      {details?.map((section, index) => (
        <Box key={index} mb={index === details.length - 1 ? 0 : 4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {section.title}
          </Typography>
          {typeof section.content === "string" ? (
            <MarkdownRenderer content={section.content} />
          ) : (
            <Box mb={2} color="text.secondary">
              {section.content}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
