import clsx from 'clsx';
import Link, { type LinkProps } from 'next/link';
import React from 'react';

type ButtonProps = ButtonLinkProps & {
  label?: string;
  /** @defaultValue `primary` */
  variant?: 'primary' | 'secondary';
  /** @defaultValue `true` */
  showLabel?: boolean;
  icon?: React.FC<{ className?: string }>;
  /** @defaultValue `right` */
  iconDirecction?: 'left' | 'right';
  /** @defaultValue `false` */
  onlyIcon?: boolean;
};

type ReactButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps =
  | ({ isLink?: false } & ReactButtonProps)
  | ({ isLink?: true; isExternal?: boolean; className?: string } & LinkProps);

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  isLink = false,
  className,
  icon: Icon,
  showLabel = true,
  iconDirecction = 'right',
  onlyIcon = false,
  ...props
}) => {
  // const [showLabelState, setShowLabelState] = useState(showLabel);
  const classNames = clsx(
    {
      'bg-tan-400 text-white transition-[box-shadow_transform] duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0.5 active:shadow':
        variant == 'primary',
      'bg-gray-100 text-gray-700 ring-1 ring-gray-200 transition-[box-shadow_width] duration-500 hover:ring-gray-300 focus:ring-2 focus:ring-gray-300':
        variant == 'secondary',
    },
    className,
    'transform inline-flex items-center justify-center rounded ease-out',
    Icon && onlyIcon ? 'p-3' : 'px-3 py-2 gap-2'
  );

  const styledIcon = Icon ? (
    <Icon
      className={clsx(
        'h-5 w-5',
        variant == 'primary' ? 'text-white' : 'text-gray-500'
      )}
    />
  ) : null;

  const renderContent = !Icon ? (
    label
  ) : onlyIcon ? (
    styledIcon
  ) : iconDirecction == 'right' ? (
    <>
      {showLabel && label} {styledIcon}
    </>
  ) : (
    <>
      {styledIcon} {showLabel && label}
    </>
  );
  if (isLink && 'href' in props) {
    return (
      <Link
        {...props}
        {...(props.isExternal && { target: '_blank', rel: 'noopener' })}
        {...(onlyIcon && { 'aria-label': label })}
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
    <button
      {...buttonProps}
      {...(onlyIcon && { 'aria-label': label })}
      type={type}
      className={classNames}
    >
      {renderContent}
    </button>
  );
};

export default Button;
