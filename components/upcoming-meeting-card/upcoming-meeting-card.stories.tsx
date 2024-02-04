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
  meeting: {
    id: '1',
    name: 'Sales Meeting',
    description: 'Meeting Description',
    startDate: '30-01-2024 12:00',
    moderator: {
      id: '1',
      name: 'Dellan',
      lastName: 'Much',
      role: 'Moderator',
    },
    participants: [
      {
        id: '1',
        name: 'Dellan',
        lastName: 'Much',
        role: 'Moderator',
        image: 'https://github.com/shadcn.png'
      },
      {
        id: '2',
        name: 'Giannis',
        lastName: 'Kozyris',
        role: 'Administrator',
      },
      {
        id: '3',
        name: 'Giannis',
        lastName: 'Kozyris',
        role: 'Administrator',
        image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
      },
      {

        id: '4',
        name: 'Giannis',
        lastName: 'Kozyris',
        role: 'Administrator',
        image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
      }
    ],
  },
};

