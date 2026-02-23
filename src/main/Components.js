import React, { Suspense, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Collapse,
  Link,
  Button,
  Divider,
  Tooltip,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import GitHubIcon from "@mui/icons-material/GitHub";
import { loadContentByKey } from "content/site/loaders/markdownContentLoader";

const LazyMarkdownRenderer = React.lazy(() => import("./MarkdownRendererImpl"));

const normalizeTechTags = (technologies) => {
  if (!technologies) return [];
  if (Array.isArray(technologies)) return technologies;
  if (typeof technologies === "string") {
    return technologies
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
};

export const TechTagList = ({ technologies = [], size = "small", sx }) => {
  const tags = normalizeTechTags(technologies);
  if (!tags.length) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 0.75,
        mt: 1,
        ...sx,
      }}
    >
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          size={size}
          variant="outlined"
          sx={{ borderRadius: "0.6rem" }}
        />
      ))}
    </Box>
  );
};

export const SectionHeading = ({ children, sx }) => {
  return (
    <Typography
      variant="h3"
      sx={{
        fontWeight: "bold",
        mt: "3rem",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export const EntryContainer = React.memo(
  ({
    date,
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
  }) => {
    const [expanded, setExpanded] = useState(false);
    const isSelectionMode = !!onSelect;
    const showContent = isSelectionMode ? selected : expanded;

    // Auto-expand when a child is selected (e.g. restored from blog mode)
    useEffect(() => {
      if (selected && isFolder && !expanded) {
        setExpanded(true);
      }
    }, [selected, isFolder, expanded]);

    const handleCardClick = () => {
      if (isSelectionMode) {
        onSelect();
        if (isFolder) {
          if (!expanded) {
            setExpanded(true);
          }
        }
      } else {
        setExpanded(!expanded);
      }
    };

    const handleExpandClick = (e) => {
      e.stopPropagation();
      setExpanded(!expanded);
    };

    return (
      <Box
        id={id}
        sx={(theme) => ({
          margin: "1rem 0",
          borderRadius: "1rem",
          overflow: "hidden",
          backgroundColor: showContent
            ? theme.palette.action.selected
            : theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.background.paper,
          transition: "background-color 0.2s ease",
          "&:hover": {
            backgroundColor:
              !showContent &&
              (theme.palette.mode === "light"
                ? theme.palette.grey[300]
                : theme.palette.action.hover),
          },
        })}
      >
        <Box
          onClick={handleCardClick}
          sx={(theme) => ({
            padding: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: theme.palette.text.primary,
            "& .logo-image": {
              filter: theme.palette.mode === "dark" ? "invert(1)" : "none",
              transition: "filter 0.1s ease",
            },
          })}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography>{date}</Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", display: "inline", mr: "1rem" }}
            >
              {company}
            </Typography>
            {logo && (
              <img
                src={logo}
                alt="Logo"
                className="logo-image"
                loading="lazy"
                style={{
                  display: "inline",
                  height: "1rem",
                }}
              />
            )}
            {caption && (
              <Typography sx={{ fontSize: "1rem", color: "text.secondary" }}>
                {caption}
              </Typography>
            )}
            <TechTagList technologies={technologies} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {githubLink && (
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
                    backgroundColor: "rgba(0,0,0,0.05)",
                    color: "text.primary",
                  },
                }}
              >
                <GitHubIcon sx={{ fontSize: "1.2rem" }} />
              </Box>
            )}
            {(isFolder || !isSelectionMode) && (
              <Box
                onClick={isFolder ? handleExpandClick : undefined}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.5rem",
                  borderRadius: "50%",
                  "&:hover": {
                    backgroundColor: isFolder
                      ? "rgba(0,0,0,0.05)"
                      : "transparent",
                  },
                }}
              >
                <ExpandMoreIcon
                  sx={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.1s ease",
                    color: (theme) => theme.palette.text.primary,
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
        {(isFolder || !isSelectionMode) && (
          <Collapse in={expanded} timeout={300}>
            <Divider sx={{ mb: "0.5rem", mx: "1rem" }} />
            <Box
              sx={{
                padding: "0 1rem 1rem 1rem",
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

export const ProjectEntry = React.memo(
  ({
    projectName,
    caption,
    technologies,
    onSelect,
    selected = false,
    id,
    children,
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
        sx={(theme) => ({
          borderRadius: "1rem",
          overflow: "hidden",
          backgroundColor: selected
            ? theme.palette.action.selected
            : "transparent",
          transition: "all 0.2s ease",
        })}
      >
        <Box
          onClick={handleClick}
          sx={(theme) => ({
            padding: "0.5rem 1rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "&:hover": {
              backgroundColor:
                !selected &&
                (theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.background.paper),
            },
          })}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mr: "1rem" }}
              >
                {projectName}
              </Typography>
            </Box>
            {caption && (
              <Typography variant="body2" color="text.secondary">
                {caption}
              </Typography>
            )}
            <TechTagList technologies={technologies} sx={{ mt: 0.75 }} />
          </Box>
          {isSelectionMode ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.5rem",
                borderRadius: "50%",
              }}
            >
              <ArrowForwardIcon
                sx={{
                  fontSize: "1rem",
                  color: (theme) => theme.palette.text.secondary,
                  opacity: selected ? 1 : 0.5,
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.5rem",
                borderRadius: "50%",
              }}
            >
              <ExpandMoreIcon
                sx={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  color: (theme) => theme.palette.text.primary,
                }}
              />
            </Box>
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

export const TooltipLink = ({
  href,
  tooltipText,
  children,
  variant = "text",
  icon,
  sx,
  ...props
}) => {
  const isButton = variant === "button" || variant === "outlined";

  const content = isButton ? (
    <Button
      variant="outlined"
      startIcon={icon}
      href={href}
      target="_blank"
      rel="noopener"
      disableRipple
      sx={{
        textTransform: "none",
        borderRadius: "1rem",
        fontWeight: 600,
        borderColor: "divider",
        color: "inherit",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  ) : (
    <Link
      href={href}
      color="secondary"
      underline="hover"
      target="_blank"
      rel="noopener"
      sx={sx}
      {...props}
    >
      {children}
    </Link>
  );

  if (!tooltipText) {
    return content;
  }

  return (
    <Tooltip title={tooltipText} followCursor placement="bottom">
      {content}
    </Tooltip>
  );
};

export const MarkdownRenderer = React.memo(({ content, contentKey }) => {
  const [resolvedContent, setResolvedContent] = useState(content || null);

  useEffect(() => {
    let cancelled = false;

    if (content) {
      setResolvedContent(content);
      return () => {
        cancelled = true;
      };
    }

    if (!contentKey) {
      setResolvedContent(null);
      return () => {
        cancelled = true;
      };
    }

    setResolvedContent(null);
    loadContentByKey(contentKey)
      .then((loaded) => {
        if (!cancelled) {
          setResolvedContent(loaded);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResolvedContent("");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [content, contentKey]);

  if (!content && !contentKey) return null;

  return (
    <Suspense
      fallback={
        <Typography variant="body2" color="text.secondary">
          Loading content...
        </Typography>
      }
    >
      {resolvedContent === null ? (
        <Typography variant="body2" color="text.secondary">
          Loading content...
        </Typography>
      ) : (
        <LazyMarkdownRenderer content={resolvedContent} />
      )}
    </Suspense>
  );
});
