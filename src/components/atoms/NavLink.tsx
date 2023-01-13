import React from 'react';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

export type NavLinkProps = LinkProps & {
  label: string;
  className?: string;
};

const NavLink: React.FC<NavLinkProps> = React.forwardRef<
  HTMLAnchorElement,
  LinkProps & NavLinkProps
>(function RefNavLink({ label, className = '', ...props }, ref) {
  const { pathname } = useRouter();
  const isActive = props.href == pathname;
  return (
    <Link
      {...props}
      className={clsx(
        className,
        isActive
          ? 'text-gray-800 hover:text-gray-900'
          : 'text-gray-500 hover:text-gray-700',
        'group flex items-center gap-1'
      )}
      ref={ref}
    >
      {isActive && (
        <span className='inline-block h-2 w-2 rounded-full bg-tan-400' />
      )}
      <span className='whitespace-nowrap'>{label}</span>
    </Link>
  );
});

export default NavLink;
