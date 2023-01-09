import clsx from 'clsx';
import Link, { type LinkProps } from 'next/link';
import React from 'react';

type ButtonProps = ButtonLinkProps & {
  label: string;
  /**
   * @defaultValue `primary`
   */
  variant?: 'primary' | 'secondary';
};

type ButtonLinkProps =
  | ({ isLink?: false } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ isLink?: true; isExternal?: boolean; className?: string } & LinkProps);

const Button: React.FC<ButtonProps> = ({
  label,
  variant,
  isLink,
  className,
  ...props
}) => {
  const classNames = clsx(
    {
      'transform inline-block rounded px-3 py-2 ease-out': true,
      'bg-tan-400 text-white transition-[box-shadow_transform] duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0.5 active:shadow active:[box-shadow:_inset_4px_4px_5px_0px_rgba(0_0_0/_0.1)]':
        variant == 'primary',
      'bg-gray-100 text-gray-700 ring-1 ring-gray-200 transition-[box-shadow] duration-500 hover:ring-gray-300 focus:ring-2 focus:ring-gray-300':
        variant == 'secondary',
    },
    className
  );

  if (isLink && 'href' in props) {
    return (
      <Link
        {...props}
        {...(props.isExternal && { target: '_blank', rel: 'noopener' })}
        className={classNames}
        href={props.href}
      >
        {label}
      </Link>
    );
  }
  const { type = 'button', ...buttonProps } =
    props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} type={type} className={classNames}>
      {label}
    </button>
  );
};

Button.defaultProps = {
  variant: 'primary',
};

export default Button;
