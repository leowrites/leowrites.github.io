import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import "ThreeWorld/components/Loader.css";
import "@fontsource/dm-sans";
import { gsap } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { setView, setTransition } from "app/viewSlice";
import Button from "@mui/material/Button";

export default function MockLoader() {
  const buttonRef = useRef();
  const dispatch = useDispatch();
  const nameRef = useRef();
  // useEffect(() => {
  //   gsap.to("#loader-bar", {
  //     transform: "scaleY(100)",
  //     duration: 1,
  //     delay: 1,
  //   });
  // });
  // function handleClickStart() {
  //   gsap.to(buttonRef.current, {
  //     transform: "scale(100)",
  //     color: "white",
  //     duration: 1,
  //     ease: "power3.out",
  //   });
  // }
  function handleClick() {
    // dispatch(setView("transition_to_home"));
    gsap
      .timeline()
      .to(buttonRef.current, {
        color: "#051E36",
        backgroundColor: "#051E36",
        onStart: () => {
          dispatch(setTransition("transition_to_home"));
        },
      })
      .to(
        buttonRef.current,
        {
          duration: 1,
          transform: "scale(100)",
          cursor: "default",
        },
        "+=0.5"
      )
      .to(
        nameRef.current,
        {
          color: "white",
          duration: 0.5,
        },
        "<"
      )
      .to(
        nameRef.current,
        {
          transform: "scale(100)",
          duration: 1,
          opacity: 0,
          ease: "power3.out",
          onComplete: () => {
            dispatch(setView("home"));
          },
        },
        "+=1"
      );
    // fade out
  }
  return (
    <Box id={"loader"} sx={{ width: "100vw" }}>
      <Stack spacing={2} alignItems={"center"}>
        <Typography
          zIndex={99}
          ref={nameRef}
          variant={"h1"}
          sx={{
            color: "#051E36",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          Siqi Liu
        </Typography>
        <Box
          id={"loader-bar"}
          sx={{
            backgroundColor: "#051E36",
            height: "1rem",
            width: "100%",
          }}
        />
        <Typography
          variant={"h4"}
          sx={{
            color: "#051E36",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          Welcome to my portfolio! 🎉
        </Typography>
        <Button
          sx={{
            width: "5rem",
            height: "5rem",
            borderRadius: "50%",
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              color: "white",
              backgroundColor: "#051E36",
            },
          }}
          onClick={handleClick}
          ref={buttonRef}
        >
          <Typography>Start</Typography>
        </Button>
      </Stack>
    </Box>
  );
}
