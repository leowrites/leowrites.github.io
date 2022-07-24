/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: rondinellimorais (https://sketchfab.com/rondinellimorais)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/jabulani-7ae489b78e114ac290ffbd989729f4a4
title: Jabulani
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + "/soccerball/scene.gltf"
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[0, 11.43, 0]}
            rotation={[1.62, -0.81, -3.04]}
            scale={9.87}
          >
            <mesh
              receiveShadow
              castShadow
              geometry={nodes.pSphere1_JABULANI_0.geometry}
              material={materials.JABULANI}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/scene.gltf");
