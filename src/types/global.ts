import { type NextPage } from 'next';
import { type Session } from 'next-auth';
import { type AppProps } from 'next/app';
import { type ReactElement, type ReactNode } from 'react';

const USER_ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

const USER_PROVIDER = {
  GITHUB: 'GITHUB',
  DEFAULT: 'DEFAULT',
} as const;

type ObjectValues<T> = T[keyof T];

export type UserRole = ObjectValues<typeof USER_ROLE>;
export type UserProvider = ObjectValues<typeof USER_PROVIDER>;

export type RequestBodyData = {
  products: {
    price_id: string;
    quantity: number;
  }[];
  account_id: string;
};

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps<{ session: Session | null }> & {
  Component: NextPageWithLayout;
};
