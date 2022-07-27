/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Johana-PS (https://sketchfab.com/Johana-PS)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/white-photo-frame-2b72fcdffd7c445fa68573b2a2c5b940
title: White Photo Frame
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/Frame3/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group>
          <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
            <mesh
              geometry={nodes.Object_4.geometry}
              material={materials["mockofun-vintage-photo-editor"]}
            />
            <mesh
              geometry={nodes.Object_5.geometry}
              material={materials.frame}
            />
            <mesh
              geometry={nodes.Object_6.geometry}
              material={materials["frame-darker"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/scene.gltf");
