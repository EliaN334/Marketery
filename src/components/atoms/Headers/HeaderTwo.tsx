import clsx from 'clsx';
import type { Header } from '.';

export type HeaderTwoProps = Header & {
  heading?: 'h2';
  highLightedWord?: string;
  variant?: 'primary' | 'secondary';
  lineTwo?: HeaderTwoVariantOptions;
};

type HeaderTwoVariantOptions = {
  label: string;
  word: string;
};

const HeaderTwo: React.FC<HeaderTwoProps> = ({
  label,
  className = '',
  highLightedWord,
  variant = 'primary',
  ...props
}) => {
  return variant == 'primary' ? (
    <Content label={label} highLightedWord={highLightedWord as string} />
  ) : (
    <h2
      className={clsx(
        'items- flex flex-col gap-2 font-pt-sans-narrow font-bold',
        className
      )}
    >
      <Content
        as='div'
        label={label}
        highLightedWord={highLightedWord as string}
      />

      <div className='flex items-center gap-2'>
        <div className='h-[2px] w-32 bg-tan-400' />
        <Content
          as='div'
          label={props?.lineTwo?.label as string}
          highLightedWord={props?.lineTwo?.word as string}
        />
      </div>
    </h2>
  );
};

const Content: React.FC<{
  label: string;
  highLightedWord: string;
  className?: string;
  as?: 'div' | 'h2';
}> = ({ label, highLightedWord, className, as = 'h2' }) => {
  const classes = clsx('flex gap-1 font-pt-sans-narrow font-bold', className);

  const text = (
    <>
      <span className='text-gray-900'>{label}</span>
      <span className='inline-block bg-tan-200 px-1 text-tan-500'>
        {highLightedWord}
      </span>
    </>
  );
  if (as == 'h2') return <h2 className={classes}>{text}</h2>;
  return <div className={classes}>{text}</div>;
};

export default HeaderTwo;
