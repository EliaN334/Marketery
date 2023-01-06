import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/atoms';

export default {
  component: Button,
} as Meta<typeof Button>;

type StoryButtonProps = StoryObj<typeof Button>;

export const Default: StoryButtonProps = {
  args: {
    label: 'Button example',
  },
};
