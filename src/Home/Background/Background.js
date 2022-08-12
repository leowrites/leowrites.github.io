import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rocket from "./Rocket";
import UofTLogo from "./UofTLogo";
import Earth from "./Earth";
import Face from "./Face";
import "./Background.css";
import Gallery from "./Gallery";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// import ContactMe from './ContactMe';
import F1Scene from "./F1";

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
  const faceRef = useRef();
  const f1SceneRef = useRef();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  // disable pin for mobile for now since mobile is glitchy with pinning on
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap
      .timeline()
      .to(rocketRef.current.position, {
        scrollTrigger: {
          trigger: ".section-one",
          start: "top top",
          scrub: true,
        },
        x: 125,
        y: 125,
      })
      .to(".section-one", {
        scrollTrigger: {
          trigger: ".section-one",
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: matches ? false : true,
          pinSpacing: true,
          // markers: true,
        },
      })
      .to(".about-me", {
        scrollTrigger: {
          trigger: ".about-me",
          start: matches ? "-=15%" : "-=30%",
          end: "+=100%",
          scrub: 1,
          pin: matches ? false : true,
          pinSpacing: true,
          // markers: true,
        },
      })
      .to(earthRef.current.position, {
        scrollTrigger: {
          trigger: ".about-me",
          start: "-=30%",
          end: "+=150%",
          scrub: 1,
          // markers: true,
        },
        x: matches ? -5 : 45.05,
        y: 100,
      })
      .to(".education-section", {
        scrollTrigger: {
          trigger: ".education-section",
          start: "-=30%",
          end: "+=50%",
          scrub: 1,
          pin: matches ? false : true,
          pinSpacing: true,
          // markers: true,
        },
      })
      .to(uoftRef.current.position, {
        scrollTrigger: {
          trigger: ".education-section",
          start: "-=30%",
          end: "+=40%",
          scrub: 1,
          // markers: true,
        },
        x: matches ? 5 : -15,
        y: 5,
      })
      .to(uoftRef.current.position, {
        immediateRender: false,
        scrollTrigger: {
          trigger: ".education-section",
          start: "-=20%",
          end: "+=100%",
          scrub: 1,
          // markers: true,
        },
        y: 50,
      })
      .to(".projects", {
        scrollTrigger: {
          trigger: ".projects",
          start: "-=10%",
          end: "+=100%",
          scrub: 1,
          pin: matches ? false : true,
          pinSpacing: true,
          // markers: true,
        },
        // y: 50,
      })
      .to(galleryRef.current.position, {
        scrollTrigger: {
          trigger: ".projects",
          start: "-=50%",
          end: "+=150%",
          scrub: 1,
          // markers: true,
        },
        y: 50,
      })
      .to(f1SceneRef.current.position, {
        scrollTrigger: {
          trigger: ".skills",
          start: "-=50%",
          end: "+=50%",
          scrub: 1,
          // markers: true
        },
        y: matches ? -10 : -20,
      });
  }, []);
  function handleMouseMove(event) {
    const mouseX = event.clientX - window.innerWidth / 2;
    const mouseY = event.clientY - window.innerHeight / 2;
    faceRef.current.rotation.x = mouseY * 0.001;
    faceRef.current.rotation.y = mouseX * 0.001;
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });
  useFrame(() => {
    uoftRef.current.rotation.y += 0.007;
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
      <Face ref={faceRef} />
      <Earth ref={earthRef} />
      <Gallery ref={galleryRef} />
      <F1Scene
        ref={f1SceneRef}
        position={[-5, -100, 0]}
        rotation={[0, 0, 0]}
        scale={matches ? 0.06 : 0.08}
      />
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
