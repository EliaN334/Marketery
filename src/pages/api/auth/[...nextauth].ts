import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import type Stripe from 'stripe';

import { prisma } from '@/server/db/client';

// eslint-disable-next-line
const stripe: Stripe = require('stripe')(process.env.STRIPE_API_SECRET);

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
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
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // eslint-disable-next-line
        const { email, password } = credentials!;

        const user = await prisma.user.findFirst({
          where: { email, password },
        });
        if (!user) throw new Error('Incorrect email or password');
        switch (user.provider) {
          case 'GITHUB':
            throw new Error('This email is already used');
          case 'DEFAULT':
            return {
              id: user.id,
              email: user.email,
              account_id: user.account_id,
              first_name: user.first_name,
              last_name: user.last_name,
              image: user.image,
              role: user.role,
              full_name: user.full_name,
              provider: user.provider,
            };
          default:
            throw new Error('Something went wrong');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
};

export default NextAuth(authOptions);
