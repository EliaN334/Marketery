import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '@/components/organisms';

export default {
  component: Footer,
} as Meta<typeof Footer>;

type StoryFooterProps = StoryObj<typeof Footer>;

export const Default: StoryFooterProps = {};
