import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { MeetingCard } from ".";

export default {
  title: "Components/MeetingCard",
  component: MeetingCard,
} as Meta;

const Template: StoryFn<typeof MeetingCard> = (args) => (
  <MeetingCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  meeting: {
    id: "1",
    title: "Sales Meeting",
    description: "Meeting Description",
    startDateTime: new Date("30-01-2024 12:00"),
  } as any,
};
