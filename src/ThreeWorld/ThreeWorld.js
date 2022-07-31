import Loader from "./components/Loader";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./ThreeWorld.css";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export default function ThreeWorld() {
  return (
    <Suspense fallback={<Loader />}>
      <div id={"canvas-container"}>
        <Spline scene="https://prod.spline.design/4c4T2ZgkRv3GDfOi/scene.splinecode" />
      </div>
    </Suspense>
  );
}
