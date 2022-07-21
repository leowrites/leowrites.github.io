/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: KaramellGlass (https://sketchfab.com/KaramellGlass)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/desk-lamp-7377ec591df04445a1aae370017aaa13
title: Desk lamp
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";

function Light(props) {
  const lightRef = useRef();
  useHelper(lightRef, SpotLightHelper, "red");
  useEffect(() => {
    console.log(lightRef.current);
    lightRef.current.angle = Math.PI / 3;
    lightRef.current.decay = 2;
  }, []);
  return <spotLight ref={lightRef} {...props} />;
}

export default function Lamp({ ...props }) {
  const group = useRef();

  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + "/desk_lamp/scene.gltf"
  );
  return (
    <group>
      <Light
        color={"#fcd483"}
        castShadow
        position={[-0.7, 3, -2.74]}
        distance={50}
        intensity={0.4}
      />

      <group ref={group} {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.06}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[-3.39, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Cylinder001_04_-_Default_0"].geometry}
                material={materials["04_-_Default"]}
              />
            </group>
            <group position={[-7.97, 2.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Cylinder003_04_-_Default_0"].geometry}
                material={materials["04_-_Default"]}
              />
            </group>
            <group position={[-4.99, 32.56, 0]} rotation={[Math.PI, 0, 2.45]}>
              <group position={[0, 0, -0.76]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["Box009_01_-_Default_0"].geometry}
                  material={materials["01_-_Default"]}
                />
              </group>
            </group>
            <group
              position={[1.84, 36.85, 0]}
              rotation={[-Math.PI / 2, Math.PI / 2, 0]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Cylinder004_04_-_Default_0"].geometry}
                material={materials["04_-_Default"]}
              />
            </group>
            <group position={[8.67, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Cylinder005_01_-_Default_0"].geometry}
                material={materials["01_-_Default"]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Cylinder005_Material_#13_0"].geometry}
                material={materials.Material_13}
              />
            </group>
            <group position={[-3.39, 1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Cylinder006_01_-_Default_0"].geometry}
                material={materials["01_-_Default"]}
              />
            </group>
            <group
              position={[-8.39, 6.92, -0.68]}
              rotation={[Math.PI, 0, -Math.PI]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Sphere001_03_-_Default_0"].geometry}
                material={materials["03_-_Default"]}
              />
            </group>
            <group
              position={[-13.34, 26.48, 0]}
              rotation={[-Math.PI, 0, -1.83]}
            >
              <group position={[0.09, 1.04, -1]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["Object003_01_-_Default_0"].geometry}
                  material={materials["01_-_Default"]}
                />
              </group>
            </group>
            <group
              position={[-14.05, 26.07, 0]}
              rotation={[-Math.PI, 0, -1.83]}
            >
              <group position={[0.09, 1.04, -1]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["Object004_01_-_Default_0"].geometry}
                  material={materials["01_-_Default"]}
                />
              </group>
            </group>
            <group
              position={[-14.05, 26.07, 0]}
              rotation={[-Math.PI, 0, -1.83]}
            >
              <group position={[0.09, 1.04, -1]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["Object006_01_-_Default_0"].geometry}
                  material={materials["01_-_Default"]}
                />
              </group>
            </group>
            <group position={[-4.84, 9.16, -1.75]} rotation={[0, 0, 1.85]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Spring013_02_-_Default_0"].geometry}
                material={materials["02_-_Default"]}
              />
            </group>
            <group
              position={[-13.49, 26.56, 0]}
              rotation={[-Math.PI, 0, -1.83]}
            >
              <group position={[0.09, 1.04, -1]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["Object008_04_-_Default_0"].geometry}
                  material={materials["04_-_Default"]}
                />
              </group>
            </group>
            <group position={[-8.08, 2.39, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Object012_04_-_Default_0"].geometry}
                material={materials["04_-_Default"]}
              />
            </group>
            <group position={[-8.12, 2.39, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Object013_03_-_Default_0"].geometry}
                material={materials["03_-_Default"]}
              />
            </group>
            <group position={[8.67, 0.49, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Object014_04_-_Default_0"].geometry}
                material={materials["04_-_Default"]}
              />
            </group>
            <group
              position={[5.84, 36.88, -0.67]}
              rotation={[Math.PI / 2, -Math.PI / 2, 0]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Sphere017_03_-_Default_0"].geometry}
                material={materials["03_-_Default"]}
              />
            </group>
            <group
              position={[2.42, 37.55, -4.68]}
              rotation={[Math.PI, 0, -2.79]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Cylinder008_04_-_Default_0"].geometry}
                material={materials["04_-_Default"]}
              />
            </group>
            <group position={[2.52, 35.88, 8.43]} scale={[-1, 1, 1]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Object015_04_-_Default_0"].geometry}
                material={materials["04_-_Default"]}
              />
            </group>
            <group
              position={[1.88, 36.06, 1.64]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Box010_04_-_Default_0"].geometry}
                material={materials["04_-_Default"]}
              />
            </group>
            <group
              position={[1.88, 36.06, 1.64]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Object016_04_-_Default_0"].geometry}
                material={materials["04_-_Default"]}
              />
            </group>
            <group
              position={[-13.68, 28.67, 0]}
              rotation={[Math.PI, 0, -Math.PI]}
              scale={[1, 1, 1.24]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Line002_04_-_Default_0"].geometry}
                material={materials["04_-_Default"]}
              />
            </group>
            <group position={[-4.99, 32.56, 0]} rotation={[Math.PI, 0, 2.45]}>
              <group position={[0, 0, -0.76]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["Object017_04_-_Default_0"].geometry}
                  material={materials["04_-_Default"]}
                />
              </group>
            </group>
            <group position={[-15.81, 26.05, 0]} rotation={[Math.PI, 0, 2.45]}>
              <group position={[-12.5, -1.83, -0.76]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["Object018_01_-_Default_0"].geometry}
                  material={materials["01_-_Default"]}
                />
              </group>
            </group>
            <group position={[-9.13, 7.29, 0]} rotation={[-Math.PI, 0, -0.68]}>
              <group position={[-12.5, -1.83, -0.76]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["Object019_04_-_Default_0"].geometry}
                  material={materials["04_-_Default"]}
                />
              </group>
            </group>
            <group
              position={[5.84, 36.88, -0.67]}
              rotation={[Math.PI / 2, -Math.PI / 2, 0]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Object020_04_-_Default_0"].geometry}
                material={materials["04_-_Default"]}
              />
            </group>
            <group
              position={[-13.49, 26.56, 0]}
              rotation={[-Math.PI, 0, -1.83]}
            >
              <group position={[0.09, 1.04, -1]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["Object021_04_-_Default_0"].geometry}
                  material={materials["04_-_Default"]}
                />
              </group>
            </group>
            <group position={[8.65, 29.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Sphere020_05_-_Default_0"].geometry}
                material={materials["05_-_Default"]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere020_Ceramic_0.geometry}
                material={materials.Ceramic}
              />
            </group>
            <group position={[19.8, 0, 4.4]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["Box011_03_-_Default_0"].geometry}
                material={materials["03_-_Default"]}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/scene.gltf");
