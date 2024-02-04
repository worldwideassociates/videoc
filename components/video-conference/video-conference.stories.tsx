import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { VideoConference } from '.';

export default {
  title: 'Components/VideoConference',
  component: VideoConference,
} as Meta;

const Template: StoryFn<typeof VideoConference> = (args) => <VideoConference {...args} />;

export const Default = Template.bind({});
Default.args = {
  user: {
    id: 'sfdfsd',
    name: 'Dellan',
    lastName: 'Much',
    role: 'Moderator',
  },
  callId: 'EXVFlj20Bmex'
};

