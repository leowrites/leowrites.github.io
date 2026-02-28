import React from "react";
import { Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const iconCircleSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.5rem",
  borderRadius: "50%",
};

export const IconCircle = ({ children, sx }) => (
  <Box sx={{ ...iconCircleSx, ...sx }}>{children}</Box>
);

export const RotatingExpandIcon = ({ expanded, compact }) => (
  <ExpandMoreIcon
    sx={{
      transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
      transition: (theme) =>
        theme.transitions.create("transform", {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeInOut,
        }),
      color: (theme) => theme.palette.text.primary,
      fontSize: compact ? "1.05rem" : undefined,
    }}
  />
);

export const getCardContainerSx = ({
  baseLight,
  baseDark,
  selectedLight,
  selectedDark,
  isHighlighted,
  margin,
  compact = true,
}) => {
  return (theme) => {
    const resolve = (value) =>
      typeof value === "function" ? value(theme) : value;
    const baseBg =
      theme.palette.mode === "light" ? resolve(baseLight) : resolve(baseDark);
    const selectedBg =
      theme.palette.mode === "light"
        ? resolve(selectedLight)
        : resolve(selectedDark);

    return {
      ...(margin ? { margin } : {}),
      borderRadius: compact ? "0.55rem" : "1rem",
      overflow: "hidden",
      backgroundColor: compact
        ? isHighlighted
          ? selectedBg
          : "transparent"
        : isHighlighted
        ? selectedBg
        : baseBg,
      transition: theme.transitions.create(["background-color", "transform"], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut,
      }),
      "&:hover": {
        backgroundColor: compact ? theme.palette.action.hover : selectedBg,
      },
    };
  };
};
