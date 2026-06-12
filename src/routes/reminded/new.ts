import { prisma } from '@src/lib/prisma';
import Elysia from 'elysia';
import z from 'zod';

export const newTodo = new Elysia().post(
  '/',
  async ({ body, status }) => {
    await prisma.reminder.create({
      data: {
        userSub: 1,
        text: body.text,
        date: body.date,
        tags: { connect: body.tags.map((id) => ({ id })) },
        important: body.important,
      },
    });

    return status(201, 'Created');
  },
  {
    body: z.object({
      text: z.string(),
      date: z.iso.datetime(),
      tags: z.array(z.number()),
      important: z.boolean(),
    }),
  },
);
