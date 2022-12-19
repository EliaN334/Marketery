import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const userRouter = router({
  listUsers: publicProcedure.query(
    async ({ ctx: { prisma } }) => await prisma.user.findMany()
  ),
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(
      async ({ ctx: { prisma }, input }) =>
        await prisma.user.findUnique({ where: { id: input.id } })
    ),
  createUser: protectedProcedure
    .input(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(
      async ({ ctx: { prisma }, input }) =>
        await prisma.user.create({ data: input })
    ),
  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        first_name: z.string().optional(),
        last_name: z.string().optional(),
        email: z.string().email().optional(),
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
    .mutation(
      async ({ ctx: { prisma }, input: { id } }) =>
        await prisma.user.delete({ where: { id } })
    ),
});
