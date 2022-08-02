import useSpline from "@splinetool/r3f-spline";
import { Html, useCursor } from "@react-three/drei";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Typography";

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/EpG-7UYZUbq2JgVT/scene.splinecode"
  );
  const [hover, setHover] = useState(false);
  useCursor(hover);
  function handleHover(e) {
    console.log(e.target);
    setHover(true);
  }
  function handleUnhover(e) {
    setHover(false);
  }
  return (
    <group {...props} dispose={null}>
      <group name="Notebook Cube" position={[65, 430.94, 315.37]} scale={1.27}>
        <group
          name="Display Sign 2"
          position={[24.86, 0.59, -12.91]}
          scale={0.97}
        >
          <mesh
            name="Rectangle 4"
            geometry={nodes["Rectangle 4"].geometry}
            material={materials.white}
            castShadow
            receiveShadow
            position={[-1, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1, 1, 1.79]}
          />
          <group
            name="Text 4"
            position={[1.18, 1.1, -1.29]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1.52, 1.57, 3.05]}
          >
            <mesh
              name="A"
              geometry={nodes.A.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-10.69, -1.81, 0]}
            />
            <mesh
              name="b"
              geometry={nodes.b.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-7.99, -1.81, 0]}
            />
            <mesh
              name="o"
              geometry={nodes.o.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-5.63, -1.81, 0]}
            />
            <mesh
              name="u"
              geometry={nodes.u.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-3.26, -1.81, 0]}
            />
            <mesh
              name="t"
              geometry={nodes.t.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-0.89, -1.81, 0]}
            />
            <mesh
              name="M"
              geometry={nodes.M.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[1.58, -1.81, 0]}
            />
            <mesh
              name="e"
              geometry={nodes.e.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[5.24, -1.81, 0]}
            />
          </group>
        </group>
        <group
          name="notebook"
          position={[-0.31, 0, -12.4]}
          rotation={[-0.27, 0.62, 0.21]}
          scale={0.06}
        >
          <mesh
            name="paper"
            geometry={nodes.paper.geometry}
            material={materials.white}
            castShadow
            receiveShadow
            position={[15.84, 1.64, -5.66]}
            rotation={[-Math.PI, 0, 0]}
            scale={[1, 1.01, 0.99]}
          />
          <group name="covers" position={[12.22, 0.29, -6.18]}>
            <mesh
              name="covers1"
              geometry={nodes.covers1.geometry}
              material={materials.cover}
              castShadow
              receiveShadow
              rotation={[0.18, -0.65, -0.06]}
              scale={16.34}
            />
          </group>
          <mesh
            name="rings"
            geometry={nodes.rings.geometry}
            material={materials.rings}
            castShadow
            receiveShadow
            position={[-205.13, 9.66, -0.15]}
            rotation={[0.18, -0.65, -0.06]}
            scale={15.34}
          />
        </group>
      </group>
      <group
        name="Rocket Cube"
        position={[-53.81, 457.14, 315.35]}
        scale={1.24}
      >
        <group name="Display Sign 3" position={[24.18, -0.44, 0.27]}>
          <mesh
            name="Rectangle 41"
            geometry={nodes["Rectangle 41"].geometry}
            material={materials.white}
            castShadow
            receiveShadow
            position={[-1, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1, 1, 1.79]}
          />
          <group
            name="Text 41"
            position={[0.93, 4.22, -1.29]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1.52, 1.57, 3.05]}
          >
            <mesh
              name="M1"
              geometry={nodes.M1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-10.69, -1.81, 0]}
            />
            <mesh
              name="y"
              geometry={nodes.y.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-7.03, -1.81, 0]}
            />
            <mesh
              name="P"
              geometry={nodes.P.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-10.69, -6.31, 0]}
            />
            <mesh
              name="r"
              geometry={nodes.r.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-8.02, -6.31, 0]}
            />
            <mesh
              name="o1"
              geometry={nodes.o1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-6.59, -6.31, 0]}
            />
            <mesh
              name="j"
              geometry={nodes.j.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-4.23, -6.31, 0]}
            />
            <mesh
              name="j1"
              geometry={nodes.j1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-4.23, -6.31, 0]}
            />
            <mesh
              name="e1"
              geometry={nodes.e1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-3.15, -6.31, 0]}
            />
            <mesh
              name="c"
              geometry={nodes.c.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-0.95, -6.31, 0]}
            />
            <mesh
              name="t1"
              geometry={nodes.t1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[1.26, -6.31, 0]}
            />
            <mesh
              name="s"
              geometry={nodes.s.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[2.7, -6.31, 0]}
            />
          </group>
        </group>
        <group
          name="Falcon Heavy"
          position={[1.42, 6.1, -5.72]}
          rotation={[-0.48, 0.7, -0.07]}
          scale={[0.06, 0.05, 0.05]}
        >
          <group name="Text 3" position={[26.82, 175.84, 29.95]}>
            <mesh
              name="F"
              geometry={nodes.F.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-50, 26, 0]}
            />
            <mesh
              name="H"
              geometry={nodes.H.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-37.06, 26, 0]}
            />
          </group>
          <group name="Text 2" position={[33.44, -193.17, 24.06]}>
            <mesh
              name="S"
              geometry={nodes.S.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-50, 26, 0]}
            />
            <mesh
              name="P1"
              geometry={nodes.P1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-50, 2, 0]}
            />
            <mesh
              name="A1"
              geometry={nodes.A1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-50, -22, 0]}
            />
            <mesh
              name="C"
              geometry={nodes.C.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-50, -46, 0]}
            />
            <mesh
              name="E"
              geometry={nodes.E.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-50, -70, 0]}
            />
            <mesh
              name="X"
              geometry={nodes.X.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-50, -94, 0]}
            />
          </group>
          <mesh
            name="Merged Geometry"
            geometry={nodes["Merged Geometry"].geometry}
            material={materials["Merged Geometry Material"]}
            castShadow
            receiveShadow
            position={[-17.24, -11.2, 0.32]}
            rotation={[0.64, -0.57, 0.44]}
            scale={[18.42, 18.72, 18.61]}
          />
          <group
            name="fire 3"
            position={[-60.87, -404.82, 0.84]}
            rotation={[-Math.PI, 0, 0.01]}
            scale={[0.15, 0.44, 0.15]}
          >
            <mesh
              name="Cube 3"
              geometry={nodes["Cube 3"].geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[-5.01, -200.65, -115.81]}
              rotation={[Math.PI, 0, -Math.PI]}
              scale={[0.91, 0.81, 0.21]}
            />
            <mesh
              name="Cube 5"
              geometry={nodes["Cube 5"].geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[-114.58, -215.6, 16.33]}
              rotation={[1.01, -1.22, 1.01]}
              scale={[0.81, 0.73, 0.24]}
            />
            <mesh
              name="Cube 6"
              geometry={nodes["Cube 6"].geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[113.69, -226.1, -4.17]}
              rotation={[1.49, 1.19, -1.48]}
              scale={[0.81, 0.81, 0.26]}
            />
            <mesh
              name="Cube 2"
              geometry={nodes["Cube 2"].geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[0.36, -213.06, 114.7]}
              scale={[0.81, 0.81, 0.26]}
            />
            <mesh
              name="Cube 4"
              geometry={nodes["Cube 4"].geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[-3.75, -115.02, -3.22]}
              rotation={[2.81, -1.29, 2.93]}
              scale={1.66}
            />
            <mesh
              name="Cube"
              geometry={nodes.Cube.geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[0.36, -99.16, 0.92]}
              scale={1.58}
            />
          </group>
          <group
            name="fire 2"
            position={[41, -400.58, 0.84]}
            rotation={[-Math.PI, 0, 0]}
            scale={[0.15, 0.43, 0.15]}
          >
            <mesh
              name="Cube 31"
              geometry={nodes["Cube 31"].geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[-5.01, -200.65, -115.81]}
              rotation={[Math.PI, 0, -Math.PI]}
              scale={[0.91, 0.81, 0.21]}
            />
            <mesh
              name="Cube 51"
              geometry={nodes["Cube 51"].geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[-114.58, -215.6, 16.33]}
              rotation={[1.01, -1.22, 1.01]}
              scale={[0.81, 0.73, 0.24]}
            />
            <mesh
              name="Cube 61"
              geometry={nodes["Cube 61"].geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[113.69, -226.1, -4.17]}
              rotation={[1.49, 1.19, -1.48]}
              scale={[0.81, 0.81, 0.26]}
            />
            <mesh
              name="Cube 21"
              geometry={nodes["Cube 21"].geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[0.36, -213.06, 114.7]}
              scale={[0.81, 0.81, 0.26]}
            />
            <mesh
              name="Cube 41"
              geometry={nodes["Cube 41"].geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[-3.75, -115.02, -3.22]}
              rotation={[2.81, -1.29, 2.93]}
              scale={1.66}
            />
            <mesh
              name="Cube1"
              geometry={nodes.Cube1.geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[0.36, -99.16, 0.92]}
              scale={1.58}
            />
          </group>
          <group
            name="fire"
            position={[-9.43, -414.92, 5.18]}
            rotation={[0, 0, -Math.PI]}
            scale={[0.15, 0.42, 0.15]}
          >
            <mesh
              name="Cube 32"
              geometry={nodes["Cube 32"].geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[-5.01, -200.65, -115.81]}
              rotation={[Math.PI, 0, -Math.PI]}
              scale={[0.91, 0.81, 0.21]}
            />
            <mesh
              name="Cube 52"
              geometry={nodes["Cube 52"].geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[-114.58, -215.6, 16.33]}
              rotation={[1.01, -1.22, 1.01]}
              scale={[0.81, 0.73, 0.24]}
            />
            <mesh
              name="Cube 62"
              geometry={nodes["Cube 62"].geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[113.69, -226.1, -4.17]}
              rotation={[1.49, 1.19, -1.48]}
              scale={[0.81, 0.81, 0.26]}
            />
            <mesh
              name="Cube 22"
              geometry={nodes["Cube 22"].geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[0.36, -213.06, 114.7]}
              scale={[0.81, 0.81, 0.26]}
            />
            <mesh
              name="Cube 42"
              geometry={nodes["Cube 42"].geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[-3.75, -115.02, -3.22]}
              rotation={[2.81, -1.29, 2.93]}
              scale={1.66}
            />
            <mesh
              name="Cube2"
              geometry={nodes.Cube2.geometry}
              material={materials["Untitled Material"]}
              castShadow
              receiveShadow
              position={[0.36, -99.16, 0.92]}
              scale={1.58}
            />
          </group>
        </group>
      </group>
      <group
        name="Uniplanit cube"
        position={[67.93, 560.94, 189.48]}
        scale={1.24}
      >
        <group name="Uniplanit Sign" position={[24.61, -59.61, -1.68]}>
          <mesh
            name="Rectangle 42"
            geometry={nodes["Rectangle 42"].geometry}
            material={materials.white}
            castShadow
            receiveShadow
            position={[-1, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1, 1, 1.79]}
          />
          <group
            name="Text 42"
            position={[0.83, 0.62, -1.4]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1.52, 1.57, 3.05]}
          >
            <mesh
              name="U"
              geometry={nodes.U.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-11.8, -1.76, 0]}
            />
            <mesh
              name="N"
              geometry={nodes.N.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-8.98, -1.76, 0]}
            />
            <mesh
              name="I"
              geometry={nodes.I.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-6.01, -1.76, 0]}
            />
            <mesh
              name="P2"
              geometry={nodes.P2.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-4.83, -1.76, 0]}
            />
            <mesh
              name="L"
              geometry={nodes.L.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-2.16, -1.76, 0]}
            />
            <mesh
              name="A2"
              geometry={nodes.A2.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[0.09, -1.76, 0]}
            />
            <mesh
              name="N1"
              geometry={nodes.N1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[2.79, -1.76, 0]}
            />
            <mesh
              name="I1"
              geometry={nodes.I1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[5.76, -1.76, 0]}
            />
            <mesh
              name="T"
              geometry={nodes.T.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[6.94, -1.76, 0]}
            />
          </group>
        </group>
        <group
          name="pencil"
          position={[3.59, -60.7, 4.13]}
          rotation={[2.22, -0.99, -0.6]}
          scale={0.11}
        >
          <mesh
            name="body"
            geometry={nodes.body.geometry}
            material={materials.body}
            castShadow
            receiveShadow
            position={[-0.12, 3.55, 0.23]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.07, 1.03, 0.07]}
          />
          <mesh
            name="toppart"
            geometry={nodes.toppart.geometry}
            material={materials.toppart}
            castShadow
            receiveShadow
            position={[-0.2, 172.18, 0]}
            scale={0.2}
          />
          <mesh
            name="graphite"
            geometry={nodes.graphite.geometry}
            material={materials.graphite}
            castShadow
            receiveShadow
            position={[-0.2, 172.24, 0]}
            scale={0.2}
          />
          <mesh
            name="metalruber"
            geometry={nodes.metalruber.geometry}
            material={materials.metal}
            castShadow
            receiveShadow
            position={[0, 172.6, 0]}
            scale={0.22}
          />
          <mesh
            name="rubber"
            geometry={nodes.rubber.geometry}
            material={materials.rubber}
            castShadow
            receiveShadow
            position={[0, 101.64, 0]}
            scale={0.18}
          />
        </group>
      </group>
    </group>
  );
}
