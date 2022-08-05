import Loader from "./components/Loader";
import React, { Suspense, useEffect, useRef } from "react";
import "./ThreeWorld.css";
import Floor from "./components/Floor";
import Projects from "./components/PillarSection/Projects";
import Printer from "./components/PillarSection/Printer";
import Pillar from "./components/PillarSection/Pillar";
import F1 from "./components/F1";
import Wall from "./components/BackWall/Wall";
import WindowTable from "./components/WindowTable";
import Chair from "./components/Chair";
import TableStuff from "./components/BackWall/TableStuff";
import Plant from "./components/Plant";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera, Stars, useProgress } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import Box from "@mui/material/Box";

function SceneSetting({ ...props }) {
  return (
    <group>
      <color attach="background" args={["#4b4d52"]} />
      <group {...props} dispose={null}>
        <pointLight
          name="Point Light"
          intensity={0.5}
          distance={2000}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={100}
          shadow-camera-far={100000}
          color="#fbd4c0"
          position={[-222.71, 1514.45, 317.83]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2.21}
        />
        <directionalLight
          name="Directional Light"
          castShadow
          intensity={0.75}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={-10000}
          shadow-camera-far={100000}
          shadow-camera-left={-500}
          shadow-camera-right={500}
          shadow-camera-top={500}
          shadow-camera-bottom={-500}
          position={[4090.53, 2547.6, 1692.01]}
          scale={[5.19, 1, 1]}
        />
        <OrthographicCamera
          name="Personal Camera"
          makeDefault={true}
          zoom={0.8}
          far={100000}
          near={-100000}
          position={[739.49, 600.7, 560.08]}
          rotation={[-Math.PI / 4, 0.62, Math.PI / 6]}
        />
        <hemisphereLight
          name="Default Ambient Light"
          intensity={0.75}
          color="#eaeaea"
          position={[0, 1, 0]}
        />
        <OrbitControls />
      </group>
    </group>
  );
}

function Scene() {
  const sceneRef = useRef();
  function handleMouseMove(event) {
    const mouseX = event.clientX - window.innerWidth / 2;
    sceneRef.current.rotation.y = mouseX * 0.0002;
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });
  return (
    <group position={[0, -380, 0]} ref={sceneRef}>
      <Floor />
      <Pillar />
      <Projects position={[0, 0, -40]} />
      <F1 />
      <Wall />
      <Chair />
      <WindowTable />
      <Plant />
      <TableStuff />
      <Printer position={[0, 0, -40]} />
    </group>
  );
}
export default function ThreeWorld() {
  return (
    <div id={"canvas-container"}>
      <Canvas shadows flat linear>
        <Scene />
        <SceneSetting />
      </Canvas>
    </div>
  );
}
