import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '@/components/atoms';

export default {
  component: Logo,
} as Meta<typeof Logo>;

type StoryLogoProps = StoryObj<typeof Logo>;

export const Default: StoryLogoProps = {
  args: {
    size: 'md',
  },
};

export const SizeSm: StoryLogoProps = {
  args: {
    size: 'sm',
  },
};
