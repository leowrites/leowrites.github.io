import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Page() {
  const sectionRef = useRef();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      ref={sectionRef}
      className={"skills"}
      // className={"projects"}
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
          What Can I Do?
        </Typography>
        <Typography
          variant="h5"
          sx={{
            opacity: 1,
          }}
        ></Typography>
        <Typography
          variant="h5"
          sx={{
            opacity: 1,
          }}
        >
          My main languages are Javascript and Python. I'm most comfortable with
          React and CSS Frameworks such as MUI.
        </Typography>
      </Box>
    </Box>
  );
}
