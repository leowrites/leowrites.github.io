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
    </div>
  );
}

export default App;
