import useSpline from "@splinetool/r3f-spline";
import React from "react";
import { Html } from "@react-three/drei";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Earth = React.forwardRef((props, ref) => {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/ZnYhCK848z4X-3Oy/scene.splinecode"
  );
  return (
    <group {...props} dispose={null}>
      <group
        name="Group"
        position={[45.05, -50.03, 35.12]}
        ref={ref}
        scale={[0.15, 0.15, 0.15]}
      >
        <mesh
          name="Kelowna Marker"
          geometry={nodes["Kelowna Marker"].geometry}
          material={materials["Kelowna Marker Material"]}
          castShadow
          receiveShadow
          position={[-22.08, 64.85, 42.51]}
        >
          <Html position={[0, 20, 0]} occlude>
            <Box sx={{ backgroundColor: "black", borderRadius: "1rem", p: 1 }}>
              <Typography
                sx={{ fontSize: "1rem", fontWeight: "bold", color: "white" }}
              >
                Kelowna
              </Typography>
            </Box>
          </Html>
        </mesh>
        <mesh
          name="Shanghai Marker"
          geometry={nodes["Shanghai Marker"].geometry}
          material={materials.Shanghai}
          castShadow
          receiveShadow
          position={[-30.41, 65.65, -38.43]}
        >
          <Html position={[0, 20, 0]} occlude>
            <Box sx={{ backgroundColor: "black", borderRadius: "1rem", p: 1 }}>
              <Typography
                sx={{ fontSize: "1rem", fontWeight: "bold", color: "white" }}
              >
                Shanghai
              </Typography>
            </Box>
          </Html>
        </mesh>
        <mesh
          name="Toronto Marker"
          geometry={nodes["Toronto Marker"].geometry}
          material={materials.Toronto}
          castShadow
          receiveShadow
          position={[9.86, 57.83, 55.17]}
        >
          <Html position={[0, 10, 0]} occlude>
            <Box sx={{ backgroundColor: "black", borderRadius: "1rem", p: 1 }}>
              <Typography
                sx={{ fontSize: "1rem", fontWeight: "bold", color: "white" }}
              >
                Toronto
              </Typography>
            </Box>
          </Html>
        </mesh>
        <mesh
          name="Earth"
          geometry={nodes.Earth.geometry}
          material={materials["Untitled Material"]}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  );
});

export default Earth;
