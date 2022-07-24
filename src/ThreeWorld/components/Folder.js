import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useCursor } from "@react-three/drei";
import { useDispatch } from "react-redux";
import { lookAtFolder } from "./viewSlice";

function Folder({ folderRef, ...props }) {
  const [hovered, setHovered] = useState();
  const dispatch = useDispatch();
  useCursor(hovered);
  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + "/several_folders/scene.gltf"
  );
  const Folders = () =>
    Array(5)
      .fill(5)
      .map((_, i) => {
        if (i === 0) {
          return (
            <mesh
              {...props}
              receiveShadow
              castShadow
              position={[0, 0, i * 0.3]}
              geometry={nodes.folder_LP_nolabel_Folder_nolabel_0.geometry}
              material={materials.Folder_nolabel}
            />
          );
        } else {
          return (
            <mesh
              {...props}
              receiveShadow
              castShadow
              position={[0, 0, i * 0.3]}
              geometry={nodes.folder_LP_Work_Folder_Work_0.geometry}
              material={materials.Folder_Work}
            />
          );
        }
      });
  return (
    <group
      ref={folderRef}
      position={[0, 1.75, 2.5]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => dispatch(lookAtFolder())}
    >
      <Folders />
    </group>
  );
}

useGLTF.preload("/scene.gltf");

export default Folder;
