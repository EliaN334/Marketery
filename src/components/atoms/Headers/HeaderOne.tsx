import clsx from 'clsx';
import type { Header } from '.';

export type HeaderOneProps = Header & {
  heading?: 'h1';
};

const HeaderOne: React.FC<HeaderOneProps> = ({ label, className = '' }) => {
  return (
    <h1 className={clsx('font-pt-sans-narrow font-bold', className)}>
      {label}
    </h1>
  );
};

export default HeaderOne;
