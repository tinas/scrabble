import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Letter from './Letter';

export default {
  title: 'Components/Letter',
  component: Letter,
} as ComponentMeta<typeof Letter>;

const Template: ComponentStory<typeof Letter> = (args) => <Letter {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  type: 'primary',
  letter: 'A',
};

export const Match = Template.bind({});
Match.args = {
  type: 'secondary',
  letter: 'B',
};

export const NotMatch = Template.bind({});
NotMatch.args = {
  type: 'error',
  letter: 'C',
};
