import useSpline from "@splinetool/r3f-spline";
import React from "react";

const Face = React.forwardRef((props, ref) => {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/dTXRd3kKDlcMvvpL/scene.splinecode"
  );
  return (
    <>
      <group
        {...props}
        dispose={null}
        rotation={[-Math.PI / 10, Math.PI / 6, Math.PI / 16]}
        position={[20, 10, 0]}
        scale={[0.1, 0.1, 0.1]}
        ref={ref}
      >
        <group>
          <group name="Glasses" position={[0, 25, 30]}>
            <mesh
              name="Rectangle 2"
              geometry={nodes["Rectangle 2"].geometry}
              material={materials["Rectangle 2 Material"]}
              castShadow
              receiveShadow
              position={[-0.03, 2.97, -5.65]}
              scale={[1, 1, 5.56]}
            />
            <mesh
              name="Boolean 2"
              geometry={nodes["Boolean 2"].geometry}
              material={materials["Boolean 2 Material"]}
              castShadow
              receiveShadow
              position={[14.99, 1.7, 2.66]}
              rotation={[1.57, 0, -0.01]}
              scale={[0.34, 0.54, 0.5]}
            >
              <mesh
                name="Rectangle 3"
                geometry={nodes["Rectangle 3"].geometry}
                material={materials["Rectangle 3 Material"]}
                visible={false}
                castShadow
                receiveShadow
                position={[0, -11.92, 4.06]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[0.71, 0.71, 4.01]}
              />
              <mesh
                name="Rectangle 21"
                geometry={nodes["Rectangle 21"].geometry}
                material={materials["Rectangle 21 Material"]}
                visible={false}
                castShadow
                receiveShadow
                position={[0, -5.01, 4.06]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
            </mesh>
            <mesh
              name="Boolean"
              geometry={nodes.Boolean.geometry}
              material={materials["Boolean Material"]}
              castShadow
              receiveShadow
              position={[-14.99, 0.31, 2.85]}
              rotation={[1.57, 0, -0.01]}
              scale={[0.34, 0.54, 0.5]}
            >
              <mesh
                name="Rectangle 31"
                geometry={nodes["Rectangle 31"].geometry}
                material={materials["Rectangle 31 Material"]}
                visible={false}
                castShadow
                receiveShadow
                position={[0, -11.91, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[0.75, 0.73, 4.88]}
              />
              <mesh
                name="Rectangle 22"
                geometry={nodes["Rectangle 22"].geometry}
                material={materials["Rectangle 22 Material"]}
                visible={false}
                castShadow
                receiveShadow
                position={[0, -5, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
            </mesh>
            <group name="Leye" scale={1.38} position={[-15, 0, 0]}>
              <mesh
                name="Sphere copy 3"
                geometry={nodes["Sphere copy 3"].geometry}
                material={materials["Sphere copy 3 Material"]}
                castShadow
                receiveShadow
                position={[-0.21, 0.17, 1.55]}
                scale={[1.03, 1.02, 1.02]}
              />
              <mesh
                name="Sphere copy 31"
                geometry={nodes["Sphere copy 31"].geometry}
                material={materials["Sphere copy 31 Material"]}
                castShadow
                receiveShadow
                position={[0, 0, -0.24]}
                scale={[1.55, 1.54, 1.54]}
              />
            </group>
            <group name="Reye" scale={1.33} position={[15, 0, 0]}>
              <mesh
                name="Sphere copy 2"
                geometry={nodes["Sphere copy 2"].geometry}
                material={materials["Sphere copy 2 Material"]}
                castShadow
                receiveShadow
                position={[0.2, 0.16, 1.55]}
                scale={[1.03, 1.02, 1.02]}
              />
              <mesh
                name="Sphere copy"
                geometry={nodes["Sphere copy"].geometry}
                material={materials["Sphere copy Material"]}
                castShadow
                receiveShadow
                position={[0, 0, -0.24]}
                scale={[1.55, 1.54, 1.54]}
              />
            </group>
          </group>
        </group>

        <mesh
          name="Torus 2"
          geometry={nodes["Torus 2"].geometry}
          material={materials["Torus 2 Material"]}
          castShadow
          receiveShadow
          position={[-11.29, 30.47, 30.08]}
          rotation={[0.04, -0.13, -1.24]}
          scale={0.94}
        />
        <mesh
          name="Torus"
          geometry={nodes.Torus.geometry}
          material={materials["Torus Material"]}
          castShadow
          receiveShadow
          position={[14.68, 30.17, 30.3]}
          rotation={[-0.02, 0.27, -0.92]}
        />
        <mesh
          name="Cone copy"
          geometry={nodes["Cone copy"].geometry}
          material={materials["Cone copy Material"]}
          castShadow
          receiveShadow
          position={[0, 20, 30.16]}
          rotation={[-0.06, 0, 0]}
        />
        <mesh
          name="Cylinder copy 2"
          geometry={nodes["Cylinder copy 2"].geometry}
          material={materials["Cylinder copy 2 Material"]}
          castShadow
          receiveShadow
          position={[-1.9, 70, 0]}
          rotation={[-0.13, 0, -3.11]}
          scale={[1, 0.46, 1.1]}
        />
        <mesh
          name="Cylinder copy"
          geometry={nodes["Cylinder copy"].geometry}
          material={materials["Cylinder copy Material"]}
          castShadow
          receiveShadow
          position={[0, 0, 0]}
        />
      </group>
    </>
  );
});

export default Face;
