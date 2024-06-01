import Elysia, { t } from 'elysia';
import { UserService } from '../../services';

export const usersRoutes = new Elysia().group('/users', (app) =>
  app.post(
    '',
    ({ body }) => {
      const userService = new UserService();

      return userService.create(body);
    },
    {
      body: t.Object({
        name: t.String(),
        contact: t.String(),
        document: t.String(),
      }),
      detail: {
        tags: ['Users'],
        summary: 'Create a new user',
      },
    }
  )
);
