import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { prisma } from '@src/lib/prisma';
import Elysia from 'elysia';
import { z } from 'zod';

export const deleteTag = new Elysia().delete(
  '/:id',
  async ({ params: { id }, status }) => {
    try {
      const result = await prisma.tag.delete({ where: { id } });

      return status(204, result);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        return status(404, 'Tag not found');
      }
    }
  },
  {
    params: z.object({
      id: z.coerce.number(),
    }),
  },
);
