import { Meta, StoryFn } from '@storybook/react';
import { EmployeeForm } from '.';
import { User } from '@prisma/client';

export default {
  title: 'Forms/EmployeeForm',
  component: EmployeeForm,
} as Meta;

const Template: StoryFn<typeof EmployeeForm> = (args) => <EmployeeForm {...args} />;

export const Default = Template.bind({});
Default.args = {

}
