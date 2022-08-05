import React from "react";
import { MockLoader } from "./MockLoader";

export default {
  title: "Main/MockLoader",
  component: MockLoader,
};

const Template = (args) => <MockLoader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  // progress of the loader is a number
  backgroundColor: "black",
  width: `${0}%`,
};
