import deleteCldImage from '@/utils/delete-cld-image';
import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

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
          .array(),
        discount: z.number().optional(),
        user_id: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: data }) => {
      return await prisma.product.create({ data });
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
          .optional(),
        discount: z.number().optional(),
      })
    )
    .mutation(
      async ({ ctx: { prisma }, input: { id, ...args } }) =>
        await prisma.product.update({ where: { id }, data: args })
    ),

  deleteProduct: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { id } }) => {
      const product = await prisma.product.findFirst({ where: { id } });
      deleteCldImage(product?.image_preview?.public_id as string);
      product?.images.map(({ public_id }) => deleteCldImage(public_id));
      return await prisma.product.delete({ where: { id } });
    }),
});
