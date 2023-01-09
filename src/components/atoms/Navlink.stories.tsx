import type { StoryObj, Meta } from '@storybook/react';
import { NavLink } from '@/components/atoms';

export default {
  component: NavLink,
} as Meta<typeof NavLink>;

type StoryNavLinkProps = StoryObj<typeof NavLink>;

export const Default: StoryNavLinkProps = {
  args: {
    href: '/',
    label: 'Home',
  },
};
