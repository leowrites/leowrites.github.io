import Box from "@mui/material/Box";
import MockLoader from "./MockLoader";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import PageOne from "./Sections/PageOne";
import AboutMe from "./Sections/AboutMe";
import Education from "./Sections/Education";
import Projects from "./Sections/Projects";
import Background from "./Background/Background";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Suspense } from "react";

function HomeWrapper({ children }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  console.log(matches);
  return (
    <Container maxWidth={matches ? "sm" : "lg"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <Stack>{children}</Stack>
      </Box>
    </Container>
  );
}

export default function HomePage() {
  const view = useSelector((state) => state.view.view);
  return view === "start" ? (
    <MockLoader />
  ) : (
    <HomeWrapper>
      <PageOne />
      <AboutMe />
      <Education />
      <Projects />
      <Suspense fallback={null}>
        <Background />
      </Suspense>
    </HomeWrapper>
  );
}
