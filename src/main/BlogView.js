import React from "react";
import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { TechTagList } from "./Components";

/**
 * Blog-mode header: breadcrumbs + title + caption.
 * Used by both desktop (DetailPane) and mobile blog view.
 */
const BlogView = ({
  selectedProject,
  parentItem,
  selectedId,
  navigate,
  getBlogUrl,
  variant = "desktop",
}) => {
  if (!selectedProject) return null;

  const isDesktop = variant === "desktop";

  return (
    <Box sx={{ mb: 4 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <Link
          underline="hover"
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() =>
            navigate("/", {
              viewTransition: true,
              state: { restoreProjectId: selectedId },
            })
          }
        >
          Home
        </Link>
        {parentItem && (
          <Typography color="text.secondary">
            {parentItem.organization || parentItem.title}
          </Typography>
        )}
        <Typography color="text.primary">
          {selectedProject.projectName}
        </Typography>
      </Breadcrumbs>
      <Typography
        variant={isDesktop ? "h3" : "h4"}
        fontWeight="bold"
        gutterBottom
      >
        {selectedProject.projectName}
      </Typography>
      {selectedProject.caption && (
        <Typography
          variant={isDesktop ? "h6" : "subtitle1"}
          color="text.secondary"
        >
          {selectedProject.caption}
        </Typography>
      )}
      <TechTagList
        technologies={selectedProject.tags || selectedProject.technologies}
      />
    </Box>
  );
};

export default BlogView;
