import { HomeLayout } from '@/components/layouts';
import {
  SectionCarousel,
  SectionLandingCategories,
  SectionLandingGallery,
  SectionLandingSeller,
} from '@/components/organisms/sections';
import type { NextPageWithLayout } from '@/types/global';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';

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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['navbar', 'common'])),
    },
  };
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
