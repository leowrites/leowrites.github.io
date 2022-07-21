import { forwardRef } from "react";
import { RoundedBox } from "@react-three/drei";

const Block = forwardRef(
  (
    {
      children,
      transparent = false,
      opacity = 1,
      color = "white",
      args = [1, 1, 1],
      map,
      ...props
    },
    ref
  ) => {
    return (
      <RoundedBox args={args} receiveShadow castShadow ref={ref} {...props}>
        <meshStandardMaterial
          color={color}
          transparent={transparent}
          opacity={opacity}
          map={map}
        />
        {children}
      </RoundedBox>
    );
  }
);

export default Block;
