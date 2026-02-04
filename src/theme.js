import React, { createContext, useState, useMemo } from "react";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import "@fontsource/dm-sans";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => {
    let t = createTheme({
      palette: {
        mode,
        primary: {
          main: mode === "light" ? "#051E36" : "#1565c0",
        },
        secondary: {
          main: mode === "light" ? "#1565c0" : "#90caf9",
        },
        background: {
          default: mode === "light" ? "#fff" : "#121212",
          paper: mode === "light" ? "#fff" : "#1e1e1e",
        },
        text: {
          primary: mode === "light" ? "#051E36" : "#fff",
          secondary: mode === "light" ? "#666" : "#ccc",
        },
      },
      typography: {
        fontFamily: "DM Sans, sans-serif",
      },
    });
    return responsiveFontSizes(t);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
