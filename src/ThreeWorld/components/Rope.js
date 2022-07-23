import { useCylinder, useLockConstraint } from "@react-three/cannon";
import { useEffect } from "react";

function RopeSegment({ segmentProp }) {
  return (
    <mesh>
      <cylinderGeometry args={segmentProp} />
      <meshStandardMaterial receiveShadow castShadow color={"black"} />
    </mesh>
  );
}

export default function Rope(props) {
  // calculate and provide position
  const height = 1;
  const radiusTop = 0.025;
  const radiusBottom = 0.025;
  const numSegments = 10;
  const numOfRopeSegments = 9;
  const segmentProp = [radiusTop, radiusBottom, height, numSegments];
  const segmentConfig = {
    mass: 5,
    radiusTop: radiusTop,
    radiusBottom: radiusBottom,
    numSegments: numSegments,
  };
  // the highest segment has no mass to fix
  const [segment1] = useCylinder(() => ({
    ...segmentConfig,
    mass: 0,
    position: [
      props.position[0],
      props.position[1] + numOfRopeSegments * height,
      props.position[2],
    ],
  }));
  const [segment2, api2] = useCylinder(() => ({
    ...segmentConfig,
    position: [
      props.position[0],
      props.position[1] + (numOfRopeSegments - 1) * height,
      props.position[2],
    ],
  }));
  const [segment3, api3] = useCylinder(() => ({
    ...segmentConfig,
    position: [
      props.position[0],
      props.position[1] + (numOfRopeSegments - 2) * height,
      props.position[2],
    ],
  }));
  const [segment4, api4] = useCylinder(() => ({
    ...segmentConfig,
    position: [
      props.position[0],
      props.position[1] + (numOfRopeSegments - 3) * height,
      props.position[2],
    ],
  }));
  const [segment5, api5] = useCylinder(() => ({
    ...segmentConfig,
    position: [
      props.position[0],
      props.position[1] + (numOfRopeSegments - 4) * height,
      props.position[2],
    ],
  }));
  const [segment6, api6] = useCylinder(() => ({
    ...segmentConfig,
    position: [
      props.position[0],
      props.position[1] + (numOfRopeSegments - 5) * height,
      props.position[2],
    ],
  }));
  const [segment7, api7] = useCylinder(() => ({
    ...segmentConfig,
    position: [
      props.position[0],
      props.position[1] + (numOfRopeSegments - 6) * height,
      props.position[2],
    ],
  }));
  api2.collisionResponse = false;
  api3.collisionResponse = false;
  api4.collisionResponse = false;
  api5.collisionResponse = false;
  api6.collisionResponse = false;
  api7.collisionResponse = false;
  useLockConstraint(segment1, segment2);
  useLockConstraint(segment2, segment3);
  useLockConstraint(segment3, segment4);
  useLockConstraint(segment4, segment5);
  useLockConstraint(segment5, segment6);
  useLockConstraint(segment6, segment7);

  // useEffect(() => {
  //   api7.applyImpulse([10, 10, 10], [0, 0, 0]);
  // }, [])
  // useFrame((state) => {
  //   // apply force every 2 seconds
  //   if (state.clock.getElapsedTime() % 10 < 0.1) {
  //     api7.applyImpulse([1, 1, 1], [0, 0, 0]);
  //   }
  // });

  return (
    <group {...props}>
      <group ref={segment1}>
        <RopeSegment segmentProp={segmentProp} />
      </group>
      <group
        ref={segment2}
        onClick={() => {
          api2.applyImpulse([5, 5, 5], [0, 0, 0]);
        }}
      >
        <RopeSegment segmentProp={segmentProp} />
      </group>
      <group
        ref={segment3}
        onClick={() => {
          api3.applyImpulse([3, 3, 3], [0, 0, 0]);
        }}
      >
        <RopeSegment segmentProp={segmentProp} />
      </group>
      <group
        ref={segment4}
        onClick={() => {
          api4.applyImpulse([3, 3, 3], [0, 0, 0]);
        }}
      >
        <RopeSegment segmentProp={segmentProp} />
      </group>
      <group
        ref={segment5}
        onClick={() => {
          api5.applyImpulse([5, 5, 5], [0, 0, 0]);
        }}
      >
        <RopeSegment segmentProp={segmentProp} />
      </group>
      <group
        ref={segment6}
        onClick={() => {
          api6.applyImpulse([5, 5, 5], [0, 0, 0]);
        }}
      >
        <RopeSegment segmentProp={segmentProp} />
      </group>
      <group
        ref={segment7}
        onClick={() => {
          api7.applyImpulse([100, 100, 10], [0, 0, 0]);
        }}
      >
        <RopeSegment segmentProp={segmentProp} />
      </group>
    </group>
  );
}
