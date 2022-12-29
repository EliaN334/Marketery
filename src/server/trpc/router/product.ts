import { env } from '@/env/server.mjs';
import deleteCldImage from '@/utils/delete-cld-image';
import Stripe from 'stripe';
import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

const stripe = new Stripe(env.STRIPE_API_SECRET, {
  apiVersion: '2022-11-15',
});

export const productRouter = router({
  listProducts: publicProcedure.query(
    async ({ ctx: { prisma } }) => await prisma.product.findMany()
  ),
  listProductsByUserId: protectedProcedure
    .input(
      z.object({
        user_id: z.string(),
      })
    )
    .query(
      async ({ ctx: { prisma }, input: { user_id } }) =>
        await prisma.product.findMany({ where: { user_id } })
    ),
  getProductById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(
      async ({ ctx: { prisma }, input: { id } }) =>
        await prisma.product.findFirst({ where: { id } })
    ),
  createProduct: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        description: z.string(),
        qty: z.number(),
        image_preview: z.object({
          url: z.string().url(),
          public_id: z.string(),
        }),
        images: z
          .object({
            url: z.string().url(),
            public_id: z.string(),
          })
          .array()
          .max(7),
        discount: z.number().optional(),
        user_id: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: data }) => {
      const product = await prisma.product.create({ data });
      await stripe.products.create({
        name: data.name,
        description: data.description,
        active: data.qty !== 0,
        images: [data.image_preview.url].concat(
          data.images.map((image) => image.url)
        ),
        url: `${env.NEXTAUTH_URL}/products/${product.id}`,
        id: product.id,
        default_price_data: {
          currency: 'usd',
          unit_amount_decimal: data.price.toString(),
        },
        type: 'good',
        shippable: true,
      });
      return product;
    }),
  updateProduct: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        qty: z.number().optional(),
        image_preview: z
          .object({
            url: z.string().url(),
            public_id: z.string(),
          })
          .optional(),
        images: z
          .object({
            url: z.string().url(),
            public_id: z.string(),
          })
          .array()
          .max(7)
          .optional(),
        discount: z.number().optional(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { id, ...args } }) => {
      const product = await prisma.product.update({
        where: { id },
        data: args,
      });
      await stripe.products.update(product.id, {
        name: args.name,
        description: args.description,
        active: args.qty !== 0,
        images: [args?.image_preview?.url].concat(
          args?.images?.map((image) => image.url)
        ) as string[],
        url: `${env.NEXTAUTH_URL}/products/${product.id}`,
      });
      return;
    }),

  deleteProduct: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { id } }) => {
      const product = await prisma.product.findFirst({ where: { id } });
      deleteCldImage(product?.image_preview?.public_id as string);
      product?.images.map(({ public_id }) =>
        deleteCldImage(public_id as string)
      );
      return await prisma.product.delete({ where: { id } });
    }),
});
