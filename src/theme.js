import React, { createContext, useState, useMemo } from "react";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "@fontsource/sora";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ThemeProviderWrapper({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  // Update mode when system preference changes, but only if user hasn't toggled manually
  React.useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

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
          main: mode === "light" ? "#222222" : "#d6d6d6",
        },
        secondary: {
          main: mode === "light" ? "#1565c0" : "#64b5f6",
        },
        background: {
          default: mode === "light" ? "#ffffff" : "#1b1b1b",
          paper: mode === "light" ? "#fafafa" : "#121212",
        },
        text: {
          primary: mode === "light" ? "#111111" : "#f5f5f5",
          secondary: mode === "light" ? "#666666" : "#c4c4c4",
        },
      },
      shape: {
        borderRadius: 16,
      },
      transitions: {
        easing: {
          easeInOut: "cubic-bezier(0.22, 1, 0.36, 1)",
          easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
          easeIn: "cubic-bezier(0.5, 0, 0.75, 0)",
          sharp: "cubic-bezier(0.32, 0.72, 0, 1)",
        },
        duration: {
          shortest: 120,
          shorter: 180,
          short: 240,
          standard: 300,
          complex: 420,
          enteringScreen: 320,
          leavingScreen: 240,
        },
      },
      typography: {
        fontFamily: "Sora, sans-serif",
      },
      components: {
        MuiLink: {
          styleOverrides: {
            root: {
              textDecorationColor: "transparent",
              transition: "text-decoration-color 0.2s ease, color 0.2s ease",
              "&:hover": {
                textDecorationColor: "currentColor",
              },
            },
          },
        },
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
