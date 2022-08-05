import React from "react";
import { LoaderBar } from "./Loader";

export default {
  title: "Main/Loader",
  component: LoaderBar,
};

const Template = (args) => <LoaderBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  // progress of the loader is a number
  backgroundColor: "black",
  width: `${0}%`,
};
