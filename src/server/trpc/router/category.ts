import deleteCldImage from '@/utils/delete-cld-image';
import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const categoryRouter = router({
  listCategories: publicProcedure.query(
    async ({ ctx: { prisma } }) => await prisma.category.findMany()
  ),
  listCategoriesByProductId: protectedProcedure
    .input(
      z.object({
        product_id: z.string(),
      })
    )
    .query(
      async ({ ctx: { prisma }, input: { product_id } }) =>
        await prisma.category.findMany({ where: { product_id } })
    ),
  getCategoryById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(
      async ({ ctx: { prisma }, input: { id } }) =>
        await prisma.category.findFirst({ where: { id } })
    ),
  createCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        image: z.object({
          url: z.string().url(),
          public_id: z.string(),
        }),
        product_id: z.string(),
      })
    )
    .mutation(
      async ({ ctx: { prisma }, input: data }) =>
        await prisma.category.create({ data })
    ),
  updateCategory: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        image: z.object({
          url: z.string().url(),
          public_id: z.string(),
        }),
        product_id: z.string().optional(),
      })
    )
    .mutation(
      async ({ ctx: { prisma }, input: { id, ...args } }) =>
        await prisma.category.update({ where: { id }, data: args })
    ),

  deleteCategory: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { id } }) => {
      const category = await prisma.category.findFirst({ where: { id } });
      deleteCldImage(category?.image.public_id as string);
      return await prisma.category.delete({ where: { id } });
    }),
});
