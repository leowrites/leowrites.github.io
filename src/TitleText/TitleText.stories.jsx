import TitleText from "./TitleText";

export default {
  title: "Main/TitleText",
  component: TitleText,
};

const Template = (args) => <TitleText {...args} />;

export const AnimatedText = Template.bind({});
AnimatedText.args = {
  textShadow1: "0 0 0.5rem white, 0 0 1em #0ff, 0 0 0.5em  #1fff00",
  textShadow2: "0 0 0.5rem white, 0 0 1em #00abff, 0 0 0.5em #1fff00",
};
