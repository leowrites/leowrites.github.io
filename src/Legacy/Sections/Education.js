import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Page() {
  const sectionRef = useRef();
  const theme = useTheme();
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
              I'm a second year <mark className="marker">computer science</mark>{" "}
              student at the University of Toronto, hoping to explore different
              areas of Computer Science.
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
