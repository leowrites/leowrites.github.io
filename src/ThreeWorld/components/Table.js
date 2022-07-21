import { useCompoundBody } from "@react-three/cannon";
import { useTexture } from "@react-three/drei";
import Block from "./Block";

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
        scale={[5, 0.5, 10]}
        position={[0, 1, 0]}
      />
      <Block scale={[0.5, 3.5, 0.5]} position={[-2, -1, 4]} />
      <Block scale={[0.5, 3.5, 0.5]} position={[-2, -1, -4]} />
      <Block scale={[0.5, 3.5, 0.5]} position={[2, -1, -4]} />
      <Block scale={[0.5, 3.5, 0.5]} position={[2, -1, 4]} />
    </group>
  );
}
