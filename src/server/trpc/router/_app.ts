import { router } from '../trpc';
import { cartItemRouter } from './cartItem';
import { categoryRouter } from './category';
import { productRouter } from './product';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
  product: productRouter,
  cartItem: cartItemRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
