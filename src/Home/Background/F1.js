import useSpline from "@splinetool/r3f-spline";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Vector3 } from "three";

const F1 = React.forwardRef((props, ref) => {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/hNpIMhMxlAgWJWG0/scene.splinecode"
  );

  const car1Ref = useRef();
  const car2Ref = useRef();
  const line1Ref = useRef();
  const line2Ref = useRef();
  const line3Ref = useRef();
  const line4Ref = useRef();
  const line5Ref = useRef();
  const line6Ref = useRef();
  const line7Ref = useRef();
  const railRef = useRef();
  const extruderRef = useRef();
  const refs = [
    line1Ref,
    line2Ref,
    line3Ref,
    line4Ref,
    line5Ref,
    line6Ref,
    line7Ref,
  ];

  useEffect(() => {
    gsap
      .timeline({ repeat: -1 })
      .to(car2Ref.current.position, {
        duration: 5,
        y: 220,
      })
      //   .to(
      //     car1Ref.current.position,
      //     {
      //       duration: 1,
      //       z: -1000,
      //     },
      //     ">1"
      //   )
      .to(
        car2Ref.current.position,
        {
          z: 280,
        },
        ">1"
      )
      .to(
        car2Ref.current.position,
        {
          x: 270.38,
        },
        ">1"
      )
      .to(
        car2Ref.current.position,
        {
          y: 207.66,
        },
        ">1"
      )
      // raise car1 above printer
      //   .to(
      //     car1Ref.current.position,
      //     {
      //       duration: 1,
      //       y: 220.66,
      //     },
      //     ">1"
      //   )
      .to(
        car2Ref.current.position,
        {
          duration: 1,
          ease: "power3.In",
          z: -500,
        },
        ">1"
      );
    // same animation for car 1
    //   .to(
    //     car1Ref.current.position,
    //     {
    //       z: 280,
    //     },
    //     ">1"
    //   )
    //   .to(
    //     car1Ref.current.position,
    //     {
    //       x: 270.38,
    //     },
    //     ">1"
    //   )
    //   .to(
    //     car1Ref.current.position,
    //     {
    //       y: 207.66,
    //     },
    //     ">1"
    //   );
  }, []);

  //   if (car1Ref.current){
  //       gsap.fromTo(car1Ref.current.position, {
  //         z: 350
  //       },{
  //         repeat: 999,
  //         duration: 10,
  //         // yoyo: true,
  //         z: -100,
  //       });
  //   }
  useFrame(({ clock }) => {
    extruderRef.current.position.z = Math.sin(10 * clock.getElapsedTime()) * 10;
    railRef.current.position.y =
      Math.sin((1 / 2) * clock.getElapsedTime()) * 10;
    extruderRef.current.position.y = railRef.current.position.y;

    // if (car1Ref.current.position.x < printerToTrackPath[car1Pos][0]) {
    //   car1Ref.current.position.x += 0.1;
    // } else {
    // }
    refs.forEach((ref) => {
      if (ref.current.position.z >= 430) {
        ref.current.position.z = -120;
      }
      ref.current.position.z += 5;
    });

    // car1Ref.current.position.z += -1;
    // if (car1Ref.current.position.z < -100) {
    //   resetCar(car1Pos);
    // }
    // if (car2Ref.current.position.z < -100) {
    //   resetCar(car2Pos);
    // }
  });
  return (
    <>
      <group dispose={null} scale={0.07} {...props} ref={ref}>
        {/* <directionalLight
          name="Directional Light"
          castShadow
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={-10000}
          shadow-camera-far={100000}
          shadow-camera-left={-500}
          shadow-camera-right={500}
          shadow-camera-top={500}
          shadow-camera-bottom={-500}
          position={[435.32, 278.89, 0]}
        /> */}
        <group
          name="Printer"
          position={[21.65, 298.28, 214.47]}
          rotation={[0, Math.PI / 2, 0]}
          scale={3.32}
        >
          <mesh
            name="Cube 16"
            geometry={nodes["Cube 16"].geometry}
            material={materials["Cube 16 Material"]}
            castShadow
            receiveShadow
            position={[-2.31, -32.1, -17.16]}
            scale={1.69}
          />
          <mesh
            name="Cube 161"
            geometry={nodes["Cube 161"].geometry}
            material={materials["Cube 161 Material"]}
            castShadow
            receiveShadow
            position={[-2.31, -32.1, 17.75]}
            scale={1.69}
          />
          <group
            ref={extruderRef}
            name="Extruder"
            position={[1.27, 5.37, -6.63]}
            scale={1.69}
          >
            <mesh
              name="Cone"
              geometry={nodes.Cone.geometry}
              material={materials["Cone Material"]}
              castShadow
              receiveShadow
              position={[0, -2.95, 0]}
              rotation={[Math.PI, 0, 0]}
              scale={0.69}
            />
            <mesh
              name="Cube 7"
              geometry={nodes["Cube 7"].geometry}
              material={materials["Cube 7 Material"]}
              castShadow
              receiveShadow
              position={[0, 0.64, 0]}
              rotation={[0, -Math.PI / 2, 0]}
            />
          </group>
          <mesh
            name="Rectangle 4"
            geometry={nodes["Rectangle 4"].geometry}
            material={materials["Rectangle 4 Material"]}
            castShadow
            receiveShadow
            position={[1.91, -29.58, 0.11]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={1.42}
          />
          <mesh
            name="Rectangle 41"
            geometry={nodes["Rectangle 41"].geometry}
            material={materials["Rectangle 41 Material"]}
            castShadow
            receiveShadow
            position={[2.9, -31.26, 0.11]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={1.58}
          />
          <mesh
            name="Cube 162"
            geometry={nodes["Cube 162"].geometry}
            material={materials["Cube 162 Material"]}
            castShadow
            receiveShadow
            position={[-32.87, -37.82, -0.43]}
            rotation={[-Math.PI / 2, -0.98, -Math.PI / 2]}
            scale={[2.44, 1.97, 1.97]}
          />
          <mesh
            name="Cube 163"
            geometry={nodes["Cube 163"].geometry}
            material={materials["Cube 163 Material"]}
            castShadow
            receiveShadow
            position={[-33.31, -37.44, -0.43]}
            rotation={[-Math.PI / 2, -0.98, -Math.PI / 2]}
            scale={[2.08, 1.69, 1.69]}
          />
          <mesh
            name="Cube 164"
            geometry={nodes["Cube 164"].geometry}
            material={materials["Industrial green"]}
            castShadow
            receiveShadow
            position={[0.27, -37.82, 0.11]}
            scale={[1.4, 1.4, 1.2]}
          />
          <mesh
            name="Cube 165"
            ref={railRef}
            geometry={nodes["Cube 165"].geometry}
            material={materials.Silver}
            castShadow
            receiveShadow
            position={[1.32, 6.56, -0.4]}
            scale={[0.52, 0.67, 12.05]}
          />
          <mesh
            name="Cube 166"
            geometry={nodes["Cube 166"].geometry}
            material={materials["Industrial green"]}
            castShadow
            receiveShadow
            position={[1.46, 39.25, 0.12]}
            scale={[1.05, 1.73, 12.32]}
          />
          <mesh
            name="Cube 167"
            geometry={nodes["Cube 167"].geometry}
            material={materials["Industrial green"]}
            castShadow
            receiveShadow
            position={[1.32, -2.77, 33.43]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.82, 1.69, 11.41]}
          />
          <mesh
            name="Cube 168"
            geometry={nodes["Cube 168"].geometry}
            material={materials["Industrial green"]}
            castShadow
            receiveShadow
            position={[1.32, -2.77, -33.43]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.82, 1.69, 11.41]}
          />
        </group>
        <group scale={[1, 1, 3]} position={[0, 0, -300]}>
          <mesh
            name="line 7"
            ref={line7Ref}
            geometry={nodes["Rectangle 8"].geometry}
            material={materials["Rectangle 8 Material"]}
            castShadow
            receiveShadow
            position={[265.78, 191, 370.07]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="line 6"
            ref={line6Ref}
            geometry={nodes["Rectangle 8"].geometry}
            material={materials["Rectangle 8 Material"]}
            castShadow
            receiveShadow
            position={[265.78, 191, 292.07]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            ref={line5Ref}
            name="line 5"
            geometry={nodes["Rectangle 81"].geometry}
            material={materials["Rectangle 81 Material"]}
            castShadow
            receiveShadow
            position={[265.78, 191, 214.41]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="line 4"
            ref={line4Ref}
            geometry={nodes["Rectangle 3"].geometry}
            material={materials["Rectangle 3 Material"]}
            castShadow
            receiveShadow
            position={[265.78, 191, 136.97]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="line 3"
            ref={line3Ref}
            geometry={nodes["Rectangle 31"].geometry}
            material={materials["Rectangle 31 Material"]}
            castShadow
            receiveShadow
            position={[265.78, 191, 60.58]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="line 2"
            ref={line2Ref}
            geometry={nodes["Rectangle 2"].geometry}
            material={materials["Rectangle 2 Material"]}
            castShadow
            receiveShadow
            position={[265.78, 191, -14.9]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="line 1"
            ref={line1Ref}
            geometry={nodes.Rectangle.geometry}
            material={materials["Rectangle Material"]}
            castShadow
            receiveShadow
            position={[265.78, 191, -89.95]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
        <group
          name="Track"
          position={[265.78, 173.55, 101.22]}
          scale={[1.11, 1.11, 5]}
        >
          <mesh
            name="road_block"
            geometry={nodes.road_block.geometry}
            material={materials["road_block Material"]}
            castShadow
            receiveShadow
            position={[0, -0.1, -0.11]}
            scale={[0.58, 0.28, 1.29]}
          />
        </group>
        {/* <group
          ref={car1Ref}
          name="F1"
          position={[270.38, 207.66, 202.73]}
          scale={0.76}
        >
          <mesh
            name="Rear Wing"
            geometry={nodes["Rear Wing"].geometry}
            material={materials["Car Body"]}
            castShadow
            receiveShadow
            position={[-1, 11.87, 88.2]}
            scale={1.46}
          />
          <group name="Wheels" position={[0, -6.01, 13.3]}>
            <group
              name="Wheel 4"
              position={[-40.97, 0, 66.07]}
              rotation={[0, 0, Math.PI]}
              scale={1.15}
            >
              <mesh
                name="Ellipse 2"
                geometry={nodes["Ellipse 2"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[11.03, 0.03, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
                scale={1.34}
              />
              <mesh
                name="Ellipse"
                geometry={nodes.Ellipse.geometry}
                material={materials["Wheel Side Color"]}
                castShadow
                receiveShadow
                position={[10.93, 0.04, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <mesh
                name="Cylinder 5"
                geometry={nodes["Cylinder 5"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[-0.05, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                scale={0.87}
              />
            </group>
            <group
              name="Wheel 3"
              position={[-39.3, 0, -68.5]}
              rotation={[0, 0, Math.PI]}
              scale={1.15}
            >
              <mesh
                name="Ellipse 21"
                geometry={nodes["Ellipse 21"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[11.03, 0.03, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
                scale={1.34}
              />
              <mesh
                name="Ellipse1"
                geometry={nodes.Ellipse1.geometry}
                material={materials["Wheel Side Color"]}
                castShadow
                receiveShadow
                position={[10.93, 0.04, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <mesh
                name="Cylinder 51"
                geometry={nodes["Cylinder 51"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[-0.05, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                scale={0.87}
              />
            </group>
            <group name="Wheel 2" position={[37.93, 0, -68.5]} scale={1.15}>
              <mesh
                name="Ellipse 22"
                geometry={nodes["Ellipse 22"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[11.03, 0.03, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
                scale={1.34}
              />
              <mesh
                name="Ellipse2"
                geometry={nodes.Ellipse2.geometry}
                material={materials["Wheel Side Color"]}
                castShadow
                receiveShadow
                position={[10.93, 0.04, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <mesh
                name="Cylinder 52"
                geometry={nodes["Cylinder 52"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[-0.05, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                scale={0.87}
              />
            </group>
            <group name="Wheel" position={[39.38, 0, 65.38]} scale={1.15}>
              <mesh
                name="Ellipse 23"
                geometry={nodes["Ellipse 23"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[11.13, 0.03, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
                scale={1.34}
              />
              <mesh
                name="Ellipse3"
                geometry={nodes.Ellipse3.geometry}
                material={materials["Wheel Side Color"]}
                castShadow
                receiveShadow
                position={[11.03, 0.04, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <mesh
                name="Cylinder 53"
                geometry={nodes["Cylinder 53"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[-0.05, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                scale={0.87}
              />
            </group>
          </group>
          <group
            name="Chasis"
            position={[0.23, -7.73, -3.35]}
            scale={[1, 1.28, 1]}
          >
            <mesh
              name="wheel_connect"
              geometry={nodes.wheel_connect.geometry}
              material={materials.Black}
              castShadow
              receiveShadow
              position={[-1.23, -1.13, 14.96]}
              scale={[1.46, 1.14, 1.46]}
            />
            <mesh
              name="Front Wing"
              geometry={nodes["Front Wing"].geometry}
              material={materials["Car Body"]}
              castShadow
              receiveShadow
              position={[-1.27, -3.76, -87.47]}
              scale={[1.46, 1.14, 1.46]}
            />
            <mesh
              name="Shape 3"
              geometry={nodes["Shape 3"].geometry}
              material={materials["Car Body"]}
              castShadow
              receiveShadow
              position={[7.27, 6.66, -8.55]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[0.83, 0.78, 1]}
            />
            <mesh
              name="Boolean"
              geometry={nodes.Boolean.geometry}
              material={materials["Car Body"]}
              castShadow
              receiveShadow
              position={[-1.17, 0, -6.79]}
              scale={[1, 0.78, 1]}
            >
              <mesh
                name="Rectangle 5"
                geometry={nodes["Rectangle 5"].geometry}
                material={materials["Car Body"]}
                visible={false}
                castShadow
                receiveShadow
                position={[10.04, -10.58, 22.66]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[1, 1, 3.02]}
              />
              <mesh
                name="Rectangle 51"
                geometry={nodes["Rectangle 51"].geometry}
                material={materials["Car Body"]}
                visible={false}
                castShadow
                receiveShadow
                position={[-10.04, 10.54, 22.66]}
                rotation={[Math.PI / 2, 0, -Math.PI]}
                scale={[1, 1, 3.01]}
              />
            </mesh>
          </group>
        </group> */}
        <group
          ref={car2Ref}
          name="F1"
          position={[20, 180.66, 202.73]}
          scale={0.76}
        >
          <mesh
            name="Rear Wing"
            geometry={nodes["Rear Wing"].geometry}
            material={materials["Car Body"]}
            castShadow
            receiveShadow
            position={[-1, 11.87, 88.2]}
            scale={1.46}
          />
          <group name="Wheels" position={[0, -6.01, 13.3]}>
            <group
              name="Wheel 4"
              position={[-40.97, 0, 66.07]}
              rotation={[0, 0, Math.PI]}
              scale={1.15}
            >
              <mesh
                name="Ellipse 2"
                geometry={nodes["Ellipse 2"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[11.03, 0.03, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
                scale={1.34}
              />
              <mesh
                name="Ellipse"
                geometry={nodes.Ellipse.geometry}
                material={materials["Wheel Side Color"]}
                castShadow
                receiveShadow
                position={[10.93, 0.04, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <mesh
                name="Cylinder 5"
                geometry={nodes["Cylinder 5"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[-0.05, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                scale={0.87}
              />
            </group>
            <group
              name="Wheel 3"
              position={[-39.3, 0, -68.5]}
              rotation={[0, 0, Math.PI]}
              scale={1.15}
            >
              <mesh
                name="Ellipse 21"
                geometry={nodes["Ellipse 21"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[11.03, 0.03, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
                scale={1.34}
              />
              <mesh
                name="Ellipse1"
                geometry={nodes.Ellipse1.geometry}
                material={materials["Wheel Side Color"]}
                castShadow
                receiveShadow
                position={[10.93, 0.04, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <mesh
                name="Cylinder 51"
                geometry={nodes["Cylinder 51"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[-0.05, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                scale={0.87}
              />
            </group>
            <group name="Wheel 2" position={[37.93, 0, -68.5]} scale={1.15}>
              <mesh
                name="Ellipse 22"
                geometry={nodes["Ellipse 22"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[11.03, 0.03, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
                scale={1.34}
              />
              <mesh
                name="Ellipse2"
                geometry={nodes.Ellipse2.geometry}
                material={materials["Wheel Side Color"]}
                castShadow
                receiveShadow
                position={[10.93, 0.04, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <mesh
                name="Cylinder 52"
                geometry={nodes["Cylinder 52"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[-0.05, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                scale={0.87}
              />
            </group>
            <group name="Wheel" position={[39.38, 0, 65.38]} scale={1.15}>
              <mesh
                name="Ellipse 23"
                geometry={nodes["Ellipse 23"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[11.13, 0.03, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
                scale={1.34}
              />
              <mesh
                name="Ellipse3"
                geometry={nodes.Ellipse3.geometry}
                material={materials["Wheel Side Color"]}
                castShadow
                receiveShadow
                position={[11.03, 0.04, 0.12]}
                rotation={[0, Math.PI / 2, 0]}
              />
              <mesh
                name="Cylinder 53"
                geometry={nodes["Cylinder 53"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
                position={[-0.05, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
                scale={0.87}
              />
            </group>
          </group>
          <group
            name="Chasis"
            position={[0.23, -7.73, -3.35]}
            scale={[1, 1.28, 1]}
          >
            <mesh
              name="wheel_connect"
              geometry={nodes.wheel_connect.geometry}
              material={materials.Black}
              castShadow
              receiveShadow
              position={[-1.23, -1.13, 14.96]}
              scale={[1.46, 1.14, 1.46]}
            />
            <mesh
              name="Front Wing"
              geometry={nodes["Front Wing"].geometry}
              material={materials["Car Body"]}
              castShadow
              receiveShadow
              position={[-1.27, -3.76, -87.47]}
              scale={[1.46, 1.14, 1.46]}
            />
            <mesh
              name="Shape 3"
              geometry={nodes["Shape 3"].geometry}
              material={materials["Car Body"]}
              castShadow
              receiveShadow
              position={[7.27, 6.66, -8.55]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[0.83, 0.78, 1]}
            />
            <mesh
              name="Boolean"
              geometry={nodes.Boolean.geometry}
              material={materials["Car Body"]}
              castShadow
              receiveShadow
              position={[-1.17, 0, -6.79]}
              scale={[1, 0.78, 1]}
            >
              <mesh
                name="Rectangle 5"
                geometry={nodes["Rectangle 5"].geometry}
                material={materials["Car Body"]}
                visible={false}
                castShadow
                receiveShadow
                position={[10.04, -10.58, 22.66]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[1, 1, 3.02]}
              />
              <mesh
                name="Rectangle 51"
                geometry={nodes["Rectangle 51"].geometry}
                material={materials["Car Body"]}
                visible={false}
                castShadow
                receiveShadow
                position={[-10.04, 10.54, 22.66]}
                rotation={[Math.PI / 2, 0, -Math.PI]}
                scale={[1, 1, 3.01]}
              />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
});

export default F1;
