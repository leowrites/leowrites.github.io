import "App.css";
import FeedbackForm from "FeedbackForm/FeedbackForm";
import ThemeContext from "theme";
import TitleText from "TitleText/TitleText";
import ThreeWorld from "ThreeWorld/ThreeWorld";
import Navbar from "Navbar/Navbar";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function App() {
  const canvaContainerRef = useRef();
  const titleSectionRef = useRef();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(canvaContainerRef.current, {
      scrollTrigger: {
        trigger: titleSectionRef.current,
        start: "bottom 100%",
        markers: true,
      },
      zIndex: 1,
    });
  }, []);
  return (
    <ThemeContext>
      <Navbar />
      <div className="App">
        <ThreeWorld canvaContainerRef={canvaContainerRef} />
        <TitleText titleSectionRef={titleSectionRef} />
        {/* <FeedbackForm /> */}
      </div>
    </ThemeContext>
  );
}

export default App;
