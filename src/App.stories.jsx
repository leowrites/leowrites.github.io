import React from "react";
import App from "./App";

export default {
  title: "Main/App",
  component: App,
};

// render a story (rendered state of a UI component)
// to pass in args
const Template = (args) => <App {...args} />;
export const Primary = Template.bind({});

Primary.args = { backgroundColor: "000000" };
