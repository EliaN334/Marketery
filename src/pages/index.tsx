import { HomeLayout } from '@/components/layouts';
import {
  SectionCarousel,
  SectionLandingCategories,
  SectionLandingGallery,
  SectionLandingSeller,
} from '@/components/organisms/sections';
import type { NextPageWithLayout } from '@/types/global';
import Head from 'next/head';

const HomePage: NextPageWithLayout = () => {
  return (
    <div className='space-y-24'>
      {/* <SectionCarousel /> */}
      <SectionLandingCategories />
      <SectionLandingGallery />
      <SectionLandingSeller />
    </div>
  );
};

HomePage.getLayout = (page) => (
  <HomeLayout>
    <Head>
      <title>Marketery • Home</title>
    </Head>
    {page}
  </HomeLayout>
);
export default HomePage;
