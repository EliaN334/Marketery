import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const TypeUser = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string().regex(/[A-Z][0-9]/),
});

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

  createUser: publicProcedure
    .input(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
        password: z.string().regex(/[A-Z][0-9]/),
      })
    )
    .mutation(
      async ({ ctx: { prisma }, input }) =>
        await prisma.user.create({ data: input })
    ),
});
