import type { Meta, StoryObj } from '@storybook/react';
import { Anchor } from '@/components/atoms';

export default {
  component: Anchor,
} as Meta<typeof Anchor>;

type StoryAnchorProps = StoryObj<typeof Anchor>;

export const Default: StoryAnchorProps = {
  args: {
    label: 'Link component',
    href: '/',
  },
};
