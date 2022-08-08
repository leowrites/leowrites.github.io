import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import "@fontsource/dm-sans";

let theme = createTheme({
  palette: {
    primary: {
      main: "rgb(255, 255, 255)",
      contrastText: "rgb(255, 255, 255)",
    },
  },
  typography: {
    fontFamily: "DM Sans, sans-serif",
  },
});

theme = responsiveFontSizes(theme);

export default function ({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
