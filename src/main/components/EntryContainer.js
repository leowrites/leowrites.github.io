import React, { useEffect, useRef, useState } from "react";
import { Box, Collapse, Divider, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { alpha } from "@mui/material/styles";
import { TechTagList } from "./TechTagList";
import {
  IconCircle,
  getCardContainerSx,
  RotatingExpandIcon,
} from "./uiHelpers";

export const EntryContainer = React.memo(
  ({
    date,
    title,
    company,
    caption = "",
    logo,
    githubLink,
    technologies,
    children,
    onSelect,
    selected = false,
    id,
    isFolder = false,
    compact = true,
  }) => {
    const [expanded, setExpanded] = useState(false);
    const suppressAutoExpandRef = useRef(false);
    const isSelectionMode = typeof onSelect === "function";
    const canExpand = isFolder || !isSelectionMode;
    const isHighlighted = isSelectionMode ? selected : expanded;

    useEffect(() => {
      if (selected && isFolder && !expanded && !suppressAutoExpandRef.current) {
        setExpanded(true);
      }
      if (!selected) {
        suppressAutoExpandRef.current = false;
      }
    }, [selected, isFolder, expanded]);

    const handleCardClick = () => {
      if (isSelectionMode) {
        onSelect();
      }
      if (canExpand) {
        setExpanded((prev) => {
          const next = !prev;
          if (isFolder && prev && selected) {
            suppressAutoExpandRef.current = true;
          }
          return next;
        });
      }
    };

    return (
      <Box
        id={id}
        sx={getCardContainerSx({
          baseLight: (theme) => theme.palette.grey[100],
          baseDark: (theme) => theme.palette.grey[900],
          selectedLight: (theme) => theme.palette.grey[200],
          selectedDark: (theme) => alpha(theme.palette.common.white, 0.14),
          isHighlighted,
          margin: compact ? "0.25rem 0" : "1rem 0",
          compact,
        })}
      >
        <Box
          onClick={handleCardClick}
          sx={(theme) => ({
            padding: compact ? "0.55rem 0.65rem" : "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: theme.palette.text.primary,
            "& .logo-image": {
              filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
              transition: theme.transitions.create("filter", {
                duration: theme.transitions.duration.shorter,
                easing: theme.transitions.easing.easeInOut,
              }),
            },
          })}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: "block",
                fontSize: compact ? "0.68rem" : undefined,
              }}
            >
              {date}
            </Typography>
            {title ? (
              <Typography
                variant={compact ? "subtitle1" : "h6"}
                sx={{
                  fontWeight: 700,
                  display: "block",
                  lineHeight: 1.25,
                }}
              >
                {title}
              </Typography>
            ) : null}
            {company ? (
              <Typography
                variant={title ? "body2" : compact ? "subtitle1" : "h6"}
                sx={{
                  color: title ? "text.secondary" : "text.primary",
                  fontWeight: title ? 600 : 700,
                  display: "block",
                  lineHeight: 1.25,
                  mt: title ? 0.2 : 0,
                }}
              >
                {company}
              </Typography>
            ) : null}
            {!compact && caption && (
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", display: "block", mt: 0.5 }}
              >
                {caption}
              </Typography>
            )}
            {!compact && <TechTagList technologies={technologies} />}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: compact ? "0.2rem" : "0.5rem",
            }}
          >
            {!compact && githubLink && (
              <Box
                component="a"
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.5rem",
                  borderRadius: "50%",
                  color: "text.secondary",
                  "&:hover": {
                    backgroundColor: "action.hover",
                    color: "text.primary",
                  },
                }}
              >
                <GitHubIcon sx={{ fontSize: "1.2rem" }} />
              </Box>
            )}
            {canExpand && (
              <IconCircle
                sx={{
                  p: 0,
                  borderRadius: compact ? "0.45rem" : "50%",
                  "&:hover": {
                    backgroundColor: compact ? "action.hover" : "transparent",
                  },
                }}
              >
                <RotatingExpandIcon expanded={expanded} compact={compact} />
              </IconCircle>
            )}
          </Box>
        </Box>
        {canExpand && (
          <Collapse in={expanded} timeout={300}>
            <Divider
              sx={{
                mb: compact ? "0" : "0.5rem",
                mx: compact ? "0.85rem" : "1rem",
              }}
            />
            <Box
              sx={{
                padding: compact
                  ? "0 0.65rem 0.65rem 0.65rem"
                  : "0 1rem 1rem 1rem",
              }}
            >
              {children}
            </Box>
          </Collapse>
        )}
      </Box>
    );
  }
);
