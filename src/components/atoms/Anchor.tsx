import React from 'react';
import Link, { type LinkProps } from 'next/link';
import clsx from 'clsx';

type AnchorProps = LinkProps & {
  label: string;
  className?: string;
  isExternal?: boolean;
  variant?: 'primary' | 'secondary';
};

const Anchor: React.FC<AnchorProps> = ({
  className = '',
  isExternal = false,
  label,
  variant = 'primary',
  ...props
}) => {
  return variant == 'primary' ? (
    <Link
      {...props}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      className={clsx(className, 'text-gray-500 hover:underline')}
    >
      {label}
    </Link>
  ) : (
    <Link
      {...props}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      className={clsx(className, 'text-tan-500 hover:underline')}
    >
      {label}
    </Link>
  );
};

export default Anchor;
