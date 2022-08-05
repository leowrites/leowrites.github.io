import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Grid from "@mui/material/Grid";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function Page() {
  const sectionRef = useRef();
  //   useEffect(() => {
  //     gsap.registerPlugin(ScrollTrigger);
  //     gsap.fromTo(
  //       ".page-two-text",
  //       { x: -1000 },
  //       {
  //         opacity: 1,
  //         x: 0,
  //         stagger: 0.2,
  //         scrollTrigger: {
  //           trigger: sectionRef.current,
  //           start: "-500",
  //         },
  //       }
  //     );
  //   }, []);
  return (
    <Box
      ref={sectionRef}
      className={"education-section"}
      sx={{
        // minHeight: "fit-content",
        // maxHeight: "100vh",
        height: "100vh",
        textAlign: "start",
        zIndex: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <Box sx={{ mt: "5rem" }} id={"text-box"}>
            <Typography
              className={"page-two-text"}
              sx={{
                fontSize: "4rem",
                opacity: 1,
              }}
            >
              Education
            </Typography>
            <Typography
              className={"page-two-text"}
              sx={{
                fontSize: "4rem",
                opacity: 1,
              }}
            >
              Education
            </Typography>
            <Typography
              className={"page-two-text"}
              sx={{
                fontSize: "4rem",
                opacity: 1,
              }}
            >
              Education
            </Typography>
            <Typography
              className={"page-two-text"}
              sx={{
                fontSize: "2rem",
                opacity: 1,
              }}
            >
              I'm a second year computer science student at the University of
              Toronto, hoping to do a focus in web technologies.
            </Typography>
            <Typography
              className={"page-two-text"}
              sx={{
                fontSize: "2rem",
                opacity: 1,
              }}
            >
              I started my time at UofT in the fall of 2021, and I'm hoping to
              graduate in the spring of 2025.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
