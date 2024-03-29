import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

export default function Page() {
  const sectionRef = useRef();
  const view = useSelector((state) => state.view.view);
  console.log(view);
  useEffect(() => {
    if (view === "home") {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".fade-in", { x: -500, opacity: 0, stagger: 0.2 });
    }
  }, [view]);
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
        pt: "5rem",
      }}
    >
      <Box
        sx={{
          width: matches ? "75%" : "50%",
        }}
        id={"text-box"}
      >
        <Typography
          className={"fade-in"}
          variant={"h2"}
          sx={{
            opacity: 1,
          }}
        >
          Welcome to my portfolio!
        </Typography>
        <Typography className={"fade-in"} variant={"h4"} sx={{ opacity: 1 }}>
          My name is <mark className={"marker"}>Siqi(Leo) Liu</mark>, a second
          year computer science student at the{" "}
          <mark className="marker">University of Toronto</mark>.
        </Typography>
        <Typography className={"fade-in"} variant={"h5"} sx={{ opacity: 0 }}>
          Take a look at some of my experiences and projects to learn more about
          me. 👇
        </Typography>
      </Box>
    </Box>
  );
}
