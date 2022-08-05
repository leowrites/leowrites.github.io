import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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
  }, []);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      ref={sectionRef}
      className={"section-one"}
      sx={{
        minHeight: "100vh",
        maxHeight: "fit-content",
        display: "flex",
        justifyContent: "start",
        textAlign: "start",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          width: matches ? "75%" : "50%",
          mt: "5rem",
        }}
        id={"text-box"}
      >
        <Typography
          className={"fade-in"}
          variant={"h2"}
          sx={{
            opacity: 0,
          }}
        >
          Welcome to my portfolio!
        </Typography>
        <Typography className={"fade-in"} variant={"h4"} sx={{ opacity: 0 }}>
          My name is Siqi Liu(Leo), a second year computer science student at
          the University of Toronto.
        </Typography>
        <Typography className={"fade-in"} variant={"h5"} sx={{ opacity: 0 }}>
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
