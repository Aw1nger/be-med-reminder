import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { prisma } from '@src/lib/prisma';
import Elysia from 'elysia';
import { z } from 'zod';

export const newTag = new Elysia().post(
  '/',
  async ({ body: { name }, status }) => {
    console.log(name);

    try {
      const tag = await prisma.tag.create({
        data: {
          name,
        },
      });
      console.log(tag);

      return status(201, tag);
    } catch (e) {
      console.error(e);
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        console.error(e);
        return status(409, 'Unique constraint violation');
      }
    }
  },
  {
    body: z.object({
      name: z.string().min(1),
    }),
  },
);
