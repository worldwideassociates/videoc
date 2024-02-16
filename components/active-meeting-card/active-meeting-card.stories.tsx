import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ActiveMeetingCard } from '.';

export default {
  title: 'Components/ActiveMeetingCard',
  component: ActiveMeetingCard,
} as Meta;

const Template: StoryFn<typeof ActiveMeetingCard> = (args) => <ActiveMeetingCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  meeting: {
    id: '1',
    title: 'Sales Meeting',
    description: 'Meeting Description',
    startDateTime: new Date('30-01-2024 12:00'),
  } as any,
};

