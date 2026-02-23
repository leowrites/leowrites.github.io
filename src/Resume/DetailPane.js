import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
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
  selectedId,
  onClose,
  onExpand,
  navigate,
  getBlogUrl,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: isBlogMode ? "100%" : selectedContent ? "70%" : "0%",
        opacity: selectedContent || isBlogMode ? 1 : 0,
        visibility: selectedContent || isBlogMode ? "visible" : "hidden",
        transition:
          "width 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease 0.2s",
        position: isBlogMode ? "relative" : "sticky",
        top: isBlogMode ? "auto" : "70px",
        maxHeight: isBlogMode ? "none" : "calc(100vh - 100px)",
        overflowY: isBlogMode ? "visible" : "auto",
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        borderRadius: "1rem",
        boxShadow: 0,
        bgcolor: isBlogMode
          ? "transparent"
          : (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.background.paper,
        whiteSpace: "normal",
      }}
    >
      {selectedContent && (
        <Box
          sx={{
            p: !isBlogMode && 4,
            position: "relative",
            borderRadius: "1rem",
            backgroundColor: isBlogMode
              ? "transparent"
              : theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.background.paper,
            height: "100%",
          }}
          style={{
            viewTransitionName: selectedProject ? "project-modal" : "none",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
              display: "flex",
              gap: 1,
            }}
          >
            {selectedProject && !isBlogMode && (
              <IconButton onClick={onExpand}>
                <OpenInFullIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton onClick={onClose}>
              {isBlogMode ? <CloseFullScreen /> : <CloseIcon />}
            </IconButton>
          </Box>
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
      )}
    </Box>
  );
};

export default DetailPane;
