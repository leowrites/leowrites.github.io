import Box from "@mui/material/Box";
import MockLoader from "./MockLoader";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import PageOne from "./Sections/PageOne";
import AboutMe from "./Sections/AboutMe";
import Education from "./Sections/Education";
import Projects from "./Sections/Projects";
import Background from "./Background/Background";

function HomeWrapper({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mx: "10rem",
      }}
    >
      <Stack>{children}</Stack>
    </Box>
  );
}

export default function HomePage() {
  const view = useSelector((state) => state.view.view);
  return view === "start" ? (
    <MockLoader />
  ) : (
    <>
      <HomeWrapper>
        <PageOne />
        <AboutMe />
        <Education />
        <Projects />
      </HomeWrapper>
      <Background />
    </>
  );
}
