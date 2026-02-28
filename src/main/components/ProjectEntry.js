import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import { alpha } from "@mui/material/styles";
import {
  IconCircle,
  getCardContainerSx,
  RotatingExpandIcon,
} from "./uiHelpers";

export const ProjectEntry = React.memo(
  ({
    projectName,
    onSelect,
    selected = false,
    id,
    children,
    nested = false,
    isFirst = false,
  }) => {
    const [expanded, setExpanded] = useState(false);
    const isSelectionMode = typeof onSelect === "function";

    const handleClick = (e) => {
      if (isSelectionMode) {
        onSelect(e);
      } else {
        setExpanded(!expanded);
      }
    };

    return (
      <Box
        id={id}
        sx={
          nested
            ? {
                backgroundColor: "transparent",
                borderTop: isFirst
                  ? "none"
                  : (theme) => `1px solid ${theme.palette.divider}`,
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }
            : getCardContainerSx({
                selectedLight: (theme) =>
                  alpha(theme.palette.common.white, 0.7),
                selectedDark: (theme) =>
                  alpha(theme.palette.common.white, 0.16),
                isHighlighted: selected,
                margin: "0.2rem 0",
              })
        }
      >
        <Box
          onClick={handleClick}
          sx={(theme) => ({
            padding: nested ? "0.3rem 0.2rem 0.3rem 0.5rem" : "0.38rem 0.55rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderLeft: nested
              ? `2px solid ${
                  selected ? theme.palette.text.primary : "transparent"
                }`
              : "none",
          })}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant={nested ? "body2" : "body1"}
                sx={{ mr: "1rem", fontWeight: 700, lineHeight: 1.3 }}
              >
                {projectName}
              </Typography>
            </Box>
          </Box>
          {isSelectionMode ? (
            nested ? null : (
              <IconCircle sx={{ p: 0 }}>
                <ArrowForwardIcon
                  sx={{
                    fontSize: "0.82rem",
                    color: (theme) => theme.palette.text.secondary,
                    opacity: selected ? 1 : 0.5,
                  }}
                />
              </IconCircle>
            )
          ) : (
            <IconCircle>
              <RotatingExpandIcon expanded={expanded} />
            </IconCircle>
          )}
        </Box>
        {!isSelectionMode && (
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: expanded ? "1fr" : "0fr",
              transition:
                "grid-template-rows 240ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <Box sx={{ overflow: "hidden", padding: "0 1rem 1rem 1rem" }}>
              {children}
            </Box>
          </Box>
        )}
      </Box>
    );
  }
);
ProjectEntry.displayName = "ProjectEntry";
