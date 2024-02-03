import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { StatsCard } from '.';

export default {
  title: 'Components/StatsCard',
  component: StatsCard,
} as Meta;

const Template: StoryFn<typeof StatsCard> = (args) => <StatsCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Total Minutes',
  description: '1,452 min',
  footerText: '+20% from yesterday',
};

