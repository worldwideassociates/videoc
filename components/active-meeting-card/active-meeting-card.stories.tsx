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
    name: 'Sales Meeting',
    description: 'Meeting Description',
    startDate: '30-01-2024 12:00',
    moderator: {
      id: '1',
      firstName: 'Dellan',
      lastName: 'Much',
      role: 'Moderator',
    },
    participants: [
      {
        id: '1',
        firstName: 'Dellan',
        lastName: 'Much',
        role: 'Moderator',
        profileImageUrl: 'https://github.com/shadcn.png'
      },
      {
        id: '2',
        firstName: 'Giannis',
        lastName: 'Kozyris',
        role: 'Administrator',
      },
      {
        id: '3',
        firstName: 'Giannis',
        lastName: 'Kozyris',
        role: 'Administrator',
        profileImageUrl: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
      },
      {

        id: '4',
        firstName: 'Giannis',
        lastName: 'Kozyris',
        role: 'Administrator',
        profileImageUrl: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
      }
    ],
  },
};

