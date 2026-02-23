import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Collapse,
  Link,
  Button,
  Divider,
  useTheme,
  Tooltip,
} from "@mui/material";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import GitHubIcon from "@mui/icons-material/GitHub";
import { StructuredVisual } from "./StructuredDetails";

export const SectionHeading = ({ children }) => {
  return (
    <Typography
      variant="h3"
      sx={{
        fontWeight: "bold",
        mt: "3rem",
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
    }, [selected]);

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
  ({ projectName, onSelect, selected = false, id, children }) => {
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

export const CodeBlock = ({ language = "javascript", code }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        borderRadius: "1rem",
        my: 2,
        border: "1px solid",
        borderColor: theme.palette.divider,
        backgroundColor: isDark ? "#1e1e1e" : "#f5f5f5", // matches vs/vscDarkPlus
        overflow: "hidden",
      }}
    >
      <SyntaxHighlighter
        language={language}
        style={isDark ? vscDarkPlus : vs}
        customStyle={{
          border: 0,
          margin: 0,
          padding: "1rem",
          fontSize: "0.9rem",
          backgroundColor: "transparent", // Use the Box's background
          maxHeight: "300px",
          overflowY: "auto",
          fontFamily:
            "'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

export const MarkdownRenderer = React.memo(({ content }) => {
  const theme = useTheme();

  const components = React.useMemo(
    () => ({
      a: ({ node, title, ...props }) => {
        return (
          <TooltipLink
            href={props.href}
            tooltipText={title}
            target="_blank"
            {...props}
          />
        );
      },
      p: ({ node, ...props }) => {
        return (
          <Typography
            variant="body1"
            paragraph
            color="text.secondary"
            {...props}
          />
        );
      },
      h3: ({ node, ...props }) => {
        return (
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 4 }}
            {...props}
          />
        );
      },
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        if (!inline && match) {
          return (
            <CodeBlock
              language={match[1]}
              code={String(children).replace(/\n$/, "")}
              {...props}
            />
          );
        }
        return (
          <code
            className={className}
            style={{
              backgroundColor:
                theme.palette.mode === "dark" ? "#333" : "#f5f5f5",
              padding: "0.2rem 0.4rem",
              borderRadius: "0.25rem",
            }}
            {...props}
          >
            {children}
          </code>
        );
      },
      img: ({ node, width, height, ...props }) => {
        if (width || height) {
          return (
            <Box sx={{ textAlign: "center", my: 2 }}>
              <img
                width={width}
                height={height}
                loading="lazy"
                style={{ display: "inline-block" }}
                {...props}
              />
            </Box>
          );
        }
        return <StructuredVisual src={props.src} alt={props.alt} />;
      },
    }),
    [theme.palette.mode]
  );

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
});
