import type { Meta, StoryObj } from '@storybook/react';
import { Carrousel } from '.';
import { Pagination, Navigation } from 'swiper';
import clsx from 'clsx';

export default {
  component: Carrousel,
} as Meta<typeof Carrousel>;

type StoryCarrouselProps = StoryObj<typeof Carrousel>;

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

export const Default: StoryCarrouselProps = {
  args: {
    images,
  },
};

export const WithModules: StoryCarrouselProps = {
  args: {
    images,
    //  swiperOptions: {
    //    modules: [Pagination, Navigation]
    //  }
  },
};
