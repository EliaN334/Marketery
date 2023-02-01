import React, { Fragment } from 'react';
import { Button, Logo, NavLink } from '@/components/atoms';
import { links } from '@/utils/links';
import { ArrowLongRightIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

const Navbar: React.FC = () => {
  const { t } = useTranslation('navbar');
  return (
    <header className='relative py-5'>
      <nav className='flex w-full max-w-7xl items-center justify-between gap-3 px-5 md:px-16'>
        <Logo className='hidden md:inline' />
        <Logo size='sm' className='md:hidden' />
        <div className='md:hidden'>
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
              <Menu.Items className='absolute inset-x-0 z-20 mt-2 grid origin-top-right grid-cols-1 overflow-hidden rounded border border-gray-100 bg-white shadow-md sm:grid-cols-2'>
                {links.map(({ href, label, icon }) => (
                  <Menu.Item key={label}>
                    {({ active }) => (
                      <Link
                        href={href}
                        className={clsx(
                          'flex items-center gap-5 rounded-md p-5',
                          active ? 'bg-gray-100 text-gray-600' : 'text-gray-500'
                        )}
                      >
                        <div
                          className={clsx(
                            'rounded p-2',
                            active
                              ? 'bg-gray-200 text-gray-600'
                              : 'text-gray-500'
                          )}
                        >
                          {icon}
                        </div>
                        <span className='text-lg font-medium'>
                          {t(`links.${label}`)}
                        </span>
                        <ArrowLongRightIcon className='ml-auto h-4 w-4' />
                      </Link>
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
              <NavLink href={href} label={t(`links.${label}`)} />
            </li>
          ))}
        </ul>

        <div className='hidden gap-3 md:flex'>
          <Button label={t('links.sign-in')} isLink href='/auth/signin' />
          <Button
            label={t('links.sign-up')}
            variant='secondary'
            isLink
            href='/auth/signup'
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
