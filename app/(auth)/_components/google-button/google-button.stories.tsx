import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { GoogleButton } from '.';

export default {
  title: 'Components/GoogleButton',
  component: GoogleButton,
} as Meta;

const Template: StoryFn<typeof GoogleButton> = (args) => <GoogleButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  loading: false,
};
