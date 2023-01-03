import type { Meta, StoryObj } from '@storybook/react';
import { CardCategory } from '@/components/molecules';

export default {
  component: CardCategory,
} as Meta<typeof CardCategory>;

type StoryCardCategoryProps = StoryObj<typeof CardCategory>;

export const Default: StoryCardCategoryProps = {
  args: {
    name: 'Technology',
    url: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1021&q=80',
  },
};
