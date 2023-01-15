import {
  CurrencyDollarIcon,
  FireIcon,
  HomeIcon,
  TvIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const iconClasses = 'h-6 w-6';

export const links = [
  {
    href: '/',
    label: 'Home',
    icon: <HomeIcon className={iconClasses} />,
  },
  {
    href: '/products',
    label: 'Products',
    icon: <TvIcon className={iconClasses} />,
  },
  {
    href: '/daily-offers',
    label: 'Daily offers',
    icon: <FireIcon className={iconClasses} />,
  },
  {
    href: '/sell',
    label: 'Sell',
    icon: <CurrencyDollarIcon className={iconClasses} />,
  },
  {
    href: '/about',
    label: 'About',
    icon: <UserGroupIcon className={iconClasses} />,
  },
];
