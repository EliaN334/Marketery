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
    icon: MagnifyingGlassIcon,
    direcction: 'right',
  },
};

export const WithIconLeft: StoryInputProps = {
  args: {
    label: 'Input with icon',
    icon: MagnifyingGlassIcon,
    direcction: 'left',
  },
};

export const WithIconAndError: StoryInputProps = {
  args: {
    label: 'Input with error',
    error: 'This field is required',
    icon: MagnifyingGlassIcon,
    direcction: 'right',
  },
};

export const WithClickableIcon: StoryInputProps = {
  args: {
    label: 'Input with icon button',
    icon: MagnifyingGlassIcon,
    direcction: 'right',
    clickable: true,
    action: () => console.count('clicked: '),
  },
};

export const WithToggleIcon: StoryInputProps = {
  args: {
    label: 'Input with toggle button',
    icon: EyeIcon,
    direcction: 'right',
    clickable: true,
    changeTo: EyeSlashIcon,
    action: () => console.count('clicked: '),
    type: 'password',
  },
};

export const ListBoxInput: StoryInputProps = {
  args: {
    label: 'ListBox Input',
    listBox: true,
    options: [
      {
        name: 'Option 1',
        value: 'Option 1',
      },
      {
        name: 'Option 2',
        value: 'Option 2',
      },
      {
        name: 'Option 3',
        value: 'Option 3',
      },
    ],
  },
};

export const ListBoxInputWithIcon: StoryInputProps = {
  args: {
    label: 'ListBox Input',
    listBox: true,
    icon: MagnifyingGlassIcon,
    direcction: 'right',
    options: [
      {
        name: 'Option 1',
        value: 'Option 1',
      },
      {
        name: 'Option 2',
        value: 'Option 2',
      },
      {
        name: 'Option 3',
        value: 'Option 3',
      },
    ],
  },
};
