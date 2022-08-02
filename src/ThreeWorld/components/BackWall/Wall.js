import useSpline from "@splinetool/r3f-spline";
import { useState } from "react";
import { Html, useCursor } from "@react-three/drei";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Typography";

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/QYTJMMZaJ-SgDwox/scene.splinecode"
  );
  const [hover, setHover] = useState(false);
  useCursor(hover);

  function handleMouseHover() {
    setHover(true);
  }
  function handleMouseLeave() {
    setHover(false);
  }
  return (
    <>
      <group {...props} dispose={null}>
        <mesh
          name="Table"
          geometry={nodes.Table.geometry}
          material={materials["Table Material"]}
          castShadow
          receiveShadow
          position={[-47.56, 400, -289.65]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[2.03, 1.8, 1.14]}
        />
        <group name="White board" position={[238.63, 543.34, -341.09]}>
          <mesh
            name="White board1"
            geometry={nodes["White board1"].geometry}
            material={materials["White board1 Material"]}
            castShadow
            receiveShadow
            position={[3.35, 4.83, 3.27]}
            rotation={[Math.PI, 0, -Math.PI]}
            scale={[2.21, 2.21, 0.06]}
          >
            <Html
              rotation={[0, Math.PI, 0]}
              position={[0, 0, -50]}
              occlude
              transform
            >
              <Box textAlign={"start"} width={2500} height={2000}>
                <Typography
                  sx={{
                    fontSize: "20rem",
                    fontWeight: "bold",
                  }}
                >
                  TODO
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18rem",
                    fontWeight: "bold",
                  }}
                >
                  1. Get Hired
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18rem",
                    fontWeight: "bold",
                  }}
                >
                  2. Graduate UofT
                </Typography>
              </Box>
            </Html>
          </mesh>
          <mesh
            name="Cube 10"
            geometry={nodes["Cube 10"].geometry}
            material={materials["Cube 10 Material"]}
            castShadow
            receiveShadow
            position={[1.24, -87.97, 4.43]}
            rotation={[Math.PI, 0, -Math.PI]}
            scale={[2.21, 2.21, 0.09]}
          />
          <mesh
            name="Cube 8"
            geometry={nodes["Cube 8"].geometry}
            material={materials["Cube 8 Material"]}
            castShadow
            receiveShadow
            position={[0, 0, -3.03]}
            rotation={[Math.PI, 0, -Math.PI]}
            scale={[2.21, 1.85, 0.05]}
          />
        </group>
        <group
          name="Monitor"
          position={[-41.88, 575.7, -332.29]}
          scale={[1.79, 1.82, 2.21]}
        >
          <mesh
            name="Cube 2"
            geometry={nodes["Cube 2"].geometry}
            material={materials["Cube 2 Material"]}
            castShadow
            receiveShadow
            position={[0, 0.78, 2.75]}
            rotation={[-1.34, 0, 0]}
            scale={[0.62, 0.72, 0.29]}
          />
        </group>
        <group
          name="Monitor1"
          position={[-41.88, 501.48, -326.23]}
          scale={[2, 1.8, 1.2]}
        >
          <mesh
            name="Cube 3"
            geometry={nodes["Cube 3"].geometry}
            material={materials["Cube 3 Material"]}
            castShadow
            receiveShadow
            position={[0, -0.09, 3.07]}
            rotation={[-1.6, 0, 0]}
            scale={[0.75, 0.81, 0.28]}
          />
        </group>
        <mesh
          name="Cube"
          geometry={nodes.Cube.geometry}
          material={materials["Cube Material"]}
          castShadow
          receiveShadow
          position={[-230.66, 507.34, -316.08]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[0.19, 0.98, 0.18]}
        />
        <mesh
          name="Cube1"
          geometry={nodes.Cube1.geometry}
          material={materials["Cube1 Material"]}
          castShadow
          receiveShadow
          position={[-230.66, 640.58, -316.08]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[0.19, 0.98, 0.18]}
        />
        <mesh
          name="Cube2"
          geometry={nodes.Cube2.geometry}
          material={materials["Cube2 Material"]}
          castShadow
          receiveShadow
          position={[-307.36, 569.84, -316.08]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[0.19, 0.98, 0.18]}
        />
        <mesh
          name="Cube3"
          geometry={nodes.Cube3.geometry}
          material={materials.white}
          castShadow
          receiveShadow
          position={[6.39, 717.62, -339]}
          rotation={[Math.PI, 0, -Math.PI]}
          scale={[-2.21, 0.98, 0.1]}
        />
        <mesh
          name="Wall"
          geometry={nodes.Wall.geometry}
          material={materials.Walls}
          castShadow
          receiveShadow
          position={[-4.67, 494.19, -392.22]}
          scale={[2.21, 1.88, 3.83]}
        />
        <group position={[0, 5, 0]}>
          <group
            name="Github"
            onPointerEnter={handleMouseHover}
            onPointerLeave={handleMouseLeave}
            onClick={() => window.open("https://github.com/leowrites")}
            position={[-231.08, 674.9, -294.75]}
            scale={6.39}
          >
            <mesh
              name="Shape 2"
              geometry={nodes["Shape 2"].geometry}
              material={materials.white}
              castShadow
              receiveShadow
              position={[-1.82, 1.93, -0.83]}
              scale={[0.85, 0.85, 1.31]}
            />
            <mesh
              name="Rectangle 17"
              geometry={nodes["Rectangle 17"].geometry}
              material={materials.Black}
              castShadow
              receiveShadow
              position={[-0.06, -0.83, -5.16]}
              scale={[0.03, 0.04, 0.15]}
            />
          </group>
          <group
            name="Mail"
            position={[-227.97, 541.75, -293.41]}
            scale={6.52}
            onPointerEnter={handleMouseHover}
            onPointerLeave={handleMouseLeave}
            onClick={() => window.open("mailto:siqi.liu.0922@gmail.com")}
          >
            <mesh
              name="Triangle 3"
              geometry={nodes["Triangle 3"].geometry}
              material={materials["Triangle 3 Material"]}
              castShadow
              receiveShadow
              position={[-0.06, -1.22, -0.16]}
              scale={[1.31, 1.37, 1.36]}
            />
            <mesh
              name="Triangle 2"
              geometry={nodes["Triangle 2"].geometry}
              material={materials["Triangle 2 Material"]}
              castShadow
              receiveShadow
              position={[-0.06, -0.3, -0.22]}
              rotation={[0, 0, Math.PI]}
              scale={[1.31, 1.37, 1.36]}
            />
            <mesh
              name="Rectangle 9"
              geometry={nodes["Rectangle 9"].geometry}
              material={materials["Rectangle 9 Material"]}
              castShadow
              receiveShadow
              position={[-0.07, -0.76, -0.74]}
              scale={0.92}
            />
            <mesh
              name="Rectangle 8"
              geometry={nodes["Rectangle 8"].geometry}
              material={materials["Rectangle 8 Material"]}
              castShadow
              receiveShadow
              position={[-0.07, -0.83, -0.9]}
              scale={1.1}
            />
            <mesh
              name="Rectangle 171"
              geometry={nodes["Rectangle 171"].geometry}
              material={materials["Rectangle 171 Material"]}
              castShadow
              receiveShadow
              position={[-0.06, -0.83, -5.09]}
              scale={[0.03, 0.04, 0.14]}
            />
          </group>
          <group
            name="Linkedin"
            position={[-307.36, 600.19, -303.08]}
            onPointerEnter={handleMouseHover}
            onPointerLeave={handleMouseLeave}
            onClick={() =>
              window.open("https://www.linkedin.com/in/-siqi-liu-")
            }
            scale={6.52}
          >
            <mesh
              name="Rectangle 19"
              geometry={nodes["Rectangle 19"].geometry}
              material={materials.white}
              castShadow
              receiveShadow
              position={[0.23, -0.73, 0.29]}
              scale={[1.06, 1.06, 0.71]}
            />
            <mesh
              name="Rectangle 18"
              geometry={nodes["Rectangle 18"].geometry}
              material={materials.white}
              castShadow
              receiveShadow
              position={[-1.42, -0.77, 0.35]}
              scale={[1.06, 1.03, 0.72]}
            />
            <mesh
              name="Ellipse"
              geometry={nodes.Ellipse.geometry}
              material={materials.white}
              castShadow
              receiveShadow
              position={[-1.48, 1.96, 0.29]}
              scale={0.68}
            />
            <mesh
              name="Rectangle 172"
              geometry={nodes["Rectangle 172"].geometry}
              material={materials["Rectangle 172 Material"]}
              castShadow
              receiveShadow
              position={[0, -0.21, -3.67]}
              scale={[0.03, 0.04, 0.14]}
            />
          </group>
        </group>
      </group>
    </>
  );
}
