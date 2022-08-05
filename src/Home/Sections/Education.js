import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      ref={sectionRef}
      className={"education-section"}
      sx={{
        minHeight: "100vh",
        maxHeight: "fit-content",
        height: "100vh",
        textAlign: "start",
        zIndex: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3} md={6} />
        <Grid item xs={9} md={6}>
          <Box sx={{ mt: "5rem" }} id={"text-box"}>
            <Typography
              className={"page-two-text"}
              variant="h2"
              sx={{
                opacity: 1,
              }}
            >
              Education
            </Typography>
            <Typography
              className={"page-two-text"}
              variant="h5"
              sx={{
                opacity: 1,
              }}
            >
              I'm a second year computer science student at the University of
              Toronto, hoping to do a focus in web technologies.
            </Typography>
            <Typography
              className={"page-two-text"}
              variant="h5"
              sx={{
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
