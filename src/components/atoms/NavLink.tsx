import React from 'react';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

type NavLinkProps = LinkProps & {
  label: string;
  className?: string;
};

const NavLink: React.FC<NavLinkProps> = React.forwardRef<
  HTMLAnchorElement,
  LinkProps & NavLinkProps
>(function RefElement({ label, className = '', ...props }, ref) {
  const { pathname } = useRouter();
  const isActive = props.href == pathname;
  return (
    <Link
      {...props}
      className={clsx(
        className,
        isActive ? 'text-gray-800' : 'text-gray-500',
        'flex items-center gap-1'
      )}
      ref={ref}
    >
      {isActive && (
        <span className='text-brown inline-block h-2 w-2 rounded-full bg-tan-400' />
      )}
      <span>{label}</span>
    </Link>
  );
});

export default NavLink;
