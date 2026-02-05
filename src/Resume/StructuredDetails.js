import React from "react";
import { Box, Typography, Button } from "@mui/material";

export const StructuredVisual = ({ src, alt, type = "image" }) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "90%" },
        borderRadius: "1rem",
        overflow: "hidden",
        mt: 2,
        mb: 2,
        mx: "auto",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {type === "image" && (
        <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
      )}
    </Box>
  );
};

export const StructuredLinksContainer = ({ children }) => {
  return (
    <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
      {children}
    </Box>
  );
};

export const StructuredLink = ({ href, icon, children }) => {
  return (
    <Button
      variant="outlined"
      startIcon={icon}
      href={href}
      target="_blank"
      rel="noopener"
      disableRipple
      sx={{
        textTransform: "none",
        borderRadius: "1rem",
        fontWeight: 600,
        borderColor: "divider",
        color: "inherit",
      }}
    >
      {children}
    </Button>
  );
};

export const StructuredDetails = ({ details }) => {
  return (
    <Box>
      {details.map((section, index) => (
        <Box key={index} mb={index === details.length - 1 ? 0 : 4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {section.title}
          </Typography>
          {typeof section.content === "string" ? (
            <Typography variant="body1" paragraph color="text.secondary">
              {section.content}
            </Typography>
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
