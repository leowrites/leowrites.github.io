import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

export const useSliceAnimation = ({ slicesLength }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [closingIndex, setClosingIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const wasExpandedRef = useRef(false);
  const lastClipPathRef = useRef("polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)");

  const collapsedRef = useRef(null);
  const expandedRef = useRef(null);
  const sliceRefs = useRef([]);
  const imageRefs = useRef([]);

  const applyHoverLayout = useCallback((hoveredIndex = null) => {
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

  const animateHoverLayout = useCallback(
    (hoveredIndex = null) => {
      if (expandedIndex !== null || isAnimating) return;
      applyHoverLayout(hoveredIndex);
    },
    [applyHoverLayout, expandedIndex, isAnimating]
  );

  const handleSliceClick = useCallback(
    (sliceIndex) => {
      if (expandedIndex !== null || isAnimating) return;
      setIsAnimating(true);
      setExpandedIndex(sliceIndex);
    },
    [expandedIndex, isAnimating]
  );

  const handleBackToSlices = useCallback(() => {
    if (expandedIndex === null || isAnimating) return;
    setClosingIndex(expandedIndex);
    setExpandedIndex(null);
    setIsAnimating(true);
  }, [expandedIndex, isAnimating]);

  // Guard against out-of-range indices after slices change
  useEffect(() => {
    if (expandedIndex !== null && expandedIndex >= slicesLength) {
      setExpandedIndex(null);
      setClosingIndex(null);
      setIsAnimating(false);
    }
    if (closingIndex !== null && closingIndex >= slicesLength) {
      setClosingIndex(null);
    }
  }, [expandedIndex, closingIndex, slicesLength]);

  // GSAP expand/collapse animation
  useEffect(() => {
    if (!collapsedRef.current || !expandedRef.current) return;

    if (expandedIndex !== null) {
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
  }, [expandedIndex, closingIndex, applyHoverLayout]);

  // Cleanup GSAP tweens. Re-runs when slicesLength changes so the captured
  // element snapshots always reflect the current set of refs.
  useEffect(() => {
    const collapsedEl = collapsedRef.current;
    const expandedEl = expandedRef.current;
    const sliceEls = sliceRefs.current.filter(Boolean);
    const imageEls = imageRefs.current.filter(Boolean);

    return () => {
      gsap.killTweensOf([collapsedEl, expandedEl]);
      gsap.killTweensOf(sliceEls);
      gsap.killTweensOf(imageEls);
    };
  }, [slicesLength]);

  // Reset GSAP state when slices change
  useEffect(() => {
    sliceRefs.current.forEach((sliceEl) => {
      if (!sliceEl) return;
      gsap.set(sliceEl, { flexGrow: 1, flexBasis: 0 });
    });

    imageRefs.current.forEach((imageEl) => {
      if (!imageEl) return;
      gsap.set(imageEl, { scale: 1, transformOrigin: "center center" });
    });
  }, [slicesLength]);

  return {
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
  };
};
