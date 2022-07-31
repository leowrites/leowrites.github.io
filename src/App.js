import "App.css";
import ThreeWorld from "ThreeWorld/ThreeWorld";
import Navbar from "Navbar/Navbar";
import React from "react";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ThreeWorld />
      {/* <TitleText
        canvaContainerRef={canvaContainerRef}
        titleSectionRef={titleSectionRef}
      /> */}
    </div>
  );
}

export default App;
