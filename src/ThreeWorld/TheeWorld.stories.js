import React from "react";
import ThreeWorld from "./ThreeWorld";
import "@storybook/addon-console";

export default {
  title: "Main/ThreeWorld",
  component: ThreeWorld,
};

const Template = (args) => <ThreeWorld {...args} />;

export const SeeWorld = Template.bind({});
