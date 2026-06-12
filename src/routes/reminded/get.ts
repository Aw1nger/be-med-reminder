import { prisma } from '@src/lib/prisma';
import Elysia from 'elysia';
import z from 'zod';

export const get = new Elysia().get(
  '/:id',
  async ({ params: { id }, status }) => {
    const reminded = await prisma.reminder.findUnique({
      where: {
        id,
      },
    });

    if (!reminded) return status(404, 'Not Found');

    return status(200, reminded);
  },
  { params: z.object({ id: z.coerce.number() }) },
);
