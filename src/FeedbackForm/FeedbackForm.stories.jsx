import React from "react";
import { within, userEvent } from "@storybook/testing-library";
// import { expect } from '@storybook/jest';
import FeedbackForm from "./FeedbackForm";

export default {
  title: "Main/FeedbackForm",
  component: FeedbackForm,
};

const Template = (args) => <FeedbackForm {...args} />;

export const EmptyForm = Template.bind({});
export const FilledForm = Template.bind({});

FilledForm.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId("email", "email@provider.com"));
  await userEvent.type(canvas.getByTestId("name", "some name"));
  await userEvent.type(canvas.getByTestId("message", "A random message"));
  await userEvent.click(canvas.getByRole("button"));
};
