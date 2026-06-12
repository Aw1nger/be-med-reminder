import { prisma } from '@src/lib/prisma';
import Elysia from 'elysia';
import { z } from 'zod';

export const getMany = new Elysia().get(
  '/',
  async ({ query: { limit, page, tag }, status }) => {
    const remindeds = await prisma.reminder.findMany({
      where: {
        userSub: 1,
        finished: false,
        tags: {
          some: {
            id: tag,
          },
        },
      },
      select: {
        id: true,
        text: true,
        date: true,
        tags: {
          select: {
            name: true,
          },
        },
        important: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return status(200, remindeds);
  },
  {
    query: z.object({
      page: z.coerce.number().default(1),
      limit: z.coerce.number().default(12),
      tag: z.coerce.number().optional(),
    }),
  },
);
