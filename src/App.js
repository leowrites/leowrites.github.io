import "App.css";
// import ThreeWorld from "ThreeWorld/ThreeWorld";
import Navbar from "Navbar/Navbar";
import React from "react";
import HomePage from "Home/HomePage";
import { useSelector } from "react-redux";

function App() {
  const view = useSelector((state) => state.view.view);
  return (
    <div
      className="App"
      style={{ backgroundColor: view === "start" ? "black" : "#051E36" }}
    >
      <Navbar />
      <HomePage />
      {/* {matches ? (
          <>
            <Box>
              <Typography variant={"h2"} sx={{ py: "5rem", color: "white" }}>
                Welcome to my world
              </Typography>
            </Box>
            <ThreeWorld />
          </>
        ) : (
          <Typography variant={"h6"} sx={{ py: "5rem", color: "white" }}>
            Visit this website on a desktop to see my world!
          </Typography>
        )} */}
    </div>
  );
}

export default App;
