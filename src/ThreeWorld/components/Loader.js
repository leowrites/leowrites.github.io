import React, { useRef } from "react";
import { useProgress } from "@react-three/drei";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import "./Loader.css";

export default function Loader() {
  const { progress } = useProgress();
  const loadingBarRef = useRef();
  console.log(progress);
  return (
    <Box id={"loader"}>
      <Stack spacing={2}>
        <Typography sx={{ color: "white", fontSize: "8rem" }}>
          Siqi Liu
        </Typography>
        <LoaderBar ref={loadingBarRef} width={`${progress}%`} />
        <Typography sx={{ color: "white", fontSize: "2rem" }}>
          Loading... {Math.round(progress)}%
        </Typography>
        <Box sx={{ width: "5rem", height: "5rem" }} />
      </Stack>
    </Box>
  );
}

export const LoaderBar = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    sx={{
      backgroundColor: "white",
      height: "1rem",
      ...props,
    }}
  />
));
