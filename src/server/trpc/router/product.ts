import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const productRouter = router({
  listProducts: publicProcedure.query(
    async ({ ctx: { prisma } }) => await prisma.product.findMany()
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
        image_preview: z.string().url(),
        images: z.string().url().array(),
        discount: z.number(),
        user_id: z.string(),
      })
    )
    .mutation(
      async ({ ctx: { prisma }, input: data }) =>
        await prisma.product.create({ data })
    ),
  updateProduct: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        qty: z.number().optional(),
        image_preview: z.string().url().optional(),
        images: z.string().url().array().optional(),
        discount: z.number().optional(),
        user_id: z.string().optional(),
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
    .mutation(
      async ({ ctx: { prisma }, input: { id } }) =>
        await prisma.product.delete({ where: { id } })
    ),
});
