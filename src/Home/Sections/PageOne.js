import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

export default function Page() {
  const sectionRef = useRef();
  const backgroundRef = useRef();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      ".fade-in",
      { x: -500 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.2,
      }
    );
    // gsap.to(backgroundRef.current, {
    //   scrollTrigger: {
    //     trigger: sectionRef.current,
    //     start: "top top",
    //     toggleActions: "play pause reverse restart",
    //     // markers: true,
    //     // scrub: 1,
    //     // pin: true,
    //   },
    //   width: "250px",
    //   height: "250px",
    //   transform: "scale(15)",
    //   borderRadius: "0%"
    // });
  }, []);
  return (
    <Box
      ref={sectionRef}
      className={"section-one"}
      sx={{
        height: "100vh",
        minHeight: "fit-content",
        display: "flex",
        justifyContent: "start",
        textAlign: "start",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          width: "50%",
          mt: "5rem",
        }}
        id={"text-box"}
      >
        <Typography
          className={"fade-in"}
          sx={{
            fontSize: "4rem",
            opacity: 0,
          }}
        >
          Welcome to my portfolio!
        </Typography>
        <Typography className={"fade-in"} sx={{ fontSize: "2rem", opacity: 0 }}>
          My name is Siqi Liu(Leo), a second year computer science student at
          the University of Toronto.
        </Typography>
        <Typography className={"fade-in"} sx={{ fontSize: "2rem", opacity: 0 }}>
          Take a look at some of my experiences and projects to learn more about
          me. 👇
        </Typography>
        <Box
          ref={backgroundRef}
          sx={{
            zIndex: -1,
            backgroundColor: "lightblue",
            display: "block",
            borderRadius: "50%",
            width: "0px",
            height: "0px",
            left: "50%",
          }}
        ></Box>
      </Box>
    </Box>
  );
}
