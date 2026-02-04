import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRef } from "react";

export default function Page() {
  const sectionRef = useRef();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      ref={sectionRef}
      className={"about-me"}
      sx={{
        minHeight: "100vh",
        maxHeight: "fit-content",
        textAlign: "start",
        zIndex: 1,
      }}
    >
      <Box
        id={"text-box"}
        sx={{
          width: matches ? "75%" : "50%",
        }}
      >
        <Typography
          className={"page-two-text"}
          variant="h2"
          sx={{
            opacity: 1,
          }}
        >
          A little bit about me
        </Typography>
        <Typography
          className={"page-two-text"}
          variant="h5"
          sx={{
            opacity: 1,
          }}
        >
          I'm a <mark className="marker">builder</mark>. I come up with ideas
          and bring them to life. This is why I love software - it allows me to
          create whatever I desire. With just a keyboard, a computer, a screen,
          the power of software unlocks the world of infinite possibilities.
          This excites me and pushes me to learn more, to create more, to build
          more. To me, it's <mark className="marker">freedom</mark>.
        </Typography>
        <Typography
          className={"page-two-text"}
          variant="h5"
          sx={{
            opacity: 1,
          }}
        >
          I am originally from Shanghai, China, and spent four years in Kelowna,
          BC for highschool. I am currently at Toronto attending UofT
        </Typography>
      </Box>
    </Box>
  );
}
