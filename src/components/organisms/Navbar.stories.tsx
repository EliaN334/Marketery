import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from '@/components/organisms';

export default {
  component: Navbar,
} as Meta<typeof Navbar>;

type StoryNavbarProps = StoryObj<typeof Navbar>;

export const Default: StoryNavbarProps = {};
