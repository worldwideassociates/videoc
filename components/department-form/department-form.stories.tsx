import { Meta, StoryFn } from '@storybook/react';
import { DepartmentForm } from '.';
import { User } from '@prisma/client';

export default {
  title: 'Forms/DepartmentForm',
  component: DepartmentForm,
} as Meta;

const Template: StoryFn<typeof DepartmentForm> = (args) => <DepartmentForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  usersOptions: [
    {
      id: '1',
      name: 'John Doe',
    } as User,
    {
      id: '2',
      name: 'Jane Doe',
    } as User,
    {
      id: '3',
      name: 'User 3',
    } as User,
    {
      id: '4',
      name: 'User 4',
    } as User
  ]
}
