import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Folder({ ...props }) {
  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + "/several_folders/scene.gltf"
  );
  const Folders = () =>
    Array(5)
      .fill(5)
      .map((_, i) => {
        if (i === 0) {
          return (
            <>
              <mesh
                {...props}
                position={[0, 1.8, i * 0.3 + 2.5]}
                geometry={nodes.folder_LP_nolabel_Folder_nolabel_0.geometry}
                material={materials.Folder_nolabel}
              />
            </>
          );
        } else {
          return (
            <mesh
              {...props}
              position={[0, 1.8, i * 0.3 + 2.5]}
              geometry={nodes.folder_LP_Work_Folder_Work_0.geometry}
              material={materials.Folder_Work}
            />
          );
        }
      });
  return <Folders />;
}

useGLTF.preload("/scene.gltf");
