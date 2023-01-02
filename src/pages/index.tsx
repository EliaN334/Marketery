import { HomeLayout } from '@/components/layouts';
import { type NextPageWithLayout } from '@/types/global';
import Head from 'next/head';

const HomePage: NextPageWithLayout = () => {
  return <div>Home content</div>;
};

HomePage.getLayout = (page) => (
  <HomeLayout>
    <Head>
      <title>Marketery - Home</title>
    </Head>{' '}
    {page}
  </HomeLayout>
);
export default HomePage;
