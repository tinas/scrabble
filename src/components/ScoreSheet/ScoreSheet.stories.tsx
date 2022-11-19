import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ScoreSheet from './ScoreSheet';

export default {
  title: 'Components/ScoreSheet',
  component: ScoreSheet,
} as ComponentMeta<typeof ScoreSheet>;

const Template: ComponentStory<typeof ScoreSheet> = (args) => <ScoreSheet {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  playerName: 'Ahmet',
  type: 'primary',
  words: [],
};

export const Normal = Template.bind({});
Normal.args = {
  playerName: 'Ahmet',
  type: 'primary',
  words: ['RUHİ', 'UYGUR', 'TÜRKOĞLU', 'AHMET'],
};

export const Victory = Template.bind({});
Victory.args = {
  playerName: 'Ahmet',
  type: 'secondary',
  words: ['RUHİ', 'UYGUR', 'TÜRKOĞLU', 'AHMET'],
};

export const Defeat = Template.bind({});
Defeat.args = {
  playerName: 'Ahmet',
  type: 'error',
  words: ['RUHİ', 'UYGUR', 'TÜRKOĞLU', 'AHMET'],
};
