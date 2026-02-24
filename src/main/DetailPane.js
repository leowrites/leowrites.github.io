import React from "react";
import {
  Box,
  Breadcrumbs,
  Stack,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullScreen from "@mui/icons-material/CloseFullscreen";
import BlogView from "./BlogView";

/**
 * Right-column detail view (desktop split-view).
 * Handles expand/close buttons, viewTransitionName, and blog header.
 */
const DetailPane = ({
  isBlogMode,
  selectedContent,
  selectedProject,
  parentItem,
  selectedItem,
  selectedId,
  onClose,
  onExpand,
  navigate,
  getBlogUrl,
  desktopHeight,
  emptyState,
}) => {
  const theme = useTheme();

  const breadcrumbs = ["Home"];
  const currentItemLabel =
    selectedProject?.projectName ||
    selectedItem?.title ||
    selectedItem?.organization ||
    selectedItem?.institution ||
    selectedItem?.degree ||
    "Details";

  if (parentItem) {
    breadcrumbs.push(
      parentItem.organization || parentItem.title || parentItem.institution
    );
  }

  return (
    <Box
      sx={{
        width: isBlogMode ? "100%" : "65%",
        opacity: 1,
        visibility: "visible",
        transition: theme.transitions.create(["width", "opacity"], {
          duration: theme.transitions.duration.complex,
          easing: theme.transitions.easing.easeInOut,
        }),
        position: "relative",
        top: "auto",
        height: isBlogMode ? "auto" : desktopHeight || "calc(100vh - 100px)",
        maxHeight: isBlogMode ? "none" : desktopHeight || "calc(100vh - 100px)",
        overflowY: isBlogMode ? "visible" : "auto",
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        borderRadius: "1rem",
        border: !isBlogMode && `1px solid ${theme.palette.divider}`,
        boxShadow: 0,
        bgcolor: isBlogMode ? "transparent" : "background.paper",
        whiteSpace: "normal",
      }}
    >
      {selectedContent ? (
        <Box
          sx={{
            p: !isBlogMode && 4,
            position: "relative",
            borderRadius: "1rem",
          }}
          style={{
            viewTransitionName: selectedProject ? "project-modal" : "none",
          }}
        >
          {!isBlogMode && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2, gap: 1 }}
            >
              <Breadcrumbs
                sx={{ color: "text.secondary", fontSize: "0.85rem" }}
              >
                {[...breadcrumbs, currentItemLabel].map((crumb, i, arr) => {
                  const isLast = i === arr.length - 1;
                  return isLast ? (
                    <Typography
                      key={i}
                      fontSize="0.85rem"
                      color="text.primary"
                      fontWeight="bold"
                    >
                      {crumb}
                    </Typography>
                  ) : (
                    <Typography
                      key={i}
                      fontSize="0.85rem"
                      color="text.secondary"
                    >
                      {crumb}
                    </Typography>
                  );
                })}
              </Breadcrumbs>
              <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                {selectedProject && (
                  <IconButton onClick={onExpand} size="small">
                    <OpenInFullIcon fontSize="small" />
                  </IconButton>
                )}
                <IconButton onClick={onClose} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>
            </Stack>
          )}
          {isBlogMode && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 1,
              }}
            >
              <IconButton onClick={onClose}>
                <CloseFullScreen />
              </IconButton>
            </Box>
          )}
          {isBlogMode && (
            <BlogView
              selectedProject={selectedProject}
              parentItem={parentItem}
              selectedId={selectedId}
              navigate={navigate}
              getBlogUrl={getBlogUrl}
              variant="desktop"
            />
          )}
          {selectedContent}
        </Box>
      ) : (
        !isBlogMode && (
          <Box
            sx={{
              height: "fit-content",
              p: 4,
            }}
          >
            {emptyState || null}
          </Box>
        )
      )}
    </Box>
  );
};

export default DetailPane;
