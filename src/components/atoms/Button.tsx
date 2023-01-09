import clsx from 'clsx';
import Link, { type LinkProps } from 'next/link';
import React from 'react';

type ButtonProps = ButtonLinkProps & {
  label?: string;
  /** @defaultValue `primary` */
  variant?: 'primary' | 'secondary';
  icon?: {
    el?: React.FC<{ className?: string }>;
    /** @defaultValue `right` */
    direcction?: 'left' | 'right';
    /** @defaultValue `false` */
    onlyIcon?: boolean;
  };
};

type ButtonLinkProps =
  | ({ isLink?: false } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ isLink?: true; isExternal?: boolean; className?: string } & LinkProps);

const Button: React.FC<ButtonProps> = ({
  label,
  variant,
  isLink,
  className,
  icon,
  ...props
}) => {
  const classNames = clsx(
    {
      'bg-tan-400 text-white transition-[box-shadow_transform] duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0.5 active:shadow active:[box-shadow:_inset_4px_4px_5px_0px_rgba(0_0_0/_0.1)]':
        variant == 'primary',
      'bg-gray-100 text-gray-700 ring-1 ring-gray-200 transition-[box-shadow] duration-500 hover:ring-gray-300 focus:ring-2 focus:ring-gray-300':
        variant == 'secondary',
    },
    className,
    'transform inline-flex items-center rounded ease-out',
    icon?.el && icon?.onlyIcon ? 'p-3' : 'px-3 py-2 gap-2'
  );
  const styledIcon = icon?.el ? (
    <icon.el
      className={clsx(
        'h-5 w-5',
        variant == 'primary' ? 'text-white' : 'text-gray-500'
      )}
    />
  ) : null;
  const renderContent = !icon?.el ? (
    label
  ) : icon?.onlyIcon ? (
    styledIcon
  ) : icon?.direcction == 'right' ? (
    <>
      {label} {styledIcon}
    </>
  ) : (
    <>
      {styledIcon} {label}
    </>
  );
  if (isLink && 'href' in props) {
    return (
      <Link
        {...props}
        {...(props.isExternal && { target: '_blank', rel: 'noopener' })}
        className={classNames}
        href={props.href}
      >
        {renderContent}
      </Link>
    );
  }
  const { type = 'button', ...buttonProps } =
    props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} type={type} className={classNames}>
      {renderContent}
    </button>
  );
};

Button.defaultProps = {
  variant: 'primary',
  icon: {
    direcction: 'right',
  },
};

export default Button;
