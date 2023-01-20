import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type LogoProps = {
  size?: 'sm' | 'md';
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  return (
    <Link className={clsx(className)} href='/'>
      {size == 'sm' ? (
        <LogoImage />
      ) : (
        <div className='inline-flex items-center gap-1'>
          <LogoImage />
          <span className='font-pt-sans-narrow text-3xl font-bold text-gray-600'>
            MARKETERY
          </span>
        </div>
      )}
    </Link>
  );
};

const LogoImage: React.FC<React.SVGAttributes<SVGElement>> = ({
  className = '',
  ...props
}) => (
  <svg
    {...props}
    className={clsx(className, 'h-6')}
    viewBox='0 0 78 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clipPath='url(#clip0_106_986)'>
      <path d='M55.5 0H77.5L58.5 32H36.5L55.5 0Z' fill='#E54911' />
      <path d='M35.5 0H51.5L32.5 32H16.5L35.5 0Z' fill='#F78340' />
      <path d='M19.5 0H31.5L12.5 32H0.5L19.5 0Z' fill='#F9A362' />
    </g>
    <defs>
      <clipPath id='clip0_106_986'>
        <rect width='78' height='32' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

export default Logo;
