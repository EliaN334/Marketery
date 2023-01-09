import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/atoms';
import { GlobeAmericasIcon } from '@heroicons/react/24/outline';

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

export const ButtonWithIconNoLabel: StoryButtonProps = {
  args: {
    icon: {
      el: GlobeAmericasIcon,
      onlyIcon: true,
    },
    variant: 'primary',
  },
};

export const ButtonWithIconRight: StoryButtonProps = {
  args: {
    label: 'Button with icon right',
    icon: {
      el: GlobeAmericasIcon,
      direcction: 'right',
    },
    variant: 'primary',
  },
};

export const ButtonWithIconLeft: StoryButtonProps = {
  args: {
    label: 'Button with icon left',
    icon: {
      el: GlobeAmericasIcon,
      direcction: 'left',
    },
    variant: 'primary',
  },
};

export const ButtonWithIconLeftSecondary: StoryButtonProps = {
  args: {
    label: 'Button with icon left',
    icon: {
      el: GlobeAmericasIcon,
      direcction: 'left',
    },
    variant: 'secondary',
  },
};
