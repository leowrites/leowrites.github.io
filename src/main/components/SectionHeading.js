import React from "react";
import { Typography } from "@mui/material";

export const SectionHeading = ({ children, sx, compact = true }) => {
  return (
    <Typography
      variant="h6"
      sx={(theme) => ({
        fontWeight: compact ? 700 : 800,
        color: compact ? "text.secondary" : "text.primary",
        letterSpacing: compact ? "0.01em" : "0",
        mt: compact ? theme.spacing(2) : theme.spacing(4),
        mb: compact ? theme.spacing(0.75) : theme.spacing(1.5),
        pb: compact ? theme.spacing(0.5) : theme.spacing(0.75),
        borderBottom: `1px solid ${theme.palette.divider}`,
        ...sx,
      })}
    >
      {children}
    </Typography>
  );
};
