import type { Meta, StoryObj } from '@storybook/react';
import { CardProduct } from '@/components/molecules';
import { uniqueId } from '@/utils/unique-id';

export default {
  component: CardProduct,
} as Meta<typeof CardProduct>;

type StoryCardProductProps = StoryObj<typeof CardProduct>;

export const Default: StoryCardProductProps = {
  args: {
    name: 'White T-shirt',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: '/images/tshirt-example.jpg',
    id: uniqueId(),
  },
};
