import React from "react";
import { Box, Link, Tooltip, Typography, useTheme } from "@mui/material";
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

const SANITY_PROJECT_ID = process.env.REACT_APP_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.REACT_APP_SANITY_DATASET || "production";

const parseSanityAssetRef = (rawSrc = "") => {
  const trimmed = String(rawSrc || "").trim();
  if (!trimmed) return null;

  const normalized = trimmed
    .replace(/^sanity:\/\//i, "")
    .replace(/^sanity:/i, "");

  const match = normalized.match(
    /^image-([a-zA-Z0-9_]+)-(\d+x\d+)-([a-z0-9]+)$/i
  );
  if (!match) return null;

  return {
    assetId: match[1],
    dimensions: match[2],
    extension: match[3],
  };
};

const resolveMarkdownImageSrc = (src = "") => {
  const rawSrc = String(src || "").trim();
  if (!rawSrc) return "";

  if (
    rawSrc.startsWith("http://") ||
    rawSrc.startsWith("https://") ||
    rawSrc.startsWith("/") ||
    rawSrc.startsWith("data:")
  ) {
    return rawSrc;
  }

  if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
    return rawSrc;
  }

  const parsedRef = parseSanityAssetRef(rawSrc);
  if (!parsedRef) {
    return rawSrc;
  }

  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${parsedRef.assetId}-${parsedRef.dimensions}.${parsedRef.extension}`;
};

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

const MarkdownRendererImpl = ({ content }) => {
  const theme = useTheme();
  const inlineCodeBackground = theme.palette.action.hover;

  const components = React.useMemo(
    () => ({
      a: ({ node, title, ...props }) => (
        <Tooltip title={title || ""} followCursor placement="bottom">
          <Link
            href={props.href}
            color="secondary"
            underline="hover"
            target="_blank"
            rel="noopener"
            {...props}
          />
        </Tooltip>
      ),
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
        const resolvedSrc = resolveMarkdownImageSrc(props.src);

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
                src={resolvedSrc}
              />
            </Box>
          );
        }
        return <StructuredVisual src={resolvedSrc} alt={props.alt} />;
      },
    }),
    [inlineCodeBackground]
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
};

export default React.memo(MarkdownRendererImpl);
