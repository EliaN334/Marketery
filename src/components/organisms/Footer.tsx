import React from 'react';
import { Anchor, Input, Logo } from '@/components/atoms';
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from '@/components/atoms/socialIcons';
import { footerLinks } from '@/utils/footerLinks';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const icons = [
  {
    href: 'https://instagram.com',
    icon: <InstagramIcon className='h-5 w-5' key={0} />,
  },
  {
    href: 'https://facebook.com',
    icon: <FacebookIcon className='h-5 w-5' key={1} />,
  },
  {
    href: 'https://tiktok.com',
    icon: <TikTokIcon className='h-5 w-5' key={2} />,
  },
];

const Footer: React.FC = () => {
  return (
    <footer className='px-16 py-5'>
      <div>
        <Logo />
        <p className='text-gray-500'>
          © {new Date().getFullYear()} Marketery. All rights reserved
        </p>

        <ul className='mt-5 flex gap-3'>
          {icons.map(({ icon, href }) => (
            <li
              className='inline-block rounded-full fill-gray-500 p-1 transition-colors hover:bg-gray-100'
              key={href}
            >
              <a href={href} target='_blank' rel='noopener noreferrer'>
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-5 flex gap-7'>
        {footerLinks.map(({ links, title }) => (
          <ul key={title}>
            <p className='text-lg font-medium'>{title}</p>
            {links.map(({ href, label }) => (
              <li className='mt-1.5' key={label}>
                <Anchor label={label} href={href} />
              </li>
            ))}
          </ul>
        ))}
        <ul>
          <p className='text-lg font-medium'>Language & Currency</p>
          <Input
            listBox
            options={[
              {
                name: 'English',
                value: 'en',
              },
              {
                name: 'Español',
                value: 'es',
              },
            ]}
            label='Language'
            icon={ChevronDownIcon}
          />
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
