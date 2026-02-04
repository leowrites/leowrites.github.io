import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import "./Loader.css";
import "@fontsource/dm-sans";
import { gsap } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { setView, setTransition } from "app/viewSlice";
import { useProgress } from "@react-three/drei";
import Button from "@mui/material/Button";

export default function Loader(props) {
  const buttonRef = useRef();
  const dispatch = useDispatch();
  const nameRef = useRef();
  const { progress } = useProgress();
  const boxRef = useRef();
  const view = useSelector((state) => state.view.view);

  useEffect(() => {
    view === "start"
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "auto");
    console.log(view);
  }, [view]);

  gsap.to("#loader-bar", {
    duration: 1,
    width: `${progress}%`,
  });

  useEffect(() => {
    progress === 100 &&
      setTimeout(() => {
        gsap.to(buttonRef.current, {
          duration: 1,
          opacity: 1,
        });
      }, 500);
  }, [progress]);

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
            boxRef.current.style.display = "none";
            dispatch(setView("home"));
          },
        },
        "+=1"
      );
  }
  return (
    <Box
      id={"loader"}
      ref={boxRef}
      sx={{ width: "100vw", position: "absolute", zIndex: 2 }}
    >
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
        <Typography
          variant={"h4"}
          sx={{
            color: "#051E36",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          Developer ✲ UofT ✲ Toronto
        </Typography>
        <Box
          id={"loader-bar"}
          sx={{
            backgroundColor: "#051E36",
            height: "1rem",
            width: "0%",
          }}
        />
        {progress === 100 ? (
          <Button
            sx={{
              width: "5rem",
              height: "5rem",
              borderRadius: "50%",
              backgroundColor: "white",
              color: "black",
              opacity: 0,
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
        ) : (
          <Box sx={{ height: "5rem" }} />
        )}
      </Stack>
    </Box>
  );
}
