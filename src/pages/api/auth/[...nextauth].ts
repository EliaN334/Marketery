import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type User, type NextAuthOptions } from 'next-auth';
import type Stripe from 'stripe';

import { env } from '@/env/server.mjs';
import { prisma } from '@/server/db/client';

// eslint-disable-next-line
const stripe: Stripe = require('stripe')(env.STRIPE_API_SECRET);

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
        session.user.account_id = user.account_id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      async profile(profile) {
        const { id } = await stripe.accounts.create({
          type: 'express',
          email: profile.email,
        });
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
          provider: 'GITHUB',
          role: 'USER',
          account_id: id,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', placeholder: 'Email' },
        password: { label: 'Password', placeholder: 'Password' },
      },
      async authorize(credentials) {
        // eslint-disable-next-line
        const { email, password } = credentials!;

        const user = await prisma.user.findFirst({
          where: { email, password },
        });
        switch (user?.provider) {
          case 'GITHUB':
            throw new Error('This email is already used');
          case 'DEFAULT':
            return user as User;
          default:
            throw new Error('Something went wrong');
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
