import { type StoryObj, type Meta } from '@storybook/react';
import { NavLink } from '@/components/atoms';

export default {
  component: NavLink,
} as Meta<typeof NavLink>;

type NavLinkProps = StoryObj<typeof NavLink>;

export const Default: NavLinkProps = {
  args: {
    href: '/',
    label: 'Home',
  },
};
