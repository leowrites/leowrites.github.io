import "App.css";
// import FeedbackForm from "FeedbackForm/FeedbackForm";
import TitleText from "TitleText/TitleText";
import ThreeWorld from "ThreeWorld/ThreeWorld";
import Navbar from "Navbar/Navbar";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function App() {
  const canvaContainerRef = useRef();
  const titleSectionRef = useRef();
  const canvasRef = useRef();
  return (
    <div className="App">
      <Navbar />
      <ThreeWorld
        titleSectionRef={titleSectionRef}
        canvaContainerRef={canvaContainerRef}
        canvasRef={canvasRef}
      />
      <TitleText
        canvaContainerRef={canvaContainerRef}
        titleSectionRef={titleSectionRef}
      />
      {/* <FeedbackForm /> */}
      <div style={{ height: "100vh" }}></div>
    </div>
  );
}

export default App;
