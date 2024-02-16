import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { UserCard } from '.';
import { Role, User } from '@prisma/client';

export default {
  title: 'Components/UserCard',
  component: UserCard,
} as Meta;

const Template: StoryFn<typeof UserCard> = (args) => <UserCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  user: {
    name: 'Giannis Kozyris',
    role: Role.ADMIN,
  } as User,
  isModerator: false,
  isOnline: false
};




