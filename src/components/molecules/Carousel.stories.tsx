import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '.';

export default {
  component: Carousel,
} as Meta<typeof Carousel>;

type StoryCaouselProps = StoryObj<typeof Carousel>;

const images = [
  {
    url: '/images/image-1.jpg',
    alt: '',
  },
  {
    url: '/images/image-2.jpg',
    alt: '',
  },
  {
    url: '/images/image-3.jpg',
    alt: '',
  },
  {
    url: '/images/image-4.jpg',
    alt: '',
  },
  {
    url: '/images/image-5.jpg',
    alt: '',
  },
];

export const Default: StoryCaouselProps = {
  args: {
    images,
  },
};

export const WithNavigationAndPagination: StoryCaouselProps = {
  args: {
    images,
    navigation: true,
    pagination: true,
  },
};
