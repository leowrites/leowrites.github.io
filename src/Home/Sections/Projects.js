import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRef } from "react";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Page() {
  const sectionRef = useRef();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      ref={sectionRef}
      className={"projects"}
      sx={{
        minHeight: "100vh",
        maxHeight: "fit-content",
        textAlign: "start",
      }}
    >
      <Box
        id={"text-box"}
        sx={{
          pt: "10rem",
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
          My Projects
        </Typography>
        <Typography
          className={"page-two-text"}
          variant="h5"
          sx={{
            opacity: 1,
          }}
        >
          I have done many projects differing in the technologies used, size and
          complexity.
        </Typography>
        <Typography
          className={"page-two-text"}
          variant="h5"
          sx={{
            opacity: 1,
          }}
        >
          I'm most proud of Uniplanit, a MERN stack project that I spearheaded.
        </Typography>
        <Typography
          className={"page-two-text"}
          variant="h5"
          sx={{
            opacity: 1,
          }}
        >
          It was an ambitious idea, a month-long project, and a chanllenge for
          myself when I just started learning React.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
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
          variant="h5"
          sx={{
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
