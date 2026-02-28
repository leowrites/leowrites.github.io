import React from "react";
import {
  Container,
  Box,
  Breadcrumbs,
  Stack,
  IconButton,
  Typography,
  Link,
  useTheme,
  keyframes,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import { TechTagList } from "./Components";

const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/**
 * Right-column detail view (desktop split-view).
 * Handles expand/close buttons, viewTransitionName, and blog header.
 */
const DetailPane = ({
  selectedContent,
  selectedProject,
  parentItem,
  selectedItem,
  selectedId,
  onClose,
  desktopHeight,
  emptyState,
  disableContainerGutters = false,
  contentPadding,
}) => {
  const theme = useTheme();

  const breadcrumbs = ["Home"];
  const detailCaption = selectedProject?.caption || selectedItem?.caption;
  const detailTags =
    selectedProject?.tags ||
    selectedProject?.technologies ||
    selectedItem?.tags ||
    selectedItem?.technologies;
  const detailGithubLink =
    selectedProject?.githubLink || selectedItem?.githubLink;
  const currentItemLabel =
    selectedItem?.organization ||
    selectedProject?.projectName ||
    selectedItem?.title ||
    selectedItem?.institution ||
    selectedItem?.degree ||
    "Details";

  if (parentItem) {
    breadcrumbs.push(
      parentItem.organization || parentItem.title || parentItem.institution
    );
  }

  return (
    <Container
      maxWidth="xl"
      disableGutters={disableContainerGutters}
      sx={{
        width: {
          xs: "100%",
          md: "75%",
        },
        opacity: 1,
        visibility: "visible",
        transition: theme.transitions.create(["width", "opacity"], {
          duration: theme.transitions.duration.complex,
          easing: theme.transitions.easing.easeInOut,
        }),
        position: "relative",
        top: "auto",
        height: desktopHeight || "calc(100vh - 100px)",
        maxHeight: desktopHeight || "calc(100vh - 100px)",
        overflowY: "auto",
        msOverflowStyle: "none",
        borderRadius: 0,
        border: "none",
        boxShadow: 0,
        bgcolor: "transparent",
        whiteSpace: "normal",
      }}
    >
      {selectedContent ? (
        <Box
          key={selectedId || "content"}
          sx={{
            p: contentPadding !== undefined ? contentPadding : { md: 4 },
            position: "relative",
            borderRadius: "1rem",
            animation: `${fadeSlideUp} ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut} forwards`,
          }}
          style={{
            viewTransitionName: selectedProject ? "project-modal" : "none",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2, gap: 1 }}
          >
            <Breadcrumbs sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
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
                  <Typography key={i} fontSize="0.85rem" color="text.secondary">
                    {crumb}
                  </Typography>
                );
              })}
            </Breadcrumbs>
            <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
              <IconButton onClick={onClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          </Stack>
          {(detailCaption || detailTags || detailGithubLink) && (
            <Box
              sx={{
                mb: 2,
                pb: 1.5,
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              {detailCaption && (
                <Typography variant="body1" color="text.secondary">
                  {detailCaption}
                </Typography>
              )}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
                sx={{ mt: detailCaption ? 1 : 0 }}
              >
                <TechTagList technologies={detailTags} sx={{ mt: 0 }} />
                {detailGithubLink ? (
                  <Link
                    href={detailGithubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="text.secondary"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    <GitHubIcon fontSize="small" />
                  </Link>
                ) : null}
              </Stack>
            </Box>
          )}
          {selectedContent}
        </Box>
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            p: 4,
          }}
        >
          {emptyState || null}
        </Box>
      )}
    </Container>
  );
};

export default DetailPane;
