/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: janexx (https://sketchfab.com/janexx)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/several-folders-1a493b49ef954985ab8057ca66c387d5
title: Several Folders
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[409.82, 16.11, 26.5]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.folder_LP_nolabel_Folder_nolabel_0.geometry}
              material={materials.Folder_nolabel}
            />
          </group>
          <group
            position={[417.37, 16.11, 26.5]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.folder_LP_Bills_Folder_Bills_0.geometry}
              material={materials.Folder_Bills}
            />
          </group>
          <group
            position={[424.96, 16.11, 26.5]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.folder_LP_TaxRecords_Folder_TaxRecords_0.geometry}
              material={materials.Folder_TaxRecords}
            />
          </group>
          <group
            position={[432.67, 16.11, 26.5]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.folder_LP_House_Folder_House_0.geometry}
              material={materials.Folder_House}
            />
          </group>
          <group
            position={[442.97, 16.59, 26.5]}
            rotation={[-Math.PI / 2, -0.15, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.folder_LP_Work_Folder_Work_0.geometry}
              material={materials.Folder_Work}
            />
            <mesh
              geometry={nodes.folder_LP_Work_Folder_nolabel_0.geometry}
              material={materials.Folder_nolabel}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/scene.gltf");
