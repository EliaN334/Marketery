import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';

export const cartItemRouter = router({
  listCartItemsByUserId: protectedProcedure
    .input(
      z.object({
        user_id: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { user_id } }) => {
      const products = (
        await prisma.cartItem.findMany({ where: { user_id } })
      ).map(
        async (cart) =>
          await prisma.product.findMany({ where: { id: cart.product_id } })
      );
      return products;
    }),
  getCartItemById: protectedProcedure
    .input(z.object({ cart_id: z.string() }))
    .query(
      async ({ ctx: { prisma }, input: { cart_id } }) =>
        await prisma.cartItem.findFirst({ where: { id: cart_id } })
    ),
  createCartItem: protectedProcedure
    .input(
      z.object({
        product_id: z.string(),
        user_id: z.string(),
      })
    )
    .mutation(
      async ({ ctx: { prisma }, input: data }) =>
        await prisma.cartItem.create({ data })
    ),
  updateCartItem: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        product_id: z.string(),
      })
    )
    .mutation(
      async ({ ctx: { prisma }, input: { id, product_id } }) =>
        await prisma.cartItem.update({ where: { id }, data: { product_id } })
    ),

  deleteCartItem: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(
      async ({ ctx: { prisma }, input: { id } }) =>
        await prisma.cartItem.delete({ where: { id } })
    ),
});
