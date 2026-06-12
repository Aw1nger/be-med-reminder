import Elysia from 'elysia';
import { deleteTag } from './delete';
import { getMany } from './get-many';
import { newTag } from './new';

export const tagRouter = new Elysia({ tags: ['tag'] }).group('/tag', (app) =>
  app.use(getMany).use(deleteTag).use(newTag),
);
