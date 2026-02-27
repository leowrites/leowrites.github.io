import React, { useState } from "react";
import { Box, Collapse, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import { alpha } from "@mui/material/styles";
import { TechTagList } from "./TechTagList";
import { IconCircle, getCardContainerSx } from "./uiHelpers";

export const ProjectEntry = React.memo(
  ({
    projectName,
    caption,
    technologies,
    onSelect,
    selected = false,
    id,
    children,
    compact = true,
    nested = false,
    isFirst = false,
  }) => {
    const [expanded, setExpanded] = useState(false);
    const isSelectionMode = !!onSelect;

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
          compact && nested
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
                baseLight: (theme) => alpha(theme.palette.common.white, 0.4),
                baseDark: (theme) => alpha(theme.palette.common.white, 0.06),
                selectedLight: (theme) =>
                  alpha(theme.palette.common.white, 0.7),
                selectedDark: (theme) =>
                  alpha(theme.palette.common.white, 0.16),
                isHighlighted: selected,
                margin: compact ? "0.2rem 0" : undefined,
                compact,
              })
        }
      >
        <Box
          onClick={handleClick}
          sx={(theme) => ({
            padding:
              compact && nested
                ? "0.3rem 0.2rem 0.3rem 0.5rem"
                : compact
                ? "0.38rem 0.55rem"
                : "0.5rem 1rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderLeft:
              compact && nested
                ? `${selected ? 2 : 0}px solid ${theme.palette.text.primary}`
                : "none",
          })}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant={
                  compact && nested ? "body2" : compact ? "body1" : "subtitle1"
                }
                sx={{ mr: "1rem", fontWeight: 700, lineHeight: 1.3 }}
              >
                {projectName}
              </Typography>
            </Box>
            {!compact && caption && (
              <Typography variant="body2" color="text.secondary">
                {caption}
              </Typography>
            )}
            {!compact && <TechTagList technologies={technologies} />}
          </Box>
          {isSelectionMode ? (
            compact && nested ? null : (
              <IconCircle sx={compact ? { p: 0 } : undefined}>
                <ArrowForwardIcon
                  sx={{
                    fontSize: compact ? "0.82rem" : "1rem",
                    color: (theme) => theme.palette.text.secondary,
                    opacity: selected ? 1 : 0.5,
                  }}
                />
              </IconCircle>
            )
          ) : (
            <IconCircle>
              <ExpandMoreIcon
                sx={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: (theme) =>
                    theme.transitions.create("transform", {
                      duration: theme.transitions.duration.standard,
                      easing: theme.transitions.easing.easeInOut,
                    }),
                  color: (theme) => theme.palette.text.primary,
                }}
              />
            </IconCircle>
          )}
        </Box>
        {!isSelectionMode && (
          <Collapse in={expanded} timeout={300}>
            <Box sx={{ padding: "0 1rem 1rem 1rem" }}>{children}</Box>
          </Collapse>
        )}
      </Box>
    );
  }
);
