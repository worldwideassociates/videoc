import { Meta, StoryFn } from '@storybook/react';
import { CompanyProfileForm } from '.';
import { Company } from '@prisma/client';

export default {
  title: 'Forms/CompanyProfileForm',
  component: CompanyProfileForm,
} as Meta;

const Template: StoryFn<typeof CompanyProfileForm> = (args) => <CompanyProfileForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  company: {} as Company
}