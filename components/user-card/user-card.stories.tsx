import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { UserCard } from '.';

export default {
  title: 'Components/UserCard',
  component: UserCard,
} as Meta;

const Template: StoryFn<typeof UserCard> = (args) => <UserCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  user: {
    firstName: 'Giannis',
    lastName: 'Kozyris',
    role: 'Administrator',
  },
  isModerator: false,
  isOnline: false
};




