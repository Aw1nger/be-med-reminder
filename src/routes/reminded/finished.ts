import { prisma } from '@src/lib/prisma';
import Elysia from 'elysia';

export const finished = new Elysia().patch(
  '/:id/finished',
  async ({ params: { id }, status }) => {
    const todo = await prisma.reminder.findUnique({ where: { id: Number(id) } });

    if (!todo) return status(404, 'Not Found');

    await prisma.reminder.update({
      where: { id: Number(id) },
      data: { finished: true },
    });

    return status(200, 'OK');
  },
  {},
);
