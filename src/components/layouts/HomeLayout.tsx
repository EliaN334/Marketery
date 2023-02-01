import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Footer, Navbar } from '../organisms';

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='mx-auto flex min-h-screen w-full max-w-7xl flex-col'>
      <Navbar />
      <main className='px-16'>{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
