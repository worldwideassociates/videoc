import { Meta, StoryFn } from '@storybook/react';
import { CustomerForm } from '.';
import { User } from '@prisma/client';

export default {
  title: 'Forms/CustomerForm',
  component: CustomerForm,
} as Meta;

const Template: StoryFn<typeof CustomerForm> = (args) => <CustomerForm {...args} />;

export const Default = Template.bind({});
Default.args = {

}
