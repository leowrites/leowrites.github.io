import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { defaultSlices } from "./data/photoSlices";
import { useSliceAnimation } from "./hooks/useSliceAnimation";
import FullScreenImageViewer from "./components/FullScreenImageViewer";

const EXPANDED_CARD_HEIGHT = 260;

const PersonalImageSlicesCard = ({ slices = defaultSlices }) => {
  const [fullScreenImageIndex, setFullScreenImageIndex] = React.useState(null);
  const [loadedFullImages, setLoadedFullImages] = React.useState({});
  const [imageDimensions, setImageDimensions] = React.useState({});

  const {
    expandedIndex,
    closingIndex,
    isAnimating,
    collapsedRef,
    expandedRef,
    sliceRefs,
    imageRefs,
    animateHoverLayout,
    handleSliceClick,
    handleBackToSlices,
  } = useSliceAnimation({ slicesLength: slices.length });

  const isExpanded = expandedIndex !== null;
  const displayIndex = expandedIndex ?? closingIndex;
  const isExpandedLayerVisible = isExpanded || closingIndex !== null;
  const activeSlice = displayIndex !== null ? slices[displayIndex] : null;

  const expandedImageContainerRef = React.useRef(null);

  const handleOpenFullScreen = React.useCallback(
    (e) => {
      e.stopPropagation();
      if (displayIndex === null || !expandedImageContainerRef.current) return;
      const rect = expandedImageContainerRef.current.getBoundingClientRect();
      setFullScreenImageIndex({ index: displayIndex, rect });
    },
    [displayIndex]
  );

  const handleCloseFullScreen = React.useCallback(() => {
    setFullScreenImageIndex((prev) =>
      prev ? { ...prev, isClosing: true } : null
    );
  }, []);

  React.useEffect(() => {
    if (displayIndex === null) return;
    if (!activeSlice?.image) return;
    if (loadedFullImages[displayIndex] && imageDimensions[displayIndex]) return;

    const preloader = new Image();
    preloader.src = activeSlice.image;
    preloader.onload = () => {
      setLoadedFullImages((previous) => ({
        ...previous,
        [displayIndex]: true,
      }));
      setImageDimensions((previous) => ({
        ...previous,
        [displayIndex]: {
          width: preloader.naturalWidth,
          height: preloader.naturalHeight,
        },
      }));
    };
  }, [activeSlice?.image, displayIndex, imageDimensions, loadedFullImages]);

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: EXPANDED_CARD_HEIGHT,
          borderRadius: "1rem",
          overflow: "hidden",
          border: (theme) => isExpanded && `1px solid ${theme.palette.divider}`,
          bgcolor: "action.hover",
          transition: "height 320ms ease",
        }}
      >
        <Box
          ref={collapsedRef}
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            pointerEvents: isExpanded || isAnimating ? "none" : "auto",
            contain: "layout paint",
            opacity: isExpanded ? 0 : 1,
            transform: isExpanded ? "scale(0.985)" : "scale(1)",
            willChange: "opacity, transform",
          }}
        >
          {slices.map((slice, sliceIndex) => {
            return (
              <Box
                key={`${slice.image}-${sliceIndex}`}
                ref={(element) => {
                  sliceRefs.current[sliceIndex] = element;
                }}
                component="button"
                type="button"
                onClick={() => handleSliceClick(sliceIndex)}
                onMouseEnter={() => animateHoverLayout(sliceIndex)}
                onMouseLeave={() => animateHoverLayout(null)}
                onFocus={() => animateHoverLayout(sliceIndex)}
                onBlur={() => animateHoverLayout(null)}
                aria-pressed={expandedIndex === sliceIndex}
                sx={{
                  p: 0,
                  m: 0,
                  border: 0,
                  outline: 0,
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  minWidth: "10px",
                  bgcolor: "transparent",
                  flex: "1 1 0",
                  transformOrigin: "center",
                  willChange: "flex-grow",
                  borderLeft:
                    sliceIndex === 0
                      ? "none"
                      : (theme) => `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box
                  ref={(element) => {
                    imageRefs.current[sliceIndex] = element;
                  }}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${
                      slice.previewImage || slice.image
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: slice.position || "center",
                    transform: "scale(1)",
                    willChange: "transform",
                  }}
                />
              </Box>
            );
          })}
        </Box>

        <Box
          ref={expandedRef}
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "55% 45%" },
            pointerEvents: isExpanded ? "auto" : "none",
            willChange: "transform, clip-path",
            opacity: isExpandedLayerVisible ? 1 : 0,
            visibility: isExpandedLayerVisible ? "visible" : "hidden",
          }}
        >
          <Box
            ref={expandedImageContainerRef}
            sx={{
              position: "relative",
              width: "100%",
              minHeight: { xs: 180, sm: "100%" },
              backgroundImage: activeSlice
                ? `url(${activeSlice.previewImage || activeSlice.image})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: activeSlice?.position || "center",
              bgcolor: "action.hover",
            }}
          >
            {activeSlice?.image && (
              <>
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${activeSlice.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: activeSlice.position || "center",
                    opacity:
                      displayIndex !== null && loadedFullImages[displayIndex]
                        ? 1
                        : 0,
                    transition: "opacity 220ms ease",
                    willChange: "opacity",
                  }}
                />

                <IconButton
                  onClick={handleOpenFullScreen}
                  size="small"
                  sx={{
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    color: "white",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    backdropFilter: "blur(4px)",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.7)",
                    },
                    zIndex: 2,
                  }}
                  aria-label="Open full image"
                >
                  <OpenInFullIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              {activeSlice?.caption}
            </Typography>

            <IconButton
              onClick={handleBackToSlices}
              size="small"
              sx={{
                alignSelf: "flex-end",
                color: "text.secondary",
                bgcolor: "action.hover",
                "&:hover": {
                  bgcolor: "action.selected",
                },
              }}
              aria-label="Close extended view"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <FullScreenImageViewer
        slices={slices}
        fullScreenImageIndex={fullScreenImageIndex}
        imageDimensions={imageDimensions}
        onRequestClose={handleCloseFullScreen}
        onCloseComplete={() => setFullScreenImageIndex(null)}
      />
    </Box>
  );
};

export default PersonalImageSlicesCard;
