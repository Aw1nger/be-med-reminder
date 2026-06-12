import { fromTypes, openapi } from '@elysia/openapi';
import { Elysia } from 'elysia';
import z from 'zod';
import { remindedRouter } from './routes/reminded';
import { tagRouter } from './routes/tag';

export const app = new Elysia()
  .get('/ping', 'pong')
  .use(
    openapi({
      references: fromTypes(Bun.env.NODE_ENV === 'production' ? 'dist/index.d.ts' : 'src/index.ts'),
      mapJsonSchema: {
        zod: z.toJSONSchema,
      },
      documentation: {
        tags: [
          { name: 'reminded', description: '' },
          { name: 'tag', description: '' },
        ],
        components: {
          securitySchemes: {
            cookieAuth: {
              type: 'apiKey',
              in: 'cookie',
              name: '__Host-gtw-access-token',
            },
          },
        },
      },
    }),
  )
  .use(remindedRouter)
  .use(tagRouter)
  .listen(8000);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
