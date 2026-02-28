import React from "react";
import { Box, Link, Tooltip, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import StructuredVisual from "./StructuredVisual";

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("py", python);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("c++", cpp);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("sh", bash);
SyntaxHighlighter.registerLanguage("json", json);

const CodeBlock = ({ language = "javascript", code }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        borderRadius: "1rem",
        my: 2,
        border: "1px solid",
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.paper,
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
          backgroundColor: "transparent",
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

const useContainerWidth = () => {
  const [width, setWidth] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
};

const ResponsiveImage = ({ src, alt, width, height, ...props }) => {
  const [ref, containerWidth] = useContainerWidth();
  const isWide = containerWidth > 900;

  return (
    <Box
      ref={ref}
      sx={{ textAlign: "center", my: 2, width: "90%", mx: "auto" }}
    >
      <img
        width={width}
        height={height}
        loading="lazy"
        alt={alt || ""}
        {...props}
        src={src}
        style={{
          width: isWide ? "60%" : "100%",
          height: "auto",
          display: "block",
          borderRadius: "1rem",
          margin: "0 auto",
          transition: "width 0.3s ease-in-out",
        }}
      />
    </Box>
  );
};

const MarkdownRendererImpl = ({ content }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const inlineCodeBackground = theme.palette.action.hover;

  const components = React.useMemo(
    () => ({
      a: ({ node, title, ...props }) => {
        const href = props.href || "";
        const isInternalHashLink = href.startsWith("#");
        const linkTargetId = href.replace(/^#/, "").replace(/^\//, "");

        const handleInternalClick = (event) => {
          props.onClick?.(event);
          if (event.defaultPrevented) return;
          if (!isInternalHashLink || !linkTargetId) return;

          event.preventDefault();
          navigate(`/item/${linkTargetId}`);
        };

        return (
          <Tooltip title={title || ""} followCursor placement="bottom">
            <Link
              {...props}
              href={href}
              color="secondary"
              underline="hover"
              onClick={isInternalHashLink ? handleInternalClick : props.onClick}
              target={isInternalHashLink ? undefined : "_blank"}
              rel={isInternalHashLink ? undefined : "noopener"}
            />
          </Tooltip>
        );
      },
      p: ({ node, ...props }) => {
        const paragraphChildren = (node?.children || []).filter((child) => {
          return !(
            child?.type === "text" && !String(child?.value || "").trim()
          );
        });

        const isImageOnlyParagraph =
          paragraphChildren.length === 1 &&
          paragraphChildren[0]?.type === "element" &&
          paragraphChildren[0]?.tagName === "img";

        if (isImageOnlyParagraph) {
          return <Box sx={{ my: 2 }}>{props.children}</Box>;
        }

        return (
          <Typography
            variant="body1"
            paragraph
            color="text.secondary"
            {...props}
          />
        );
      },
      h3: ({ node, ...props }) => (
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ mt: 2 }}
          {...props}
        />
      ),
      blockquote: ({ node, ...props }) => (
        <Box
          component="blockquote"
          sx={{
            borderLeft: "4px solid",
            borderColor: "secondary.main",
            bgcolor: "action.hover",
            p: 2,
            mx: 0,
            borderRadius: "0 8px 8px 0",
          }}
          {...props}
        />
      ),
      code({ node, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        if (match) {
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
              backgroundColor: inlineCodeBackground,
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
        const classNames = String(props.className || "").split(/\s+/);
        const isImageRowItem = classNames.includes("md-image-row__item");

        let src = props.src || "";
        const isResponsive = src.includes("#responsive");
        if (isResponsive) {
          src = src.replace("#responsive", "");
        }

        if (isImageRowItem) {
          return (
            <img loading="lazy" alt={props.alt || ""} {...props} src={src} />
          );
        }

        if (isResponsive) {
          return (
            <ResponsiveImage
              width={width}
              height={height}
              alt={props.alt}
              src={src}
              {...props}
            />
          );
        }

        if (width || height) {
          return (
            <Box sx={{ textAlign: "center", my: 2 }}>
              <img
                width={width}
                height={height}
                loading="lazy"
                alt={props.alt || ""}
                style={{ display: "inline-block", borderRadius: "1rem" }}
                {...props}
                src={src}
              />
            </Box>
          );
        }
        return <StructuredVisual src={src} alt={props.alt} />;
      },
    }),
    [inlineCodeBackground, navigate]
  );

  return (
    <Box>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default React.memo(MarkdownRendererImpl);
