import { Meta, StoryFn } from '@storybook/react';
import { DepartmentCard } from '.';
import { Department, Role, User } from '@prisma/client';

export default {
  title: 'Components/DepartmentCard',
  component: DepartmentCard,
} as Meta;

const Template: StoryFn<typeof DepartmentCard> = (args) => <DepartmentCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  department: {
    id: 1,
    name: 'Department 1',
    createdAt: new Date(),
    updatedAt: new Date(),
    members: [
      {
        id: '2',
        name: 'Giannis',
        role: 'Administrator',
      },
      {
        id: '3',
        name: 'Giannis',
        lastName: 'Kozyris',
        role: 'Administrator',
        image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
      },
      {

        id: '4',
        name: 'Giannis',
        role: 'Administrator',
        image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
      },
      {
        id: '5',
        name: 'Giannis',
        role: 'Administrator',
      },
      {
        id: '6',
        name: 'Giannis',
        lastName: 'Kozyris',
        role: 'Administrator',
        image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
      },
    ]
  } as any
}