import { Meta, StoryFn } from '@storybook/react';
import { UserSelect } from '.';
import { User } from '@prisma/client';

export default {
  title: 'Components/UserSelect',
  component: UserSelect,
} as Meta;

const Template: StoryFn<typeof UserSelect> = (args) => <UserSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  users: [
    {
      id: '1',
      name: 'John Doe',
      image: 'https://randomuser.me/api/portraits'
    } as User,
    {
      id: '2',
      name: 'Jane Doe',
      image: 'https://randomuser.me/api/portraits'
    } as User
  ],
  selected: undefined,
  onSelect: (options: any) => console.log(options)
}