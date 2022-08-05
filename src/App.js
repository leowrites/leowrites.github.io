import "App.css";
import ThreeWorld from "ThreeWorld/ThreeWorld";
import Navbar from "Navbar/Navbar";
import React from "react";
import Loader from "ThreeWorld/components/Loader";
import { Suspense } from "react";
import HomePage from "Home/HomePage";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function App() {
  const view = useSelector((state) => state.view.view);
  console.log(view);
  return (
    <div
      className="App"
      style={{ backgroundColor: view === "start" ? "black" : "#f4f3ee" }}
    >
      <Suspense fallback={<Loader />}>
        <Navbar />
        <HomePage />
        <Box sx={{ mb: "5rem" }}>
          <Typography fontSize={"5rem"}>Welcome to my world</Typography>
        </Box>
        <ThreeWorld />
      </Suspense>
    </div>
  );
}

export default App;
