import React, { Suspense, useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { loadContentByKey } from "content/site/loaders/markdownContentLoader";

const LazyMarkdownRenderer = React.lazy(() =>
  import("../MarkdownRendererImpl")
);

export const MarkdownRenderer = React.memo(({ content, contentKey }) => {
  const [resolvedContent, setResolvedContent] = useState(content || null);
  const loadingFallback = (
    <Box sx={{ mt: 1 }}>
      <Skeleton variant="text" height={34} width="62%" />
      <Skeleton variant="text" height={24} width="100%" />
      <Skeleton variant="text" height={24} width="98%" />
      <Skeleton variant="text" height={24} width="95%" />
      <Skeleton variant="text" height={24} width="90%" />
    </Box>
  );

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
    <Suspense fallback={loadingFallback}>
      {resolvedContent === null ? (
        loadingFallback
      ) : (
        <LazyMarkdownRenderer content={resolvedContent} />
      )}
    </Suspense>
  );
});
