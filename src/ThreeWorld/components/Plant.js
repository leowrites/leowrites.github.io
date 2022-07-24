/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Hristo (https://sketchfab.com/arabadzhiyski)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/grass-in-a-plant-pot-43627b161948443d80f1227cbeb83363
title: Grass in a plant pot
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + "/Plant/scene.gltf"
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.8}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            receiveShadow
            castShadow
            geometry={nodes.merge2_pot_0.geometry}
            material={materials.material}
          />
          <mesh
            receiveShadow
            castShadow
            geometry={nodes.merge2_pot_0_1.geometry}
            material={materials.material}
          />
          <mesh
            receiveShadow
            castShadow
            geometry={nodes.merge2_grass_0.geometry}
            material={materials.grass}
          />
          <mesh
            receiveShadow
            castShadow
            geometry={nodes.merge2_grass_0_1.geometry}
            material={materials.grass}
          />
          <mesh
            receiveShadow
            castShadow
            geometry={nodes.merge2_grass_0_2.geometry}
            material={materials.grass}
          />
          <mesh
            receiveShadow
            castShadow
            geometry={nodes.merge2_grass_0_3.geometry}
            material={materials.grass}
          />
          <mesh
            receiveShadow
            castShadow
            geometry={nodes.merge2_grass_0_4.geometry}
            material={materials.grass}
          />
          <mesh
            receiveShadow
            castShadow
            geometry={nodes.merge2_grass_0_5.geometry}
            material={materials.grass}
          />
          <mesh
            receiveShadow
            castShadow
            geometry={nodes.merge2_grass_0_6.geometry}
            material={materials.grass}
          />
          <mesh
            receiveShadow
            castShadow
            geometry={nodes.merge2_grass_0_7.geometry}
            material={materials.grass}
          />
          <mesh
            receiveShadow
            castShadow
            geometry={nodes.merge2_grass_0_8.geometry}
            material={materials.grass}
          />
          <mesh
            receiveShadow
            castShadow
            geometry={nodes.merge2_grass_0_9.geometry}
            material={materials.grass}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/scene.gltf");