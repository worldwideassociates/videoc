import { Meta, StoryFn } from '@storybook/react';
import { Heading } from '.';

export default {
  title: 'Components/Heading',
  component: Heading,
} as Meta;

const Template: StoryFn<typeof Heading> = (args) => <Heading {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Departments',
  description: 'Manage your departments'
}