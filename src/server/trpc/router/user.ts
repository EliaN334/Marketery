import deleteCldImage from '@/utils/delete-cld-image';
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { Stripe } from 'stripe';
import { TRPCError } from '@trpc/server';
import { env } from '@/env/server.mjs';

const stripe = new Stripe(process.env.STRIPE_API_SECRET as string, {
  apiVersion: '2022-11-15',
});

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
      const uniqueEmail = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (uniqueEmail)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'This email already exists. Please use another.',
        });
      const account = await stripe.accounts.create({
        type: 'express',
        email: input.email,
      });
      const user = await prisma.user.create({
        data: {
          ...input,
          account_id: account.id,
        },
      });
      const accountLink = await stripe.accountLinks.create({
        account: user.account_id,
        refresh_url: `${env.NEXTAUTH_URL}/api/create-account-link?account_id=${user.account_id}`,
        return_url: `${env.NEXTAUTH_URL}?return=true`,
        type: 'account_onboarding',
      });
      return {
        user,
        onboarding_url: accountLink?.url,
      };
    }),
  createPaymentIntent: protectedProcedure
    .input(
      z.object({
        on_belhaf_of_account_id: z.string(),
        destination_account_id: z.string(),
        ammount: z.number(),
      })
    )
    .mutation(
      async ({
        input: { ammount, on_belhaf_of_account_id, destination_account_id },
      }) => {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: ammount,
          currency: 'usd',
          application_fee_amount: 200,
          on_behalf_of: destination_account_id,
          transfer_data: {
            destination: destination_account_id,
          },
        });
        return {
          client_secret: paymentIntent?.client_secret,
        };
      }
    ),
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
