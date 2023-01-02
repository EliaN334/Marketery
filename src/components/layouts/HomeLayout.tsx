import React from 'react';
import { Footer, Navbar } from '../organisms';

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
