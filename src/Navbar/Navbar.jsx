import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import logo from "./logo.png";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function () {
  const textRef = useRef();
  const transition = useSelector((state) => state.view.transition);
  useEffect(() => {
    if (transition === "transition_to_home") {
      gsap.to(textRef.current, {
        color: "white",
        delay: 0.7,
      });
    }
  });
  return (
    <AppBar
      sx={{
        background: "transparent",
        boxShadow: "none",
        position: "fixed",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Siqi Liu"
            src={logo}
            sx={{
              mr: 2,
              borderRadius: "25%",
            }}
          />
          <a style={{ textDecoration: "none" }} href={"http://portfoliu.net"}>
            <Typography
              ref={textRef}
              sx={{
                fontWeight: "bold",
              }}
              color={"#051E36"}
              variant={"h5"}
            >
              Siqi Liu
            </Typography>
          </a>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
