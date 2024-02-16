import { Meta, StoryFn } from '@storybook/react';
import { ProfileForm } from '.';
import { Company } from '@prisma/client';

export default {
  title: 'Forms/CompanyProfileForm',
  component: ProfileForm,
} as Meta;

const Template: StoryFn<typeof ProfileForm> = (args) => <ProfileForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  company: {} as Company
}