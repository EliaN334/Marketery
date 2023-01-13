import type { Meta, StoryObj } from '@storybook/react';
import { CardProduct } from '@/components/molecules';

export default {
  component: CardProduct,
} as Meta<typeof CardProduct>;

const uniqueId = () => Math.random().toString(36).slice(2, 10);

type StoryCardProductProps = StoryObj<typeof CardProduct>;

export const Default: StoryCardProductProps = {
  args: {
    name: 'White T-shirt',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: '/images/tshirt-example.jpg',
    id: uniqueId(),
  },
};
