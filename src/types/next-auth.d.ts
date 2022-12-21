import { type DefaultSession } from 'next-auth';
import { type UserRole } from './global';

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string;
      role: UserRole;
    } & DefaultSession['user'];
  }
  interface User {
    full_name: string;
    email: string;
    id: string;
    image: string;
    role: UserRole;
  }
}
