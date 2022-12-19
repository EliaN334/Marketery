import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const userQueryRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input: { email, first_name, last_name, password } }) => {
      await prisma?.user.create({
        data: {
          email,
          first_name,
          last_name,
          password,
        },
      });
      return {
        message: 'User created',
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({});
  }),
});
