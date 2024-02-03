import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NavItem } from '.';
import { User, Users } from 'lucide-react';

export default {
  title: 'Components/NavItem',
  component: NavItem,
} as Meta;

const Template: StoryFn<typeof NavItem> = (args) => <NavItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Collaborators',
  routes: [
    {
      label: 'Collaborators',
      Icon: User,
      href: '/collaborators',
    },
    {
      label: 'Customer Associations',
      Icon: Users,
      href: '/customer-associations',
    },
  ]
};
