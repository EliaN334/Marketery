import { type UserProvider, type UserRole } from './global';

declare module 'next-auth' {
  interface Session {
    user?: User;
  }
  interface User {
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    id: string;
    image: {
      url: string;
      public_id: string | undefined | null;
    };
    account_id: string;
    role: UserRole;
    provider: UserProvider;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      first_name: string;
      last_name: string;
      full_name: string;
      email: string;
      id: string;
      image: {
        url: string;
        public_id: string | undefined | null;
      };
      account_id: string;
      role: UserRole;
      provider: UserProvider;
    };
  }
}
