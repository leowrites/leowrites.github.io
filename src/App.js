import "App.css";
import React from "react";
import Main from "Resume/Main";
import { Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Container maxWidth="xl">
        <Main />
      </Container>
    </div>
  );
}

export default App;
