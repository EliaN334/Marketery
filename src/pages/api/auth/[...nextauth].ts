import NextAuth, { type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { env } from '../../../env/server.mjs';
import { prisma } from '../../../server/db/client';
import { UserProvider, UserRole } from '@/types/global';

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.first_name = user.first_name;
        session.user.last_name = user.last_name;
        session.user.full_name = user.full_name;
        session.user.role = user.role;
        session.user.image = user.image;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          email: profile.email,
          first_name: profile.login,
          last_name: profile.login,
          full_name: profile.login,
          password: null,
          image: {
            url: profile.avatar_url,
            public_id: null,
          },
          provider: UserProvider.GITHUB,
          role: UserRole.USER,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
