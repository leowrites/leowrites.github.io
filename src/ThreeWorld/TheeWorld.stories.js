import React from "react";
import ThreeWorld from "./ThreeWorld";

export default {
  title: "Main/ThreeWorld",
  component: ThreeWorld,
};

const Template = (args) => <ThreeWorld {...args} />;

export const SeeWorld = Template.bind({});
