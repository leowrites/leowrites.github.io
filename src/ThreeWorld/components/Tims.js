/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: crimisya (https://sketchfab.com/crimisya)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/coffee-cup-redux-cc56b844de7d462b94fa91e3d2660e85
title: Coffee Cup Redux
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/tims/scene.gltf");
  return (
    <group {...props} ref={group} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            receiveShadow
            castShadow
            geometry={nodes.pCylinder3_cupthing_0.geometry}
            material={materials.cupthing}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/scene.gltf");
