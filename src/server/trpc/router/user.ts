import deleteCldImage from '@/utils/delete-cld-image';
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { env } from '@/env/server.mjs';
import { type Stripe } from 'stripe';

// eslint-disable-next-line
const stripe: Stripe = require('stripe')(env.STRIPE_API_SECRET);

export const userRouter = router({
  listUsers: protectedProcedure.query(
    async ({ ctx: { prisma } }) => await prisma.user.findMany()
  ),
  getUserById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(
      async ({ ctx: { prisma }, input }) =>
        await prisma.user.findFirst({ where: { id: input.id } })
    ),
  createUser: protectedProcedure
    .input(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        full_name: z.string(),
        email: z.string().email(),
        image: z.object({
          url: z.string().url(),
          public_id: z.string(),
        }),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const account = await stripe.accounts.create({
        type: 'express',
        email: input.email,
      });

      const accountOnBoarding = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: 'http://localhost:3000?refresh=true',
        return_url: 'http://localhost:3000?return=true',
        type: 'account_onboarding',
      });
      return await prisma.user.create({ data: input });
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        first_name: z.string().optional(),
        last_name: z.string().optional(),
        full_name: z.string().optional(),
        email: z.string().email().optional(),
        image: z
          .object({
            url: z.string().url(),
            public_id: z.string(),
          })
          .optional(),
        role: z.enum(['USER', 'ADMIN']).optional(),
        password: z.string().optional(),
      })
    )
    .mutation(
      async ({ ctx: { prisma }, input: { id, ...args } }) =>
        await prisma.user.update({ where: { id }, data: args })
    ),

  deleteUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { id } }) => {
      const user = await prisma.product.findFirst({ where: { id } });
      deleteCldImage(user?.image_preview?.public_id as string);
      return await prisma.user.delete({ where: { id } });
    }),
});
