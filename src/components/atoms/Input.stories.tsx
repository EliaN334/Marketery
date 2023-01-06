import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/atoms';
import {
  MagnifyingGlassIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

export default {
  component: Input,
} as Meta<typeof Input>;

type StoryInputProps = StoryObj<typeof Input>;

export const Default: StoryInputProps = {
  args: {
    label: 'Default input',
  },
};

export const Password: StoryInputProps = {
  args: {
    label: 'Password',
    type: 'password',
  },
};

export const WithIconRight: StoryInputProps = {
  args: {
    label: 'Input with icon',
    icon: {
      el: MagnifyingGlassIcon,
      direcction: 'right',
    },
  },
};

export const WithIconLeft: StoryInputProps = {
  args: {
    label: 'Input with icon',
    icon: {
      el: MagnifyingGlassIcon,
      direcction: 'left',
    },
  },
};

export const WithIconAndError: StoryInputProps = {
  args: {
    label: 'Input with error',
    error: 'This field is required',
    icon: {
      el: MagnifyingGlassIcon,
      direcction: 'right',
    },
  },
};

export const WithClickableIcon: StoryInputProps = {
  args: {
    label: 'Input with icon button',
    icon: {
      el: EyeIcon,
      direcction: 'right',
      clickable: true,
      action: () => console.count('clicked: '),
    },
  },
};

export const WithToggleIcon: StoryInputProps = {
  args: {
    label: 'Input with icon button',
    icon: {
      el: EyeIcon,
      direcction: 'right',
      clickable: true,
      changeTo: EyeSlashIcon,
      action: () => console.count('clicked: '),
    },
    type: 'password',
  },
};
