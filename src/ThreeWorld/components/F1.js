import useSpline from "@splinetool/r3f-spline";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Scene({ ...props }) {
  const carRef = useRef();
  const line1Ref = useRef();
  const line2Ref = useRef();
  const line3Ref = useRef();
  const line4Ref = useRef();
  const line5Ref = useRef();
  const line6Ref = useRef();
  const line7Ref = useRef();
  const line8Ref = useRef();
  const line9Ref = useRef();
  const line10Ref = useRef();
  const refs = [
    line1Ref,
    line2Ref,
    line3Ref,
    line4Ref,
    line5Ref,
    line6Ref,
    line7Ref,
    line8Ref,
    line9Ref,
    line10Ref,
  ];
  let direction = 1;
  useFrame(({ clock }) => {
    // console.log(clock)
    // carRef.current.position.x += Math.sin(clock.getElapsedTime()) * 0.2;
    if (carRef.current.position.x >= 280) {
      direction = -1;
    } else if (carRef.current.position.x <= 220) {
      direction = 1;
    }

    carRef.current.position.x +=
      Math.sin(clock.getElapsedTime()) * 0.2 * direction;
    refs.forEach((ref) => {
      if (ref.current.position.z >= 150) {
        ref.current.position.z = -155;
      }
      ref.current.position.z += 5;
    });
    // if (linesRef.current.position.z < 350) {
    //   linesRef.current.position.z += 1;
    // } else {
    //   linesRef.current.position.z -= 350;
    //   linesRef.current.visible = false;
    // }
  });
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/hNpIMhMxlAgWJWG0/scene.splinecode"
  );
  return (
    <group {...props} dispose={null}>
      <group
        name="Track"
        position={[265.78, 173.55, 101.22]}
        scale={[1.11, 1.11, 1.41]}
      >
        <mesh
          name="Rectangle 6"
          ref={line1Ref}
          geometry={nodes["Rectangle 6"].geometry}
          material={materials["Line Color"]}
          castShadow
          receiveShadow
          position={[2.16, 15.74, 153.24]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.9, 0.71, 0.9]}
        />
        <mesh
          ref={line2Ref}
          name="Rectangle 5"
          geometry={nodes["Rectangle 5"].geometry}
          material={materials["Line Color"]}
          castShadow
          receiveShadow
          position={[2.16, 15.74, 77.28]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.9, 0.71, 0.9]}
        />
        <mesh
          ref={line3Ref}
          name="Rectangle 4"
          geometry={nodes["Rectangle 4"].geometry}
          material={materials["Line Color"]}
          castShadow
          receiveShadow
          position={[2.16, 15.74, 39.24]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.9, 0.71, 0.9]}
        />
        <mesh
          ref={line4Ref}
          name="Rectangle 3"
          geometry={nodes["Rectangle 3"].geometry}
          material={materials["Line Color"]}
          castShadow
          receiveShadow
          position={[2.16, 15.74, -37.68]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.9, 0.71, 0.9]}
        />
        <mesh
          ref={line5Ref}
          name="Rectangle 2"
          geometry={nodes["Rectangle 2"].geometry}
          material={materials["Line Color"]}
          castShadow
          receiveShadow
          position={[2.16, 15.74, -115.22]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.9, 0.71, 0.9]}
        />
        <mesh
          ref={line6Ref}
          name="Rectangle 61"
          geometry={nodes["Rectangle 61"].geometry}
          material={materials["Line Color"]}
          castShadow
          receiveShadow
          position={[2.16, 15.74, 115.2]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.9, 0.71, 0.9]}
        />
        <mesh
          ref={line7Ref}
          name="Rectangle 51"
          geometry={nodes["Rectangle 51"].geometry}
          material={materials["Line Color"]}
          castShadow
          receiveShadow
          position={[2.16, 15.74, 39.24]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.9, 0.71, 0.9]}
        />
        <mesh
          ref={line8Ref}
          name="Rectangle 41"
          geometry={nodes["Rectangle 41"].geometry}
          material={materials["Line Color"]}
          castShadow
          receiveShadow
          position={[2.16, 15.74, 1.21]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.9, 0.71, 0.9]}
        />
        <mesh
          ref={line9Ref}
          name="Rectangle 31"
          geometry={nodes["Rectangle 31"].geometry}
          material={materials["Line Color"]}
          castShadow
          receiveShadow
          position={[2.16, 15.74, -75.71]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.9, 0.71, 0.9]}
        />
        <mesh
          ref={line10Ref}
          name="Rectangle"
          geometry={nodes.Rectangle.geometry}
          material={materials["Line Color"]}
          castShadow
          receiveShadow
          position={[2.16, 15.74, -153.25]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.9, 0.71, 0.9]}
        />
        <mesh
          name="road_block"
          geometry={nodes.road_block.geometry}
          material={materials["road_block Material"]}
          castShadow
          receiveShadow
          position={[0, -0.1, -0.11]}
          scale={[0.58, 0.28, 1.29]}
        />
      </group>
      <group
        ref={carRef}
        name="F1"
        position={[265.92, 207.66, 165.94]}
        scale={0.76}
      >
        <mesh
          name="Rear Wing"
          geometry={nodes["Rear Wing"].geometry}
          material={materials["Car Body"]}
          castShadow
          receiveShadow
          position={[-1, 11.87, 88.2]}
          scale={1.46}
        />
        <group name="Wheels" position={[0, -6.01, 13.3]}>
          <group
            name="Wheel 4"
            position={[-40.97, 0, 66.07]}
            rotation={[0, 0, Math.PI]}
            scale={1.15}
          >
            <mesh
              name="Ellipse 2"
              geometry={nodes["Ellipse 2"].geometry}
              material={materials.Black}
              castShadow
              receiveShadow
              position={[11.03, 0.03, 0.12]}
              rotation={[0, Math.PI / 2, 0]}
              scale={1.34}
            />
            <mesh
              name="Ellipse"
              geometry={nodes.Ellipse.geometry}
              material={materials["Wheel Side Color"]}
              castShadow
              receiveShadow
              position={[10.93, 0.04, 0.12]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <mesh
              name="Cylinder 5"
              geometry={nodes["Cylinder 5"].geometry}
              material={materials.Black}
              castShadow
              receiveShadow
              position={[-0.05, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
              scale={0.87}
            />
          </group>
          <group
            name="Wheel 3"
            position={[-39.3, 0, -68.5]}
            rotation={[0, 0, Math.PI]}
            scale={1.15}
          >
            <mesh
              name="Ellipse 21"
              geometry={nodes["Ellipse 21"].geometry}
              material={materials.Black}
              castShadow
              receiveShadow
              position={[11.03, 0.03, 0.12]}
              rotation={[0, Math.PI / 2, 0]}
              scale={1.34}
            />
            <mesh
              name="Ellipse1"
              geometry={nodes.Ellipse1.geometry}
              material={materials["Wheel Side Color"]}
              castShadow
              receiveShadow
              position={[10.93, 0.04, 0.12]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <mesh
              name="Cylinder 51"
              geometry={nodes["Cylinder 51"].geometry}
              material={materials.Black}
              castShadow
              receiveShadow
              position={[-0.05, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
              scale={0.87}
            />
          </group>
          <group name="Wheel 2" position={[37.93, 0, -68.5]} scale={1.15}>
            <mesh
              name="Ellipse 22"
              geometry={nodes["Ellipse 22"].geometry}
              material={materials.Black}
              castShadow
              receiveShadow
              position={[11.03, 0.03, 0.12]}
              rotation={[0, Math.PI / 2, 0]}
              scale={1.34}
            />
            <mesh
              name="Ellipse2"
              geometry={nodes.Ellipse2.geometry}
              material={materials["Wheel Side Color"]}
              castShadow
              receiveShadow
              position={[10.93, 0.04, 0.12]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <mesh
              name="Cylinder 52"
              geometry={nodes["Cylinder 52"].geometry}
              material={materials.Black}
              castShadow
              receiveShadow
              position={[-0.05, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
              scale={0.87}
            />
          </group>
          <group name="Wheel" position={[39.38, 0, 65.38]} scale={1.15}>
            <mesh
              name="Ellipse 23"
              geometry={nodes["Ellipse 23"].geometry}
              material={materials.Black}
              castShadow
              receiveShadow
              position={[11.13, 0.03, 0.12]}
              rotation={[0, Math.PI / 2, 0]}
              scale={1.34}
            />
            <mesh
              name="Ellipse3"
              geometry={nodes.Ellipse3.geometry}
              material={materials["Wheel Side Color"]}
              castShadow
              receiveShadow
              position={[11.03, 0.04, 0.12]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <mesh
              name="Cylinder 53"
              geometry={nodes["Cylinder 53"].geometry}
              material={materials.Black}
              castShadow
              receiveShadow
              position={[-0.05, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
              scale={0.87}
            />
          </group>
        </group>
        <group
          name="Chasis"
          position={[0.23, -7.73, -3.35]}
          scale={[1, 1.28, 1]}
        >
          <mesh
            name="wheel_connect"
            geometry={nodes.wheel_connect.geometry}
            material={materials.Black}
            castShadow
            receiveShadow
            position={[-1.23, -1.13, 14.96]}
            scale={[1.46, 1.14, 1.46]}
          />
          <mesh
            name="Front Wing"
            geometry={nodes["Front Wing"].geometry}
            material={materials["Car Body"]}
            castShadow
            receiveShadow
            position={[-1.27, -3.76, -87.47]}
            scale={[1.46, 1.14, 1.46]}
          />
          <mesh
            name="Shape 3"
            geometry={nodes["Shape 3"].geometry}
            material={materials["Car Body"]}
            castShadow
            receiveShadow
            position={[7.27, 6.66, -8.55]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[0.83, 0.78, 1]}
          />
          <mesh
            name="Boolean"
            geometry={nodes.Boolean.geometry}
            material={materials["Car Body"]}
            castShadow
            receiveShadow
            position={[-1.17, 0, -6.79]}
            scale={[1, 0.78, 1]}
          >
            <mesh
              name="Rectangle 52"
              geometry={nodes["Rectangle 52"].geometry}
              material={materials["Car Body"]}
              visible={false}
              castShadow
              receiveShadow
              position={[10.04, -10.58, 22.66]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[1, 1, 3.02]}
            />
            <mesh
              name="Rectangle 53"
              geometry={nodes["Rectangle 53"].geometry}
              material={materials["Car Body"]}
              visible={false}
              castShadow
              receiveShadow
              position={[-10.04, 10.54, 22.66]}
              rotation={[Math.PI / 2, 0, -Math.PI]}
              scale={[1, 1, 3.01]}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
