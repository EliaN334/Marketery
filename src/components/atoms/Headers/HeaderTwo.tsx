import { type Header } from '.';

export type HeaderTwoProps = Header & {
  heading?: 'h2';
};

const HeaderTwo: React.FC<HeaderTwoProps> = ({ label }) => {
  return <h2 className='font-pt-sans-narrow text-2xl md:text-3xl'>{label}</h2>;
};

export default HeaderTwo;
