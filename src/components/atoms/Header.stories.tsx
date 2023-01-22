import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@/components/atoms';

export default {
  component: Header,
} as Meta<typeof Header>;

type StoryHeaderProps = StoryObj<typeof Header>;

export const HeadingOne: StoryHeaderProps = {
  args: {
    heading: 'h1',
    label: 'HEADER ONE',
  },
};

export const HeaderTwo: StoryHeaderProps = {
  args: {
    heading: 'h2',
    label: 'HEADER',
    highLightedWord: 'TWO',
  },
};
