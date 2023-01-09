import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/atoms';

export default {
  component: Button,
} as Meta<typeof Button>;

type StoryButtonProps = StoryObj<typeof Button>;

export const Default: StoryButtonProps = {
  args: {
    label: 'Button example',
    variant: 'primary',
  },
};

export const SecondaryVariant: StoryButtonProps = {
  args: {
    label: 'Button secondary',
    variant: 'secondary',
  },
};

export const ButtonLink: StoryButtonProps = {
  args: {
    label: 'Button link',
    variant: 'primary',
    isLink: true,
    href: '/',
  },
};

export const ButtonLinkSecondaryVariant: StoryButtonProps = {
  args: {
    label: 'Button link',
    variant: 'secondary',
    isLink: true,
    href: '/',
    isExternal: true,
  },
};