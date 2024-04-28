import { Meta, StoryFn } from '@storybook/react';
import { CollaboratorForm } from '.';
import { User } from '@prisma/client';

export default {
  title: 'Forms/CollaboratorForm',
  component: CollaboratorForm,
} as Meta;

const Template: StoryFn<typeof CollaboratorForm> = (args) => <CollaboratorForm {...args} />;

export const Default = Template.bind({});
Default.args = {

}
