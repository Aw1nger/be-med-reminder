import Elysia from 'elysia';
import { deleted } from './delete';
import { finished } from './finished';
import { get } from './get';
import { getMany } from './get-many';
import { newTodo } from './new';

export const remindedRouter = new Elysia({ tags: ['reminded'] }).group('/reminded', (app) =>
  app.use(newTodo).use(getMany).use(get).use(deleted).use(finished),
);
