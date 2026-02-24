import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { gsap } from "gsap";

const PHOTOS = [
  { id: "0206", caption: "Kelowna, BC" },
  { id: "0212", caption: "Kelowna, BC" },
  { id: "0797", caption: "Plane spotting at YVR. Lufthansa a350-900" },
  { id: "2373", caption: "High Park" },
  { id: "2444", caption: "My bike - a Giant Contend AR 1" },
  { id: "2611", caption: "Chengdu, China" },
  { id: "2718", caption: "My cat Mocha!" },
  { id: "2722", caption: "My cat Hulk!" },
  { id: "3039", caption: "Kelowna, BC" },
  { id: "3181", caption: "Riverdale park east" },
  { id: "4392", caption: "Flight to China on an Air Canada 777-300ER" },
];

const FULL_IMAGE_EXT = {
  "0797": "webp",
};

const defaultSlices = PHOTOS.map(({ id, caption }) => ({
  image: `/photos/optimized/IMG_${id}.${FULL_IMAGE_EXT[id] || "jpg"}`,
  previewImage: `/photos/optimized/thumbs/IMG_${id}.webp`,
  caption: caption || `Phone photo · IMG_${id}`,
  position: "50% 50%",
}));

const EXPANDED_CARD_HEIGHT = 260;

const PersonalImageSlicesCard = ({ slices = defaultSlices }) => {
  const [expandedIndex, setExpandedIndex] = React.useState(null);
  const [closingIndex, setClosingIndex] = React.useState(null);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [fullScreenImageIndex, setFullScreenImageIndex] = React.useState(null);
  const [loadedFullImages, setLoadedFullImages] = React.useState({});
  const [imageDimensions, setImageDimensions] = React.useState({});
  const wasExpandedRef = React.useRef(false);
  const lastClipPathRef = React.useRef(
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
  );

  const isExpanded = expandedIndex !== null;
  const displayIndex = expandedIndex ?? closingIndex;
  const isExpandedLayerVisible = isExpanded || closingIndex !== null;
  const activeSlice = displayIndex !== null ? slices[displayIndex] : null;
  const activeImageDimensions =
    displayIndex !== null ? imageDimensions[displayIndex] : null;
  const activeImageAspectRatio =
    activeImageDimensions?.width && activeImageDimensions?.height
      ? activeImageDimensions.width / activeImageDimensions.height
      : 1;
  const activeImageWidth = Math.round(
    EXPANDED_CARD_HEIGHT * activeImageAspectRatio
  );

  const collapsedRef = React.useRef(null);
  const expandedRef = React.useRef(null);
  const expandedImageContainerRef = React.useRef(null);
  const fullscreenContainerRef = React.useRef(null);
  const fullscreenImageRef = React.useRef(null);
  const sliceRefs = React.useRef([]);
  const imageRefs = React.useRef([]);

  const applyHoverLayout = React.useCallback((hoveredIndex = null) => {
    const targets = sliceRefs.current.filter(Boolean);
    const imageTargets = imageRefs.current.filter(Boolean);
    if (!targets.length) return;

    gsap.to(targets, {
      flexGrow: (index) => {
        if (hoveredIndex === null) return 1;
        return index === hoveredIndex ? 1.7 : 0.83;
      },
      duration: 0.24,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(imageTargets, {
      scale: (index) => (hoveredIndex === index ? 1.05 : 1),
      duration: 0.22,
      ease: "power2.out",
      overwrite: "auto",
      force3D: true,
    });
  }, []);

  const animateHoverLayout = React.useCallback(
    (hoveredIndex = null) => {
      if (isExpanded || isAnimating) return;
      applyHoverLayout(hoveredIndex);
    },
    [applyHoverLayout, isExpanded, isAnimating]
  );

  const handleSliceClick = React.useCallback(
    (sliceIndex) => {
      if (isExpanded || isAnimating) return;
      setIsAnimating(true);
      setExpandedIndex(sliceIndex);
    },
    [isExpanded, isAnimating]
  );

  const handleBackToSlices = React.useCallback(() => {
    if (!isExpanded || isAnimating) return;

    setClosingIndex(expandedIndex);
    setExpandedIndex(null);
    setIsAnimating(true);
  }, [expandedIndex, isExpanded, isAnimating]);

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
    if (expandedIndex !== null && expandedIndex >= slices.length) {
      setExpandedIndex(null);
      setClosingIndex(null);
      setIsAnimating(false);
    }

    if (closingIndex !== null && closingIndex >= slices.length) {
      setClosingIndex(null);
    }
  }, [expandedIndex, closingIndex, slices.length]);

  React.useEffect(() => {
    if (!fullscreenContainerRef.current || !fullscreenImageRef.current) return;

    if (
      fullScreenImageIndex &&
      !fullScreenImageIndex.isClosing &&
      fullScreenImageIndex.rect
    ) {
      const { rect } = fullScreenImageIndex;
      const targetMaxWidth = window.innerWidth * 0.9;
      const targetMaxHeight = window.innerHeight * 0.85;

      const imgDims = imageDimensions[fullScreenImageIndex.index];
      let targetWidth = targetMaxWidth;
      let targetHeight = targetMaxHeight;

      if (imgDims) {
        const aspect = imgDims.width / imgDims.height;
        if (targetMaxWidth / aspect <= targetMaxHeight) {
          targetHeight = targetMaxWidth / aspect;
        } else {
          targetWidth = targetMaxHeight * aspect;
        }
      }

      const targetLeft = (window.innerWidth - targetWidth) / 2;
      const targetTop = (window.innerHeight - targetHeight) / 2;

      gsap.killTweensOf([
        fullscreenContainerRef.current,
        fullscreenImageRef.current,
      ]);

      gsap.fromTo(
        fullscreenContainerRef.current,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "auto", duration: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(
        fullscreenImageRef.current,
        {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          borderRadius: 0,
        },
        {
          top: targetTop,
          left: targetLeft,
          width: targetWidth,
          height: targetHeight,
          borderRadius: 12,
          duration: 0.5,
          ease: "power3.inOut",
        }
      );
    } else if (fullScreenImageIndex?.isClosing) {
      const { rect } = fullScreenImageIndex;

      gsap.killTweensOf([
        fullscreenContainerRef.current,
        fullscreenImageRef.current,
      ]);

      gsap.to(fullscreenContainerRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power3.inOut",
      });

      gsap.to(fullscreenImageRef.current, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: 0,
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => {
          setFullScreenImageIndex(null);
        },
      });
    }
  }, [fullScreenImageIndex, imageDimensions]);

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

  React.useEffect(() => {
    if (!collapsedRef.current || !expandedRef.current) return;

    if (isExpanded) {
      wasExpandedRef.current = true;
      gsap.killTweensOf([collapsedRef.current, expandedRef.current]);
      gsap.set(expandedRef.current, { pointerEvents: "auto", zIndex: 10 });
      applyHoverLayout(null);

      const activeSliceEl = sliceRefs.current[expandedIndex];
      const containerRect = collapsedRef.current.getBoundingClientRect();
      let startClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

      if (activeSliceEl) {
        const sliceRect = activeSliceEl.getBoundingClientRect();
        const leftPct =
          ((sliceRect.left - containerRect.left) / containerRect.width) * 100;
        const rightPct =
          ((sliceRect.right - containerRect.left) / containerRect.width) * 100;
        const l = Math.max(0, leftPct).toFixed(2);
        const r = Math.min(100, rightPct).toFixed(2);
        startClipPath = `polygon(${l}% 0%, ${r}% 0%, ${r}% 100%, ${l}% 100%)`;
        lastClipPathRef.current = startClipPath;
      }

      const fullClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

      gsap.to(collapsedRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 0.45,
        ease: "power3.inOut",
        overwrite: true,
      });

      gsap.fromTo(
        expandedRef.current,
        { clipPath: startClipPath, opacity: 1 },
        {
          clipPath: fullClipPath,
          duration: 0.45,
          ease: "power3.inOut",
          overwrite: true,
          onComplete: () => {
            setIsAnimating(false);
            setClosingIndex(null);
          },
        }
      );
    } else {
      if (!wasExpandedRef.current) {
        gsap.set(collapsedRef.current, { opacity: 1, scale: 1 });
        gsap.set(expandedRef.current, { opacity: 0, pointerEvents: "none" });
        return;
      }

      gsap.killTweensOf([collapsedRef.current, expandedRef.current]);
      gsap.set(expandedRef.current, { pointerEvents: "none", zIndex: 10 });
      applyHoverLayout(null);

      const closingSliceEl =
        closingIndex !== null ? sliceRefs.current[closingIndex] : null;
      const containerRect = collapsedRef.current.getBoundingClientRect();
      let targetClipPath = lastClipPathRef.current;

      if (closingSliceEl) {
        const sliceRect = closingSliceEl.getBoundingClientRect();
        const leftPct =
          ((sliceRect.left - containerRect.left) / containerRect.width) * 100;
        const rightPct =
          ((sliceRect.right - containerRect.left) / containerRect.width) * 100;
        const l = Math.max(0, leftPct).toFixed(2);
        const r = Math.min(100, rightPct).toFixed(2);
        targetClipPath = `polygon(${l}% 0%, ${r}% 0%, ${r}% 100%, ${l}% 100%)`;
      }

      const fullClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

      gsap.fromTo(
        expandedRef.current,
        { clipPath: fullClipPath, opacity: 1 },
        {
          clipPath: targetClipPath,
          opacity: 0.8,
          duration: 0.4,
          ease: "power3.inOut",
          overwrite: true,
        }
      );

      gsap.to(collapsedRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power3.inOut",
        overwrite: true,
        onComplete: () => {
          gsap.set(expandedRef.current, { opacity: 0 });
          setIsAnimating(false);
          setClosingIndex(null);
          wasExpandedRef.current = false;
        },
      });
    }
  }, [isExpanded, expandedIndex, closingIndex, applyHoverLayout]);

  React.useEffect(() => {
    const collapsedEl = collapsedRef.current;
    const expandedEl = expandedRef.current;
    const sliceEls = sliceRefs.current.filter(Boolean);
    const imageEls = imageRefs.current.filter(Boolean);

    return () => {
      gsap.killTweensOf([collapsedEl, expandedEl]);
      gsap.killTweensOf(sliceEls);
      gsap.killTweensOf(imageEls);
    };
  }, []);

  React.useEffect(() => {
    sliceRefs.current.forEach((sliceEl) => {
      if (!sliceEl) return;
      gsap.set(sliceEl, { flexGrow: 1, flexBasis: 0 });
    });

    imageRefs.current.forEach((imageEl) => {
      if (!imageEl) return;
      gsap.set(imageEl, { scale: 1, transformOrigin: "center center" });
    });
  }, [slices.length]);

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: {
            xs: isExpanded ? EXPANDED_CARD_HEIGHT : EXPANDED_CARD_HEIGHT,
            sm: isExpanded ? EXPANDED_CARD_HEIGHT : EXPANDED_CARD_HEIGHT,
          },
          borderRadius: "1rem",
          overflow: "hidden",
          border: (theme) => `1px solid ${theme.palette.divider}`,
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
              gap: 1.5,
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

      <Box
        ref={fullscreenContainerRef}
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 1300,
          opacity: 0,
          pointerEvents: "none",
          display: fullScreenImageIndex ? "block" : "none",
        }}
      >
        <Box
          onClick={handleCloseFullScreen}
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0, 0, 0, 0.85)",
            cursor: "pointer",
          }}
        />

        {fullScreenImageIndex && (
          <>
            <img
              ref={fullscreenImageRef}
              src={slices[fullScreenImageIndex.index]?.image}
              alt={
                slices[fullScreenImageIndex.index]?.caption ||
                "Full screen view"
              }
              style={{
                position: "absolute",
                display: "block",
                objectFit: "cover",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                willChange: "top, left, width, height, border-radius",
              }}
            />
            <IconButton
              onClick={handleCloseFullScreen}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                color: "white",
                bgcolor: "rgba(0, 0, 0, 0.3)",
                zIndex: 1301,
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.6)",
                },
              }}
              aria-label="Close full screen view"
            >
              <CloseIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PersonalImageSlicesCard;
