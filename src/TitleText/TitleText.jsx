import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TitleText.css";

export default function ({
  textShadow1 = "0 0 0.5rem white, 0 0 1em #0ff, 0 0 0.5em  #f0f",
  textShadow2 = "0 0 0.5rem white, 0 0 1em #00abff, 0 0 0.5em #1fff00",
  titleSectionRef,
}) {
  const mainTl = useRef();
  const glowTl = useRef();
  const titleRef = useRef();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const pinTextAnimation = gsap.to(titleSectionRef.current, {
      scrollTrigger: {
        trigger: titleSectionRef.current,
        pin: titleSectionRef.current,
        start: "top top",
        scrub: 1,
        markers: true,
      },
      scale: 0,
    });
    glowTl.current = gsap
      .timeline()
      .fromTo(
        titleRef.current,
        {
          textShadow: "0 0 0 white",
        },
        {
          duration: 2,
          textShadow: textShadow1,
        }
      )
      .to(titleRef.current, {
        duration: 5,
        repeat: -1,
        yoyo: true,
        textShadow: textShadow2,
      });
    mainTl.current = gsap.timeline().add(glowTl.current).add(pinTextAnimation);
    return () => {
      pinTextAnimation.kill();
      mainTl.current.kill();
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
        justifyContent: "center",
        alignItems: "center",
      }}
      textAlign="center"
    >
      <Typography
        id="title-text"
        sx={{
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
