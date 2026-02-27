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
import { alpha } from "@mui/material/styles";
import { loadContentByKey } from "content/site/loaders/markdownContentLoader";

const LazyMarkdownRenderer = React.lazy(() => import("./MarkdownRendererImpl"));

const iconCircleSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.5rem",
  borderRadius: "50%",
};

const IconCircle = ({ children, sx }) => (
  <Box sx={{ ...iconCircleSx, ...sx }}>{children}</Box>
);

const getCardContainerSx = ({
  baseLight,
  baseDark,
  selectedLight,
  selectedDark,
  isHighlighted,
  margin,
}) => {
  return (theme) => {
    const resolve = (value) =>
      typeof value === "function" ? value(theme) : value;
    const baseBg =
      theme.palette.mode === "light" ? resolve(baseLight) : resolve(baseDark);
    const selectedBg =
      theme.palette.mode === "light"
        ? resolve(selectedLight)
        : resolve(selectedDark);

    return {
      ...(margin ? { margin } : {}),
      borderRadius: "1rem",
      overflow: "hidden",
      backgroundColor: isHighlighted ? selectedBg : baseBg,
      transition: theme.transitions.create(["background-color", "transform"], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut,
      }),
      "&:hover": {
        backgroundColor: selectedBg,
      },
    };
  };
};

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
      variant="h4"
      sx={{
        fontWeight: "bold",
        mt: "2rem",
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
    const isSelectionMode = typeof onSelect === "function";
    const canExpand = isFolder || !isSelectionMode;
    const isHighlighted = isSelectionMode ? selected : expanded;

    // Auto-expand when a child is selected (e.g. restored from blog mode)
    useEffect(() => {
      if (selected && isFolder && !expanded) {
        setExpanded(true);
      }
    }, [selected, isFolder, expanded]);

    const handleCardClick = () => {
      if (isSelectionMode) {
        onSelect();
      }
      if (canExpand) {
        setExpanded((prev) => !prev);
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
          margin: "1rem 0",
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
              transition: theme.transitions.create("filter", {
                duration: theme.transitions.duration.shorter,
                easing: theme.transitions.easing.easeInOut,
              }),
            },
          })}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography>{date}</Typography>
            <Typography
              sx={{ fontWeight: "bold", display: "inline", mr: "1rem" }}
            >
              {company}
            </Typography>
            {caption && (
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block", mt: 0.5 }}
              >
                {caption}
              </Typography>
            )}
            <TechTagList technologies={technologies} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <ExpandMoreIcon
                  sx={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: (theme) =>
                      theme.transitions.create("transform", {
                        duration: theme.transitions.duration.short,
                        easing: theme.transitions.easing.easeInOut,
                      }),
                    color: (theme) => theme.palette.text.primary,
                  }}
                />
              </IconCircle>
            )}
          </Box>
        </Box>
        {canExpand && (
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
        sx={getCardContainerSx({
          baseLight: (theme) => alpha(theme.palette.common.white, 0.4),
          baseDark: (theme) => alpha(theme.palette.common.white, 0.06),
          selectedLight: (theme) => alpha(theme.palette.common.white, 0.7),
          selectedDark: (theme) => alpha(theme.palette.common.white, 0.16),
          isHighlighted: selected,
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
          })}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" sx={{ mr: "1rem" }}>
                {projectName}
              </Typography>
            </Box>
            {caption && (
              <Typography variant="caption" color="text.secondary">
                {caption}
              </Typography>
            )}
            <TechTagList technologies={technologies} />
          </Box>
          {isSelectionMode ? (
            <IconCircle>
              <ArrowForwardIcon
                sx={{
                  fontSize: "1rem",
                  color: (theme) => theme.palette.text.secondary,
                  opacity: selected ? 1 : 0.5,
                }}
              />
            </IconCircle>
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
  const loadingFallback = (
    <Typography variant="body2" color="text.secondary">
      Loading content...
    </Typography>
  );

  useEffect(() => {
    let cancelled = false;
    const cleanup = () => {
      cancelled = true;
    };

    if (content) {
      setResolvedContent(content);
      return cleanup;
    }

    if (!contentKey) {
      setResolvedContent(null);
      return cleanup;
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

    return cleanup;
  }, [content, contentKey]);

  if (!content && !contentKey) return null;

  return (
    <Suspense fallback={loadingFallback}>
      {resolvedContent === null ? (
        loadingFallback
      ) : (
        <LazyMarkdownRenderer content={resolvedContent} />
      )}
    </Suspense>
  );
});
