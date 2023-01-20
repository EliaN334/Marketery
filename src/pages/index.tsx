import { HomeLayout } from '@/components/layouts';
import { Carousel } from '@/components/molecules';
import type { NextPageWithLayout } from '@/types/global';
import Head from 'next/head';

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

const HomePage: NextPageWithLayout = () => {
  return (
    <div>
      <Carousel className='h-[700px]' images={images} navigation />
    </div>
  );
};

HomePage.getLayout = (page) => (
  <HomeLayout>
    <Head>
      <title>Marketery - Home</title>
    </Head>
    {page}
  </HomeLayout>
);
export default HomePage;
