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
import { useProgress } from "@react-three/drei";

function App() {
  const view = useSelector((state) => state.view.view);
  return (
    <div
      className="App"
      style={{ backgroundColor: view === "start" ? "black" : "#f4f3ee" }}
    >
      <Navbar />
      <Suspense fallback={<Loader />}>
        <HomePage />
        <Box>
          <Typography variant={"h2"} sx={{ my: "2rem", color: "black" }}>
            Welcome to my world
          </Typography>
        </Box>
        <ThreeWorld />
      </Suspense>
    </div>
  );
}

export default App;
