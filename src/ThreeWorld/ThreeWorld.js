import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import "./ThreeWorld.css";
import { Provider } from "react-redux";
import * as THREE from "three";
import store from "ThreeWorld/threeWorldStore";
import Scene from "./components/Scene";

export default function ThreeWorld({
  canvaContainerRef,
  canvasRef,
  titleSectionRef,
}) {
  // const texture = useTexture(process.env.PUBLIC_URL + "/wood/color.jpg");
  // for future
  const [clickedOnce, setClickedOnce] = useState(false);
  // const mouseDownPoint = useRef([0, 0]);
  // const prevPoint = useRef([0, 0]);
  // const [cameraTarget, setCameraTarget] = useState([0, 0]);
  // const dragFactor = 0.001;

  // useEffect(() => {
  //   document.addEventListener("mousedown", onMouseDown);
  //   return () => {
  //     document.removeEventListener("mousedown", onMouseDown);
  //   };
  // }, [isInteracting]);
  // useEffect(() => {
  //   document.addEventListener("mousemove", onMouseMove);
  //   return () => {
  //     document.removeEventListener("mousemove", onMouseMove);
  //   };
  // }, [isInteracting, cameraTarget]);
  // useEffect(() => {
  //   document.addEventListener("mouseup", onMouseUp);
  //   return () => {
  //     document.removeEventListener("mouseup", onMouseUp);
  //   };
  // }, [isInteracting]);
  // const onMouseDown = (e) => {
  //   setIsInteracting(true);
  //   mouseDownPoint.current = [e.clientX, e.clientY];
  // };

  // const onMouseMove = (e) => {
  //   if (isInteracting) {
  //     const currLon =
  //       (mouseDownPoint.current[0] - e.clientX) * dragFactor +
  //       prevPoint.current[0];
  //     const currLat = Math.max(
  //       -85,
  //       Math.min(
  //         85,
  //         (mouseDownPoint.current[1] - e.clientY) * dragFactor +
  //           prevPoint.current[1]
  //       )
  //     );
  //     prevPoint.current = [currLon, currLat];
  //     const phi = THREE.MathUtils.degToRad(90 - currLat);
  //     const theta = THREE.MathUtils.degToRad(currLon);
  //     setCameraTarget([
  //       500 * Math.sin(phi) * Math.cos(theta),
  //       500 * Math.cos(theta),
  //       500 * Math.sin(phi) * Math.sin(theta),
  //     ]);
  //   }
  // };
  // const onMouseUp = () => {
  //   setIsInteracting(false);
  // };
  return (
    <div id="canvas-container" ref={canvaContainerRef}>
      <Canvas
        // onMouseMove={onMouseMove}
        // onMouseDown={onMouseDown}
        onMouseDown={() => setClickedOnce(true)}
        ref={canvasRef}
        shadows
        gl={{ alpha: false }}
      >
        <Provider store={store}>
          <Scene
            // cameraTarget={cameraTarget}
            clickedOnce={clickedOnce}
            titleSectionRef={titleSectionRef}
          />
        </Provider>
      </Canvas>
    </div>
  );
}
