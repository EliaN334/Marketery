import React from 'react';
import Link, { type LinkProps } from 'next/link';
import clsx from 'clsx';

type AnchorProps = LinkProps & {
  label: string;
  className?: string;
  isExternal?: boolean;
};

const Anchor: React.FC<AnchorProps> = ({
  className = '',
  isExternal = false,
  label,
  ...props
}) => {
  return (
    <Link
      {...props}
      {...(isExternal && { target: '_blank', rel: 'noopener' })}
      className={clsx(className, 'text-gray-500 hover:underline')}
    >
      {label}
    </Link>
  );
};

export default Anchor;
