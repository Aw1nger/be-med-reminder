import { prisma } from '@src/lib/prisma';
import Elysia from 'elysia';
import { z } from 'zod';

export const getMany = new Elysia().get(
  '/',
  async ({ query: { limit, page, q }, status }) => {
    const where = q
      ? {
          name: {
            contains: q,
            mode: 'insensitive' as const,
          },
        }
      : {};

    return await prisma.tag.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        name: 'asc',
      },
    });
  },
  {
    query: z.object({
      limit: z.coerce.number().min(1).default(12),
      page: z.coerce.number().min(1).default(1),
      q: z.string().optional(),
    }),
  },
);
