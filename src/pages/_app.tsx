import { SessionProvider } from 'next-auth/react';
import { type AppPropsWithLayout } from '@/types/global';
import { trpc } from '@/utils/trpc';

import '../styles/globals.css';

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
