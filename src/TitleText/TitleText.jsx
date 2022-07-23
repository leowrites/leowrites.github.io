import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import "./TitleText.css";

export default function ({ titleSectionRef, canvaContainerRef }) {
  const glowTl = useRef();
  const titleRef = useRef();
  useEffect(() => {
    glowTl.current = gsap
      .timeline()
      .to(
        titleSectionRef.current,
        {
          opacity: 0,
          transform: "scale(200)",
          zIndex: -1,
        },
        ">3"
      )
      .to(
        titleRef.current,
        {
          zIndex: -1,
        },
        "<"
      )
      .to(
        canvaContainerRef.current,
        {
          zIndex: 999,
        },
        ">"
      );
    return () => {
      glowTl.current.kill();
    };
  }, []);
  return (
    <Box
      ref={titleSectionRef}
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
    >
      <Typography
        id="title-text"
        sx={{
          zIndex: 1,
          fontSize: "12rem",
        }}
        color={"white"}
        ref={titleRef}
      >
        Siqi Liu
      </Typography>
    </Box>
  );
}
