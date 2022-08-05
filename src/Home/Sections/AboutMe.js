import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRef } from "react";

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
      className={"about-me"}
      sx={{
        height: "100vh",
        textAlign: "start",
        zIndex: 1,
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
          A little bit about me
        </Typography>
        <Typography
          className={"page-two-text"}
          sx={{
            fontSize: "2rem",
            opacity: 1,
          }}
        >
          I'm a builder. I come up with ideas and bring them to life. This is
          why I love software - it allows me to create whatever I desire. With
          just a keyboard, a computer, a screen, the power of software unlocks
          the world of infinite possibilities. This excites me and pushes me to
          learn more, to create more, to build more. To me, it's freedom.
        </Typography>
        <Typography
          className={"page-two-text"}
          sx={{
            fontSize: "2rem",
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
