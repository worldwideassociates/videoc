import { Meta, StoryFn } from '@storybook/react';
import SettingsLayout from './layout';

export default {
  title: 'Layouts/SettingsLayout',
  component: SettingsLayout,
} as Meta;

const Template: StoryFn<typeof SettingsLayout> = (args) => <SettingsLayout {...args} />;

export const Default = Template.bind({});