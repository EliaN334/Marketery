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
    label: 'home',
    icon: <HomeIcon className={iconClasses} />,
  },
  {
    href: '/products',
    label: 'products',
    icon: <TvIcon className={iconClasses} />,
  },
  {
    href: '/daily-offers',
    label: 'daily-offers',
    icon: <FireIcon className={iconClasses} />,
  },
  {
    href: '/sell',
    label: 'sell',
    icon: <CurrencyDollarIcon className={iconClasses} />,
  },
  {
    href: '/about',
    label: 'about',
    icon: <UserGroupIcon className={iconClasses} />,
  },
];
