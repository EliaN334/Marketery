import { type UserRole } from './global';
import { type UserProvider } from './global';

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
    role: UserRole;
    provider: UserProvider;
  }
}
