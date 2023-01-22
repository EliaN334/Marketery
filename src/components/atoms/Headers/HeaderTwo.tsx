import clsx from 'clsx';
import { type Header } from '.';

export type HeaderTwoProps = Header & {
  heading?: 'h2';
  highLightedWord?: string;
};

const HeaderTwo: React.FC<HeaderTwoProps> = ({
  label,
  className = '',
  highLightedWord,
}) => {
  return (
    <h2
      className={clsx(
        'flex items-center gap-1 font-pt-sans-narrow font-bold',
        className
      )}
    >
      <span className='text-gray-900'>{label}</span>
      <span className='inline-block bg-tan-200 px-1 text-tan-500'>
        {highLightedWord}
      </span>
    </h2>
  );
};
export default HeaderTwo;
