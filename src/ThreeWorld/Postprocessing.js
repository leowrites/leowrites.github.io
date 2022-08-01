import React from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Postprocessing() {
  return (
    <EffectComposer>
      <Bloom />
    </EffectComposer>
  );
}
