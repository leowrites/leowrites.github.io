import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/dm-sans";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(255, 255, 255)",
      contrastText: "rgb(25,, 255, 255)",
    },
  },
  typography: {
    fontFamily: "DM Sans, sans-serif",
  },
});

export default function ({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
