import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { UpcomingMeetingCard } from '.';

export default {
  title: 'Components/UpcomingMeetingCard',
  component: UpcomingMeetingCard,
} as Meta;

const Template: StoryFn<typeof UpcomingMeetingCard> = (args) => <UpcomingMeetingCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  meeting: {} as any,
};

