import { useCompoundBody } from "@react-three/cannon";
import { useTexture } from "@react-three/drei";
import Block from "./Block";

function TableFoot(props) {
  const metalTexture = useTexture({
    map: process.env.PUBLIC_URL + "/metal/Metal038_2K_Color.jpg",
    displacementMap:
      process.env.PUBLIC_URL + "/metal/Metal038_2K_Displacement.jpg",
    normalMap: process.env.PUBLIC_URL + "/metal/Metal038_2K_NormalGL.jpg",
    roughnessMap: process.env.PUBLIC_URL + "/metal/Metal038_2K_Roughness.jpg",
    metalness: process.env.PUBLIC_URL + "/metal/Metal038_2K_Metalness.jpg",
  });
  return (
    <Block
      {...props}
      blur={[300, 300]}
      resolution={1024}
      mixBlur={1}
      mixStrength={40}
      roughness={1}
      depthScale={1.2}
      minDepthThreshold={0.4}
      maxDepthThreshold={1.4}
      metalness={0.5}
      {...metalTexture}
      scale={[0.3, 3.6, 0.3]}
    />
  );
}

export function Table() {
  const texture = useTexture({
    map: process.env.PUBLIC_URL + "/wood/color.jpg",
    displacementMap: process.env.PUBLIC_URL + "/wood/displacement.jpg",
    normalMap: process.env.PUBLIC_URL + "/wood/normalGL.jpg",
    roughnessMap: process.env.PUBLIC_URL + "/wood/roughness.jpg",
  });
  const [table] = useCompoundBody(() => ({
    shapes: [
      {
        type: "Box",
        position: [0, 1, 0],
        args: [5, 0.5, 5],
      },
      {
        type: "Box",
        position: [2, -1, 2.5],
        args: [0.5, 3.5, 0.5],
      },
      {
        type: "Box",
        position: [-2, -1, -2.5],
        args: [0.5, 3.5, 0.5],
      },
      {
        type: "Box",
        position: [2, -1, -2.5],
        args: [0.5, 3.5, 0.5],
      },
      {
        type: "Box",
        position: [-2, -1, 2.5],
        args: [0.5, 3.5, 0.5],
      },
    ],
  }));
  return (
    <group ref={table}>
      <Block
        {...texture}
        displacement
        scale={[5, 0.25, 10]}
        position={[0, 1.1, 0]}
      />
      <TableFoot position={[-2, -0.7, 4]} />
      <TableFoot position={[-2, -0.7, -4]} />
      <TableFoot position={[2, -0.7, -4]} />
      <TableFoot position={[2, -0.7, 4]} />
    </group>
  );
}
