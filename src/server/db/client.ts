import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient = global.prisma || new PrismaClient();
//   {
//   log: env.NODE_ENV === 'development' ? ['error'] : ['error'],
// }
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
