import Elysia, { t } from 'elysia';
import { UserService } from '../../services';

const userRequestSchema = t.Object({
  name: t.String(),
  contact: t.String(),
  document: t.String(),
});

const userResponseSchema = t.Object({
  id: t.String(),
  name: t.String(),
  contact: t.String(),
  document: t.String(),
  createdAt: t.String(),
  updatedAt: t.String(),
});

export const usersRoutes = new Elysia().group('/users', (app) =>
  app
    .post(
      '',
      ({ body }) => {
        const userService = new UserService();

        return userService.create(body);
      },
      {
        body: userRequestSchema,
        detail: {
          tags: ['Users'],
          summary: 'Create a new user',
          responses: {
            200: {
              description: 'User created successfully',
              content: {
                'application/json': {
                  schema: userResponseSchema,
                },
              },
            },
          },
        },
      }
    )
    .put(
      '/:id',
      ({ body, params: { id } }) => {
        const userService = new UserService();

        return userService.update(body, id);
      },
      {
        params: t.Object({ id: t.String() }),
        body: userRequestSchema,
        detail: {
          tags: ['Users'],
          summary: 'Update a user',
          responses: {
            200: {
              description: 'User updated successfully',
              content: {
                'application/json': {
                  schema: userResponseSchema,
                },
              },
            },
          },
        },
      }
    )
    .get(
      '',
      () => {
        const userService = new UserService();

        return userService.list();
      },
      {
        detail: {
          tags: ['Users'],
          summary: 'List all users',
          responses: {
            200: {
              description: 'Users retrieved successfully',
              content: {
                'application/json': {
                  schema: t.Array(userResponseSchema),
                },
              },
            },
          },
        },
      }
    )
);
