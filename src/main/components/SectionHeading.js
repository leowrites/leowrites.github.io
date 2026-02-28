import React from "react";
import { Typography } from "@mui/material";

export const SectionHeading = ({ children, sx }) => {
  return (
    <Typography
      variant="h6"
      sx={(theme) => ({
        fontWeight: 700,
        color: "text.secondary",
        letterSpacing: "0.01em",
        mt: theme.spacing(2),
        mb: theme.spacing(0.75),
        pb: theme.spacing(0.5),
        borderBottom: `1px solid ${theme.palette.divider}`,
        ...sx,
      })}
    >
      {children}
    </Typography>
  );
};
