import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  useTexture,
  Stars,
} from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { Table } from "./components/Table";
import { Suspense } from "react";
import Folder from "./components/Folder";
import * as THREE from "three";
import "./ThreeWorld.css";
import Monitor from "./components/Monitor";
import Lamp from "./components/Lamp";
import Keyboard from "./components/Keyboard";
import Mouse from "./components/Mouse";

// function ConfigScene() {
//   const state = useThree();
//   // const texture = useTexture(process.env.PUBLIC_URL + "/wood/color.jpg");
//   useEffect(() => {
//     state.set({
//       scene: new THREE.Scene({
//         enviornment: texture,
//       }),
//     });
//   }, []);
// }

// function Animation({ boxRef }) {
//   useFrame(({ clock }) => {
//     // console.log(state)
//     // console.log(delta)
//     boxRef.current.position.x = clock.getElapsedTime();
//     boxRef.current.rotation.x = clock.getElapsedTime();
//   });
// }

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 20, 0], ...props }));
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxGeometry />
      <meshLambertMaterial color="hotpink" />
    </mesh>
  );
}

function Floor(props) {
  const colorMap = useTexture(process.env.PUBLIC_URL + "/wood/color.jpg");
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}

export default function ({ canvaContainerRef }) {
  // const texture = useTexture(process.env.PUBLIC_URL + "/wood/color.jpg");
  return (
    <div id="canvas-container" ref={canvaContainerRef}>
      <Canvas shadows gl={{ alpha: false }}>
        <Suspense fallback={null}>
          {/* <color attach="background" args={["gray"]} /> */}
          <Stars
            radius={50}
            depth={50}
            count={2000}
            factor={10}
            saturation={0}
            fade
            speed={1}
          />
          <PerspectiveCamera makeDefault position={[15, 10, 20]} zoom={3} />
          <OrbitControls makeDefault />
          <primitive object={new THREE.AxesHelper(5)} />
          {/* <Stars /> */}
          <Physics gravity={[0, -5, 0]}>
            <Mouse position={[0.5, 1.35, -1.8]} scale={0.28} />
            <Keyboard
              position={[0.5, 1.2, 0]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.07}
            />
            <Monitor position={[-1.8, 1.5, 0]} scale={0.1} />
            <Lamp
              receiveShadow
              castShadow
              position={[-1, 1.2, -3]}
              rotation={[0, -Math.PI / 5, 0]}
            />
            <Folder
              receiveShadow
              castShadow
              scale={4}
              rotation={[Math.PI / 2, Math.PI, -Math.PI / 2]}
            />
            <Table />
            <Floor position={[0, -2.5, 0]} />
            {/* <Cube position={[0.1, 5, 0]} />
            <Cube position={[0.2, 6, 0]} />
            <Cube position={[-0.5, 7, 0]} /> */}
            {/* <mesh ref={boxMesh} position={[0, 5, 0]} rotation={[Math.PI / 4, 0, 0]}>
            <boxGeometry args={[5, 5, 5]} />
            <meshStandardMaterial />
          </mesh> */}
            {/* <mesh rotation-x={1}>
          <sphereGeometry args={[15, 20, 20]} position={[2, 2, 0]} />
          <meshPhongMaterial />
        </mesh> */}
            {/* <ambientLight intensity={0.1} /> */}
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
