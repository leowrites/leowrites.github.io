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

export const RotatingExpandIcon = ({ expanded }) => (
  <ExpandMoreIcon
    sx={{
      transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
      transition: (theme) =>
        theme.transitions.create("transform", {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeInOut,
        }),
      color: (theme) => theme.palette.text.primary,
      fontSize: "1.05rem",
    }}
  />
);

export const getCardContainerSx = ({
  selectedLight,
  selectedDark,
  isHighlighted,
  margin,
}) => {
  return (theme) => {
    const resolve = (value) =>
      typeof value === "function" ? value(theme) : value;
    const selectedBg =
      theme.palette.mode === "light"
        ? resolve(selectedLight)
        : resolve(selectedDark);

    return {
      ...(margin ? { margin } : {}),
      borderRadius: "0.55rem",
      overflow: "hidden",
      backgroundColor: isHighlighted ? selectedBg : "transparent",
      transition: theme.transitions.create(["background-color", "transform"], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut,
      }),
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    };
  };
};
