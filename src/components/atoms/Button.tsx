import clsx from 'clsx';
import { motion, type MotionProps } from 'framer-motion';
import type { LinkProps } from 'next/link';
import Link from 'next/link';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps &
  ButtonLinkProps & {
    label: string;
    /**
     * @defaultValue `primary`
     */
    variant?: 'primary' | 'secondary';
    // isLink?: boolean = false;
  };

type ButtonLinkProps =
  | { isLink?: false }
  | ({ isLink?: true; isExternal: boolean } & LinkProps);

const Button: React.FC<ButtonProps> = ({
  label,
  type = 'button',
  variant = 'primary',
  isLink = false,
  ...props
}) => {
  return (
    <motion.button
      {...props}
      type={type}
      initial={{ y: 0 }}
      whileHover={{
        y: -3,
      }}
      className={clsx(
        'rounded bg-tan-400 px-3 py-2 text-white transition-[box-shadow] hover:shadow-lg'
      )}
    >
      {label}
    </motion.button>
  );
};

Button.defaultProps = {
  isLink: false,
};

export default Button;
