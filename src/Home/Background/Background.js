import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rocket from "./Rocket";
import UofTLogo from "./UofTLogo";
import Earth from "./Earth";
import "./Background.css";
import Gallery from "./Gallery";

function SceneSetting() {
  return (
    <>
      <directionalLight
        name="Directional Light"
        castShadow
        intensity={0.3}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={-10000}
        shadow-camera-far={100000}
        shadow-camera-left={-500}
        shadow-camera-right={500}
        shadow-camera-top={500}
        shadow-camera-bottom={-500}
        position={[200, 300, 300]}
      />
      <OrthographicCamera
        name="Personal Camera"
        makeDefault={true}
        zoom={19.59}
        far={100000}
        near={-100000}
        position={[588.46, 294.74, 752.89]}
        rotation={[-0.37, 0.63, 0.23]}
      />
      <hemisphereLight
        name="Default Ambient Light"
        intensity={0.75}
        color="#eaeaea"
        position={[0, 1, 0]}
      />
    </>
  );
}

function Scene() {
  const rocketRef = useRef();
  const uoftRef = useRef();
  const galleryRef = useRef();
  const earthRef = useRef();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const rocketStartX = rocketRef.current.position.x;
    const rocketStartY = rocketRef.current.position.y;
    gsap
      .timeline()
      .to(rocketRef.current, {
        scrollTrigger: {
          trigger: ".section-one",
          start: "top top",
          scrub: true,
          onUpdate: ({ progress }) => {
            rocketRef.current.position.x = rocketStartX + progress * 40;
            rocketRef.current.position.y = rocketStartY + progress * 85;
          },
        },
      })
      .to(earthRef.current.position, {
        scrollTrigger: {
          trigger: ".about-me",
          start: "-=30%",
          end: "+=150%",
          scrub: 1,
        },
        y: 100,
      })
      .to(uoftRef.current.position, {
        scrollTrigger: {
          trigger: ".education-section",
          start: "-=50%",
          end: "+=10%",
          scrub: 1,
        },
        x: -20,
      })
      .to(uoftRef.current.position, {
        scrollTrigger: {
          trigger: ".education-section",
          start: "-=25%",
          end: "+=250%",
          scrub: 1,
        },
        y: 100,
      })
      .to(galleryRef.current.position, {
        scrollTrigger: {
          trigger: ".projects",
          start: "-=50%",
          end: "+=150%",
          markers: true,
          scrub: 1,
        },
        y: 50,
      });
  }, []);
  useFrame(() => {
    uoftRef.current.rotation.y += 0.005;
    uoftRef.current.rotation.z += 0.005;
    rocketRef.current.rotation.y += 0.002;
    earthRef.current.rotation.y += 0.002;
    galleryRef.current.rotation.y += 0.001;
  });
  return (
    <>
      <SceneSetting />
      <Rocket ref={rocketRef} />
      <UofTLogo ref={uoftRef} />
      <Earth ref={earthRef} />
      <Gallery ref={galleryRef} />
    </>
  );
}

export default function Background() {
  return (
    <div id={"page-background"}>
      <Canvas gl={{ alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
