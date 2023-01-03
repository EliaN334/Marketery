import { HeaderOne, HeaderTwo } from './Headers';

type HeaderProps = {
  heading: 'h1' | 'h2';
  label: string;
  highLightedWord?: string;
};

const Header: React.FC<HeaderProps> = ({ heading, label, highLightedWord }) => {
  return heading == 'h1' ? (
    <HeaderOne label={label} highLightedWord={highLightedWord as string} />
  ) : (
    <HeaderTwo label={label} />
  );
};

export default Header;
