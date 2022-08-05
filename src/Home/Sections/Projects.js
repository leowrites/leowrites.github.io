import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";

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
      className={"projects"}
      sx={{
        height: "100vh",
        textAlign: "start",
      }}
    >
      <Box
        id={"text-box"}
        sx={{
          pt: "10rem",
          width: "50%",
        }}
      >
        <Typography
          className={"page-two-text"}
          sx={{
            fontSize: "4rem",
            opacity: 1,
          }}
        >
          My Projects
        </Typography>
        <Typography
          className={"page-two-text"}
          sx={{
            fontSize: "2rem",
            opacity: 1,
          }}
        >
          I have done many projects differing in the technologies used, size and
          complexity.
        </Typography>
        <Typography
          className={"page-two-text"}
          sx={{
            fontSize: "1.5rem",
            opacity: 1,
          }}
        >
          I'm most proud of Uniplanit, a MERN stack project that I spearheaded.
        </Typography>
        <Typography
          className={"page-two-text"}
          sx={{
            fontSize: "1.5rem",
            opacity: 1,
          }}
        >
          It was an ambitious idea, a month-long project, and a chanllenge for
          myself when I just started learning React.
        </Typography>
        <Button
          variant="primary"
          onClick={() => window.open("https://www.uniplanit.com")}
        >
          Uniplanit
        </Button>
        <IconButton
          onClick={() => window.open("https://github.com/leowrites/UniPlanit")}
        >
          <GitHubIcon />
        </IconButton>
        <Typography
          className={"page-two-text"}
          sx={{
            fontSize: "1.5rem",
            opacity: 1,
          }}
        >
          See my other projects{" "}
          <a href={"https://github.com/leowrites"}> here</a>, which ranges from
          a simple{" "}
          <a href={"https://github.com/leowrites/Pacman"}>Pacman game</a> with
          AI, to a{" "}
          <a href={"https://github.com/leowrites/R1_Main"}>model rocket</a> with
          vectored thurst rocekt, to this 3D interactive personal portfolio that
          you are seeing right now.
        </Typography>
      </Box>
    </Box>
  );
}
