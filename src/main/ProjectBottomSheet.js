import React, { useRef } from "react";
import { Box, Divider, Drawer, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { useTheme } from "@mui/material/styles";
import { MarkdownRenderer, TechTagList } from "./Components";

const ProjectBottomSheet = ({ project, open, onClose, onExpand }) => {
  const theme = useTheme();
  // Keep last project alive during exit animation so content doesn't vanish mid-slide
  const lastProject = useRef(null);
  if (project) lastProject.current = project;
  const displayProject = lastProject.current;

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      transitionDuration={{
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
      }}
      SlideProps={{
        easing: {
          enter: theme.transitions.easing.sharp,
          exit: theme.transitions.easing.easeOut,
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "1rem 1rem 0 0",
          maxHeight: "75vh",
          p: 2.5,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {displayProject && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
              flexShrink: 0,
            }}
          >
            <Box sx={{ flex: 1, pr: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {displayProject.projectName || displayProject.title}
              </Typography>
              {displayProject.caption && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {displayProject.caption}
                </Typography>
              )}
              <TechTagList
                technologies={
                  displayProject.tags || displayProject.technologies
                }
                sx={{ mt: 0.5 }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
              <IconButton onClick={onExpand} size="small" aria-label="expand">
                <OpenInFullIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={onClose} size="small" aria-label="close">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ mb: 1, flexShrink: 0 }} />

          {/* Scrollable content */}
          <Box sx={{ overflowY: "auto", flex: 1 }}>
            {(displayProject.content || displayProject.contentKey) && (
              <MarkdownRenderer
                content={displayProject.content}
                contentKey={displayProject.contentKey}
              />
            )}
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default ProjectBottomSheet;
