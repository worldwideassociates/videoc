import { Meta, StoryFn } from '@storybook/react';
import { CompanyProfileForm } from '.';

export default {
  title: 'Forms/CompanyProfileForm',
  component: CompanyProfileForm,
} as Meta;

const Template: StoryFn<typeof CompanyProfileForm> = (args) => <CompanyProfileForm {...args} />;

export const Default = Template.bind({});