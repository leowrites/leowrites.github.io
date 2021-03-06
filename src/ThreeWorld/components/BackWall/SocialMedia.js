/*
  Auto-generated by Spline
*/

import useSpline from "@splinetool/r3f-spline";

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/QYTJMMZaJ-SgDwox/scene.splinecode"
  );
  return (
    <>
      <color attach="background" args={["#4b4d52"]} />
      <group {...props} dispose={null}>
        <group name="Github" position={[-231.08, 674.9, -294.75]} scale={6.39}>
          <mesh
            name="Shape 2"
            geometry={nodes["Shape 2"].geometry}
            material={materials.white}
            castShadow
            receiveShadow
            position={[-1.82, 1.93, -0.83]}
            scale={[0.85, 0.85, 1.31]}
          />
          <mesh
            name="Rectangle 17"
            geometry={nodes["Rectangle 17"].geometry}
            material={materials.Black}
            castShadow
            receiveShadow
            position={[-0.06, -0.83, -5.16]}
            scale={[0.03, 0.04, 0.15]}
          />
        </group>
        <group name="Mail" position={[-227.97, 541.75, -293.41]} scale={6.52}>
          <mesh
            name="Triangle 3"
            geometry={nodes["Triangle 3"].geometry}
            material={materials["Triangle 3 Material"]}
            castShadow
            receiveShadow
            position={[-0.06, -1.22, -0.16]}
            scale={[1.31, 1.37, 1.36]}
          />
          <mesh
            name="Triangle 2"
            geometry={nodes["Triangle 2"].geometry}
            material={materials["Triangle 2 Material"]}
            castShadow
            receiveShadow
            position={[-0.06, -0.3, -0.22]}
            rotation={[0, 0, Math.PI]}
            scale={[1.31, 1.37, 1.36]}
          />
          <mesh
            name="Rectangle 9"
            geometry={nodes["Rectangle 9"].geometry}
            material={materials["Rectangle 9 Material"]}
            castShadow
            receiveShadow
            position={[-0.07, -0.76, -0.74]}
            scale={0.92}
          />
          <mesh
            name="Rectangle 8"
            geometry={nodes["Rectangle 8"].geometry}
            material={materials["Rectangle 8 Material"]}
            castShadow
            receiveShadow
            position={[-0.07, -0.83, -0.9]}
            scale={1.1}
          />
          <mesh
            name="Rectangle 171"
            geometry={nodes["Rectangle 171"].geometry}
            material={materials["Rectangle 171 Material"]}
            castShadow
            receiveShadow
            position={[-0.06, -0.83, -5.09]}
            scale={[0.03, 0.04, 0.14]}
          />
        </group>
        <group
          name="Linkedin"
          position={[-307.36, 600.19, -303.08]}
          scale={6.52}
        >
          <mesh
            name="Rectangle 19"
            geometry={nodes["Rectangle 19"].geometry}
            material={materials.white}
            castShadow
            receiveShadow
            position={[0.23, -0.73, 0.29]}
            scale={[1.06, 1.06, 0.71]}
          />
          <mesh
            name="Rectangle 18"
            geometry={nodes["Rectangle 18"].geometry}
            material={materials.white}
            castShadow
            receiveShadow
            position={[-1.42, -0.77, 0.35]}
            scale={[1.06, 1.03, 0.72]}
          />
          <mesh
            name="Ellipse"
            geometry={nodes.Ellipse.geometry}
            material={materials.white}
            castShadow
            receiveShadow
            position={[-1.48, 1.96, 0.29]}
            scale={0.68}
          />
          <mesh
            name="Rectangle 172"
            geometry={nodes["Rectangle 172"].geometry}
            material={materials["Rectangle 172 Material"]}
            castShadow
            receiveShadow
            position={[0, -0.21, -3.67]}
            scale={[0.03, 0.04, 0.14]}
          />
        </group>
      </group>
    </>
  );
}
