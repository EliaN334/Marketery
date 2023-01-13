import React, { Fragment } from 'react';
import { Button, Logo, NavLink } from '@/components/atoms';
import { links } from '@/utils/links';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import type { NavLinkProps } from '../atoms/NavLink';
import Link from 'next/link';
import clsx from 'clsx';

const Navbar: React.FC = () => {
  return (
    <header className='py-5'>
      <nav className='flex w-full max-w-7xl items-center justify-between gap-3 px-5 md:px-16'>
        <Logo className='hidden md:inline' />
        <Logo size='sm' className='md:hidden' />
        <div className='relative md:hidden'>
          <Menu>
            <Menu.Button
              as={Button}
              label='Open navigation'
              onlyIcon
              variant='secondary'
              icon={Bars3Icon}
            />
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 mt-2 flex origin-top-right flex-col divide-y divide-gray-100 overflow-hidden rounded border border-gray-200'>
                {links.map(({ href, label }) => (
                  <Menu.Item key={label}>
                    {({ active }) => (
                      <MenuNavLink
                        className={clsx(active && 'bg-tan-400 text-white')}
                        href={href}
                        label={label}
                      />
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <ul className='hidden gap-4 md:flex'>
          {links.map(({ href, label }) => (
            <li key={href}>
              <NavLink href={href} label={label} />
            </li>
          ))}
        </ul>

        <div className='hidden gap-3 md:flex'>
          <Button label='Sign in' isLink href='/auth/signin' />
          <Button
            label='Sign up'
            variant='secondary'
            isLink
            href='/auth/signup'
          />
        </div>
      </nav>
    </header>
  );
};

const MenuNavLink: React.FC<NavLinkProps> = ({
  href,
  label,
  className,
  ...props
}) => {
  return (
    <Link
      {...props}
      className={clsx('whitespace-nowrap px-5 py-2 text-gray-700', className)}
      href={href}
    >
      {label}
    </Link>
  );
};

export default Navbar;
