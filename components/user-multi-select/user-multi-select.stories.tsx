import { Meta, StoryFn } from '@storybook/react';
import { UserMultiSelect } from '.';
import { User } from '@prisma/client';

export default {
  title: 'Components/UserMultiSelect',
  component: UserMultiSelect,
} as Meta;

const Template: StoryFn<typeof UserMultiSelect> = (args) => <UserMultiSelect {...args} />;

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
  selected: [],
  onSelect: (options: any) => console.log(options)
}