import "App.css";
import React from "react";
import Main from "Resume/Main";
import { Container, CssBaseline } from "@mui/material";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="xl">
        <Main />
      </Container>
    </div>
  );
}

export default App;
