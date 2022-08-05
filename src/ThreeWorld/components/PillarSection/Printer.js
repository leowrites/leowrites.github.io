import useSpline from "@splinetool/r3f-spline";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/ADe86z1ehfNWJP6K/scene.splinecode"
  );
  const extruderRef = useRef();
  const railRef = useRef();
  useFrame(({ clock }) => {
    extruderRef.current.position.z = Math.sin(10 * clock.getElapsedTime()) * 10;
    railRef.current.position.y =
      Math.sin((1 / 2) * clock.getElapsedTime()) * 10;
    extruderRef.current.position.y = railRef.current.position.y;
  });

  return (
    <>
      <group {...props} dispose={null}>
        <group
          name="Printer"
          position={[-62.77, 542.6, 180.07]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={1.11}
        >
          <mesh
            name="Cube 16"
            geometry={nodes["Cube 16"].geometry}
            material={materials["Cube 16 Material"]}
            castShadow
            receiveShadow
            position={[-2.31, -32.1, -17.16]}
            scale={1.69}
          />
          <mesh
            name="Cube 161"
            geometry={nodes["Cube 161"].geometry}
            material={materials["Cube 161 Material"]}
            castShadow
            receiveShadow
            position={[-2.31, -32.1, 17.75]}
            scale={1.69}
          />
          <group
            ref={extruderRef}
            name="Extruder"
            position={[1.27, 5.37, -6.63]}
            scale={1.69}
          >
            <mesh
              name="Cone"
              geometry={nodes.Cone.geometry}
              material={materials["Cone Material"]}
              castShadow
              receiveShadow
              position={[0, -2.95, 0]}
              rotation={[Math.PI, 0, 0]}
              scale={0.69}
            />
            <mesh
              name="Cube 7"
              geometry={nodes["Cube 7"].geometry}
              material={materials["Cube 7 Material"]}
              castShadow
              receiveShadow
              position={[0, 0.64, 0]}
              rotation={[0, -Math.PI / 2, 0]}
            />
          </group>
          <mesh
            name="Rectangle 4"
            geometry={nodes["Rectangle 4"].geometry}
            material={materials["Rectangle 4 Material"]}
            castShadow
            receiveShadow
            position={[1.91, -29.58, 0.11]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={1.42}
          />
          <mesh
            name="Rectangle 41"
            geometry={nodes["Rectangle 41"].geometry}
            material={materials["Rectangle 41 Material"]}
            castShadow
            receiveShadow
            position={[2.9, -31.26, 0.11]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={1.58}
          />
          <mesh
            name="Cube 162"
            geometry={nodes["Cube 162"].geometry}
            material={materials["Cube 162 Material"]}
            castShadow
            receiveShadow
            position={[-32.87, -37.82, -0.43]}
            rotation={[-Math.PI / 2, -0.98, -Math.PI / 2]}
            scale={[2.44, 1.97, 1.97]}
          />
          <mesh
            name="Cube 163"
            geometry={nodes["Cube 163"].geometry}
            material={materials["Cube 163 Material"]}
            castShadow
            receiveShadow
            position={[-33.31, -37.44, -0.43]}
            rotation={[-Math.PI / 2, -0.98, -Math.PI / 2]}
            scale={[2.08, 1.69, 1.69]}
          />
          <mesh
            name="Cube 164"
            geometry={nodes["Cube 164"].geometry}
            material={materials["Industrial green"]}
            castShadow
            receiveShadow
            position={[0.27, -37.82, 0.11]}
            scale={[1.4, 1.4, 1.2]}
          />
          <mesh
            ref={railRef}
            name="Cube 165"
            geometry={nodes["Cube 165"].geometry}
            material={materials.Silver}
            castShadow
            receiveShadow
            position={[1.32, 6.56, -0.4]}
            scale={[0.52, 0.67, 12.05]}
          />
          <mesh
            name="Cube 166"
            geometry={nodes["Cube 166"].geometry}
            material={materials["Industrial green"]}
            castShadow
            receiveShadow
            position={[1.46, 39.25, 0.12]}
            scale={[1.05, 1.73, 12.32]}
          />
          <mesh
            name="Cube 167"
            geometry={nodes["Cube 167"].geometry}
            material={materials["Industrial green"]}
            castShadow
            receiveShadow
            position={[1.32, -2.77, 33.43]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.82, 1.69, 11.41]}
          />
          <mesh
            name="Cube 168"
            geometry={nodes["Cube 168"].geometry}
            material={materials["Industrial green"]}
            castShadow
            receiveShadow
            position={[1.32, -2.77, -33.43]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.82, 1.69, 11.41]}
          />
          {/* <group
            name="Text 4"
            position={[-34.11, -37, -0.5]}
            rotation={[-Math.PI / 2, -0.98, -Math.PI / 2]}
            scale={1.01}
          >
            <mesh
              name="P"
              geometry={nodes.P.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-5.01, 0.91, 0]}
            />
            <mesh
              name="r"
              geometry={nodes.r.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-4.12, 0.91, 0]}
            />
            <mesh
              name="i"
              geometry={nodes.i.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-3.64, 0.91, 0]}
            />
            <mesh
              name="i1"
              geometry={nodes.i1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-3.64, 0.91, 0]}
            />
            <mesh
              name="n"
              geometry={nodes.n.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-3.29, 0.91, 0]}
            />
            <mesh
              name="t"
              geometry={nodes.t.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-2.5, 0.91, 0]}
            />
            <mesh
              name="i2"
              geometry={nodes.i2.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-2.02, 0.91, 0]}
            />
            <mesh
              name="i3"
              geometry={nodes.i3.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-2.02, 0.91, 0]}
            />
            <mesh
              name="n1"
              geometry={nodes.n1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-1.67, 0.91, 0]}
            />
            <mesh
              name="g"
              geometry={nodes.g.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-0.89, 0.91, 0]}
            />
            <mesh
              name="."
              geometry={nodes["."].geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-0.1, 0.91, 0]}
            />
            <mesh
              name=".1"
              geometry={nodes[".1"].geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[0.28, 0.91, 0]}
            />
            <mesh
              name=".2"
              geometry={nodes[".2"].geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[0.65, 0.91, 0]}
            />
            <mesh
              name="P1"
              geometry={nodes.P1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-5.01, -0.59, 0]}
            />
            <mesh
              name="e"
              geometry={nodes.e.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-4.12, -0.59, 0]}
            />
            <mesh
              name="r1"
              geometry={nodes.r1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-3.39, -0.59, 0]}
            />
            <mesh
              name="s"
              geometry={nodes.s.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-2.91, -0.59, 0]}
            />
            <mesh
              name="o"
              geometry={nodes.o.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-2.18, -0.59, 0]}
            />
            <mesh
              name="n2"
              geometry={nodes.n2.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-1.39, -0.59, 0]}
            />
            <mesh
              name="a"
              geometry={nodes.a.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-0.61, -0.59, 0]}
            />
            <mesh
              name="l"
              geometry={nodes.l.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[0.16, -0.59, 0]}
            />
            <mesh
              name="P2"
              geometry={nodes.P2.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-5.01, -2.09, 0]}
            />
            <mesh
              name="o1"
              geometry={nodes.o1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-4.12, -2.09, 0]}
            />
            <mesh
              name="r2"
              geometry={nodes.r2.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-3.33, -2.09, 0]}
            />
            <mesh
              name="t1"
              geometry={nodes.t1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-2.85, -2.09, 0]}
            />
            <mesh
              name="f"
              geometry={nodes.f.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-2.37, -2.09, 0]}
            />
            <mesh
              name="o2"
              geometry={nodes.o2.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-1.9, -2.09, 0]}
            />
            <mesh
              name="l1"
              geometry={nodes.l1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-1.11, -2.09, 0]}
            />
            <mesh
              name="i4"
              geometry={nodes.i4.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-0.76, -2.09, 0]}
            />
            <mesh
              name="i5"
              geometry={nodes.i5.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-0.76, -2.09, 0]}
            />
            <mesh
              name="o3"
              geometry={nodes.o3.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-0.41, -2.09, 0]}
            />
          </group> */}
        </group>
      </group>
    </>
  );
}
