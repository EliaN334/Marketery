import { type Header } from '.';

export type HeaderOneProps = Header & {
  heading?: 'h1';
  highLightedWord: string;
};

const HeaderOne: React.FC<HeaderOneProps> = ({ label, highLightedWord }) => {
  return (
    <h1 className='flex items-center gap-1 font-pt-sans-narrow text-3xl font-bold md:text-4xl'>
      <span className='text-gray-900'>{label}</span>
      <span className='inline-block bg-tan-200 px-1 text-tan-500'>
        {highLightedWord}
      </span>
    </h1>
  );
};

export default HeaderOne;
