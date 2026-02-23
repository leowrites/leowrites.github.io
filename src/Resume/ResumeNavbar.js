import { Box, IconButton, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext } from "react";
import { ColorModeContext } from "../theme";
import { NAVBAR_HEIGHT } from "./constants";

export const ResumeNavbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        height: NAVBAR_HEIGHT,
        my: "1rem",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <IconButton
        onClick={colorMode.toggleColorMode}
        color="inherit"
        disableRipple
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
};
