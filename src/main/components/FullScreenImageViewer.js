import React from "react";
import { Box, IconButton, Portal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { gsap } from "gsap";

/**
 * Full-screen image overlay with GSAP open/close animation.
 *
 * @param {object[]} slices - Array of slice objects with `image` and `caption`.
 * @param {object|null} fullScreenImageIndex - `{ index, rect, isClosing }` or null.
 * @param {object} imageDimensions - Map of slice index → `{ width, height }`.
 * @param {function} onRequestClose - Called when the user clicks to close; should set `isClosing: true` on `fullScreenImageIndex`.
 * @param {function} onCloseComplete - Called after the close animation ends; should set `fullScreenImageIndex` to null.
 */
const FullScreenImageViewer = ({
  slices,
  fullScreenImageIndex,
  imageDimensions,
  onRequestClose,
  onCloseComplete,
}) => {
  const fullscreenContainerRef = React.useRef(null);
  const fullscreenImageRef = React.useRef(null);

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
        onComplete: onCloseComplete,
      });
    }
  }, [fullScreenImageIndex, imageDimensions, onCloseComplete]);

  return (
    <Portal>
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
          onClick={onRequestClose}
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
              onClick={onRequestClose}
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
    </Portal>
  );
};

export default FullScreenImageViewer;
