import { type Header, HeaderOne, HeaderTwo } from './Headers';
import type { HeaderOneProps } from './Headers/HeaderOne';
import type { HeaderTwoProps } from './Headers/HeaderTwo';

type HeaderLevel = HeaderOneProps | HeaderTwoProps;

type HeaderProps = HeaderLevel & Header;

const Header: React.FC<HeaderProps> = ({ heading, ...rest }) => {
  return heading === 'h1' ? <HeaderOne {...rest} /> : <HeaderTwo {...rest} />;
};

export default Header;
