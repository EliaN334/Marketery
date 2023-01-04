import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/atoms';

export default {
  component: Input,
} as Meta<typeof Input>;

type StoryInputProps = StoryObj<typeof Input>;

export const Default: StoryInputProps = {
  args: {
    label: 'Search',
  },
};

export const Password: StoryInputProps = {
  args: {
    label: 'Password',
    type: 'password',
  },
};

export const WithIcon: StoryInputProps = {
  args: {
    label: 'Input with icon',
  },
};
