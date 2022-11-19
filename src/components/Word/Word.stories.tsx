import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Word from './Word';

export default {
  title: 'Components/Word',
  component: Word,
} as ComponentMeta<typeof Word>;

const Template: ComponentStory<typeof Word> = (args) => <Word {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  type: 'primary',
  word: 'AHMET',
};

export const Match = Template.bind({});
Match.args = {
  type: 'secondary',
  word: 'BEYZA',
};

export const NotMatch = Template.bind({});
NotMatch.args = {
  type: 'error',
  word: 'UYGUR',
};
