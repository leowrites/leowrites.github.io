import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  MeshReflectorMaterial,
  SpotLight,
} from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { Table } from "./Table";
import { Suspense, useEffect, useRef, useState } from "react";
import Folder from "./Folder";
import Chair from "./Chair";
import "ThreeWorld/ThreeWorld.css";
import Monitor from "./Monitor";
import Lamp from "./Lamp";
import Keyboard from "./Keyboard";
import Mouse from "./Mouse";
import { selectView } from "./viewSlice";
import { useSelector } from "react-redux";
import Rope from "./Rope";
import Paper from "./Paper";
import { Vector3 } from "three";

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
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <MeshReflectorMaterial
        blur={[300, 300]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="lightblue"
        metalness={2}
      />
    </mesh>
  );
}

function OverheadLight(props) {
  const lightRef = useRef();
  return (
    <SpotLight
      {...props}
      position={[0, 25, 0]}
      distance={50}
      castShadow
      color={"lightblue"}
      intensity={0.6}
      angle={3}
      ref={lightRef}
    />
  );
}

function HangingSpotLight(props) {
  const lightRef = useRef();
  useEffect(() => {
    // lightRef.current.target.position.lerp(new Vector3(-5, 10, 0), 0.1)
    // lightRef.current.target.updateMatrixWorld()
  }, []);
  return (
    <SpotLight
      ref={lightRef}
      {...props}
      color={"white"}
      distance={15}
      intensity={50}
      angle={1}
    />
  );
}

export default function Scene({ clickedOnce }) {
  const [stopAnimation, setStopAnimation] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [moveCameraToDesk, setMoveCameraToDesk] = useState(false);
  const state = useThree();
  const folderRef = useRef();
  const view = useSelector(selectView);
  const lookAtFolder = (state, folderRef) => {
    state.controls.object.lookAt(folderRef.current.position);
    state.camera.updateProjectionMatrix();
    state.controls.update();
    // state.controls.target.set(folderRef.current.position)
    // state.camera.updateProjectionMatrix();
  };

  const moveCameraInFrontOfDesk = (state) => {
    state.camera.position.set(5, 2.5, 0);
    state.camera.lookAt(0, 2, 0);
    state.camera.updateProjectionMatrix();
  };

  const onFocus = () => {
    setIsInteracting(true);
  };
  const onBlur = () => {
    setIsInteracting(false);
  };
  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    setIsInteracting(true);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);
  useEffect(() => {
    if (view === "folder") {
      lookAtFolder(state, folderRef);
    }
  }, [view]);
  useFrame((state) => {
    clickedOnce && setStopAnimation(true);
    if (stopAnimation && !moveCameraToDesk) {
      moveCameraInFrontOfDesk(state);
      setMoveCameraToDesk(true);
    } else if (!stopAnimation) {
      state.camera.lookAt(0, 0, 0);
      state.camera.position.set(
        15 * Math.sin(state.clock.getElapsedTime() * 0.05),
        5,
        15 * Math.cos(state.clock.getElapsedTime() * 0.05)
      );
    }
    // if(view === 'folder'){
    //     lookAtFolder()
    // }
  });
  //   useFrame((state) => {
  //     !stopAnimation && state.camera.position.set(15 + 15 * Math.sin(scrollOffset), 10, 20 * Math.cos(scrollOffset + 1))
  //   })
  //   useEffect(() => {
  //     gsap.registerPlugin(ScrollTrigger);
  //     gsap.to(titleSectionRef.current, {
  //       scrollTrigger: {
  //         trigger: titleSectionRef.current,
  //         start: "top top",
  //         onUpdate: ({progress, direction}) => {
  //           setScrollOffset(progress)
  //         },
  //         onLeave: () => {setStopAnimation(true)}
  //       }
  //     })
  //   }, [])
  return (
    <Suspense fallback={null}>
      <color attach="background" args={["black"]} />
      <PerspectiveCamera
        fov={75}
        makeDefault
        position={[15, 10, 20]}
        zoom={1}
      />
      {moveCameraToDesk && (
        <OrbitControls enabled={isInteracting} makeDefault target={[0, 3, 0]} />
      )}
      <fog attach={"fog"} color={"black"} near={20} far={150} />
      <OverheadLight />
      {/* <primitive object={new THREE.AxesHelper(5)} /> */}
      <ambientLight intensity={0.01} />
      {/* <Stars /> */}
      <HangingSpotLight position={[-10, 15, 10]} />
      <Physics gravity={[0, -5, 0]}>
        <Rope position={[-5, 2.5, 0.5]} />
        <Rope position={[-3, 3, 1.25]} />
        <Rope position={[-4, 3, -1.25]} />
        <Rope position={[-3, 3, -0.5]} />
        <Chair
          scale={0.05}
          position={[0.8, -1.8, 1.8]}
          rotation={[0, -Math.PI / 3, 0]}
        />
        <Mouse position={[0.5, 1.35, -1.8]} scale={0.28} />
        <Keyboard
          position={[0.5, 1.2, 0]}
          rotation={[0, Math.PI / 2, 0]}
          scale={0.07}
        />
        <Monitor position={[-1.8, 1.45, 0]} scale={0.1} />
        <Paper
          rotation={[0, Math.PI / 6, 0]}
          position={[1, 1.25, 2.5]}
          scale={0.05}
        />
        <Paper
          rotation={[0, Math.PI / 3, 0]}
          position={[1.2, 1.26, 2.5]}
          scale={0.05}
        />
        <Lamp
          receiveShadow
          castShadow
          position={[-1, 1.2, -3]}
          rotation={[0, -Math.PI / 5, 0]}
        />
        <Folder
          folderRef={folderRef}
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
      </Physics>
    </Suspense>
  );
}
