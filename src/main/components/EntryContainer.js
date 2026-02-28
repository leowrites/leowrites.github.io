import React, { useEffect, useRef, useState } from "react";
import { Box, Collapse, Divider, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
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
    children,
    onSelect,
    selected = false,
    id,
    isFolder = false,
    animationDelay,
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
        sx={[
          getCardContainerSx({
            selectedLight: (theme) => theme.palette.grey[200],
            selectedDark: (theme) => alpha(theme.palette.common.white, 0.14),
            isHighlighted,
            margin: "0.25rem 0",
          }),
          animationDelay !== undefined && {
            animation:
              "siteItemFadeIn 280ms cubic-bezier(0.22, 1, 0.36, 1) both",
            animationDelay: `${animationDelay}ms`,
          },
        ]}
      >
        <Box
          onClick={handleCardClick}
          sx={(theme) => ({
            padding: "0.55rem 0.65rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: theme.palette.text.primary,
          })}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: "block",
                fontSize: "0.68rem",
              }}
            >
              {date}
            </Typography>
            {title ? (
              <Typography
                variant="subtitle1"
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
                variant={title ? "body2" : "subtitle1"}
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
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            {canExpand && (
              <IconCircle
                sx={{
                  p: 0,
                  borderRadius: "0.45rem",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <RotatingExpandIcon expanded={expanded} />
              </IconCircle>
            )}
          </Box>
        </Box>
        {canExpand && (
          <Collapse in={expanded} timeout={300}>
            <Divider
              sx={{
                mb: "0",
                mx: "0.85rem",
              }}
            />
            <Box
              sx={{
                padding: "0 0.65rem 0.65rem 0.65rem",
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
EntryContainer.displayName = "EntryContainer";
