import React from 'react';
import { Anchor, Input, Logo } from '@/components/atoms';
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from '@/components/atoms/socialIcons';
import { footerLinks } from '@/utils/footerLinks';
import {
  ChevronDownIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

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
  const { watch, control } = useForm({
    defaultValues: {
      'listbox-lang': 'en',
    },
  });
  const { i18n } = useTranslation();
  console.log(watch('listbox-lang'));
  return (
    <footer className='mb-5 mt-auto px-16 py-5 pt-24'>
      <div className='flex flex-col justify-between md:flex-row'>
        <div>
          <Logo />
          <p className='text-gray-500'>
            © {new Date().getFullYear()} Marketery. All rights reserved
          </p>

          <ul className='mt-5 flex gap-1'>
            {icons.map(({ icon, href }) => (
              <li key={href}>
                <a
                  href={href}
                  target='_blank'
                  className='inline-block rounded-full fill-gray-500 p-3 transition-colors hover:bg-gray-100'
                  rel='noopener noreferrer'
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className='mt-5 flex flex-wrap justify-between gap-7 md:flex-nowrap md:gap-12 lg:gap-20'>
          {footerLinks.map(({ links, title }) => (
            <ul key={title}>
              <p className='text-lg font-medium text-gray-900'>{title}</p>
              {links.map(({ href, label }) => (
                <li className='mt-1.5' key={label}>
                  <Anchor label={label} href={href} />
                </li>
              ))}
            </ul>
          ))}
          <ul className='flex flex-col'>
            <p className='mb-1.5 text-lg font-medium text-gray-900'>
              Language & Currency
            </p>
            <Controller
              name='listbox-lang'
              defaultValue='en'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  listBox
                  onSelectedOption={async ({ value }) => {
                    console.log(value, ' selected now');
                    i18n.changeLanguage('es', (err) => {
                      if (err) console.error(err);
                      if (!err) console.log('changed');
                    });
                  }}
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
              )}
            />
            <Input
              className='mt-4'
              listBox
              options={[
                {
                  name: 'USD',
                  value: 'usd',
                },
                {
                  name: 'CAD',
                  value: 'cad',
                },
                {
                  name: 'EU',
                  value: 'EU',
                },
              ]}
              label='Currency'
              icon={CurrencyDollarIcon}
            />
          </ul>
        </div>
      </div>
      <hr className='my-7 bg-gray-300' />
      <div className='flex flex-col items-center justify-between gap-3 sm:flex-row'>
        <p className='text-sm text-gray-500'>
          Ut metus enim, convallis sed augue tristique, <br /> vehicula
          vestibulum nisl.
        </p>
        <Input
          label='Subscribe to our newsletter'
          type='email'
          clickable
          action={() => alert('Email sent')}
          icon={EnvelopeIcon}
        />
      </div>
    </footer>
  );
};

export default Footer;
