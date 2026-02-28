import React, { Suspense, useEffect, useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import {
  loadContentByKey,
  COMING_SOON_KEY,
} from "content/site/loaders/markdownContentLoader";

export { COMING_SOON_KEY };

const LazyMarkdownRenderer = React.lazy(() =>
  import("../MarkdownRendererImpl")
);

const loadingFallback = (
  <Box sx={{ mt: 1 }}>
    <Skeleton variant="text" height={34} width="62%" />
    <Skeleton variant="text" height={24} width="100%" />
    <Skeleton variant="text" height={24} width="98%" />
    <Skeleton variant="text" height={24} width="95%" />
    <Skeleton variant="text" height={24} width="90%" />
  </Box>
);

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

    if (!contentKey || contentKey === COMING_SOON_KEY) {
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

  if (contentKey === COMING_SOON_KEY) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontStyle: "italic", mt: 1 }}
      >
        Content coming soon.
      </Typography>
    );
  }

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
MarkdownRenderer.displayName = "MarkdownRenderer";
