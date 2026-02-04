import React from "react";
import useSpline from "@splinetool/r3f-spline";
const Rocket = React.forwardRef((props, ref) => {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/Ibj-1yMp8ThsxUxp/scene.splinecode"
  );
  return (
    <>
      <group {...props} dispose={null}>
        <group
          ref={ref}
          name="Falcon Heavy"
          position={[-100.42, -80.1, -5.72]}
          rotation={[-Math.PI / 3, 0, -0.07]}
          scale={[0.2, 0.2, 0.2]}
        >
          <group name="Text 3" position={[26.82, 175.84, 30.95]}>
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
              name="P"
              geometry={nodes.P.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-50, 2, 0]}
            />
            <mesh
              name="A"
              geometry={nodes.A.geometry}
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
    </>
  );
});

export default Rocket;
