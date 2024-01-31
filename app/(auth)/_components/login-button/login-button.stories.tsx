import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { LoginButton } from '.';

export default {
  title: 'Components/LoginButton',
  component: LoginButton,
} as Meta;

const Template: StoryFn<typeof LoginButton> = (args) => <LoginButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Login',
};
