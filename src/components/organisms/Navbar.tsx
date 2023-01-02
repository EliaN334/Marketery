import React from 'react';
import { Logo, NavLink } from '@/components/atoms';
import { links } from '@/utils/links';

const Navbar: React.FC = () => {
  return (
    <header className='py-5'>
      <nav className='flex w-full max-w-7xl items-center gap-3 px-16'>
        <Logo />
        <ul className='flex gap-3'>
          {links.map(({ href, label }) => (
            <li key={href}>
              <NavLink href={href} label={label} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
